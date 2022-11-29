const { isFunction } = require("@hemjs/util");
const { iterate } = require("iterare");
const { isEmpty } = require("../common/utils");
const { MESSAGES, ShutdownSignal } = require("./constants");

class Application {
  httpAdapter;
  appOptions;
  isInitialized = false;
  isListening = false;
  activeShutdownSignals = [];
  shutdownCleanupRef;
  httpServer;

  constructor(httpAdapter, appOptions = {}) {
    this.httpAdapter = httpAdapter;
    this.appOptions = appOptions;
    this.registerHttpServer();
  }

  async init() {
    if (this.isInitialized) {
      return this;
    }

    this.isInitialized = true;
    console.log(MESSAGES.APPLICATION_READY);
    return this;
  }

  async close() {
    await this.dispose();
    this.unsubscribeFromProcessSignals();
  }

  getHttpAdapter() {
    return this.httpAdapter;
  }

  getHttpServer() {
    return this.httpServer;
  }

  registerHttpServer() {
    this.httpServer = this.createServer();
  }

  createServer() {
    this.httpAdapter.initHttpServer(this.appOptions);
    return this.httpAdapter.getHttpServer();
  }

  enableShutdownHooks(signals) {
    if (!isEmpty(signals)) {
      signals = Object.keys(ShutdownSignal).map((key) => ShutdownSignal[key]);
    } else {
      // given signals array should be unique because
      // process shouldn't listen to the same signal more than once.
      signals = Array.from(new Set(signals));
    }

    signals = iterate(signals)
      .map((signal) => signal.toString().toUpperCase().trim())
      // filter out the signals which is already listening to
      .filter((signal) => !this.activeShutdownSignals.includes(signal))
      .toArray();

    this.listenToShutdownSignals(signals);
    return this;
  }

  async dispose() {
    this.httpAdapter && (await this.httpAdapter.close());
  }

  async listen(port, ...args) {
    !this.isInitialized && (await this.init());

    return new Promise((resolve, reject) => {
      const errorHandler = (e) => {
        console.error(e?.toString?.());
        reject(e);
      };

      this.httpServer.once("error", errorHandler);

      const isCallbackInOriginalArgs = isFunction(args[args.length - 1]);
      const listenFnArgs = isCallbackInOriginalArgs
        ? args.slice(0, args.length - 1)
        : args;

      this.httpAdapter.listen(
        port,
        ...listenFnArgs,
        (...originalCallbackArgs) => {
          if (originalCallbackArgs[0] instanceof Error) {
            return reject(originalCallbackArgs[0]);
          }

          const address = this.httpServer.address();

          if (address) {
            this.httpServer.removeListener("error", errorHandler);
            this.isListening = true;
            resolve(this.httpServer);
          }

          if (isCallbackInOriginalArgs) {
            args[args.length - 1](...originalCallbackArgs);
          }
        }
      );
    });
  }

  listenToShutdownSignals(signals) {
    const cleanup = async (signal) => {
      try {
        signals.forEach((sig) => process.removeListener(sig, cleanup));
        await this.dispose();
        process.kill(process.pid, signal);
      } catch (err) {
        console.error(MESSAGES.ERROR_DURING_SHUTDOWN);
        process.exit(1);
      }
    };

    this.shutdownCleanupRef = cleanup;

    signals.forEach((signal) => {
      this.activeShutdownSignals.push(signal);
      process.on(signal, cleanup);
    });
  }

  unsubscribeFromProcessSignals() {
    if (!this.shutdownCleanupRef) {
      return;
    }
    this.activeShutdownSignals.forEach((signal) => {
      process.removeListener(signal, this.shutdownCleanupRef);
    });
  }
}

module.exports = Application;
