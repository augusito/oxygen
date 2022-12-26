const { isFunction, isString } = require("@hemjs/util");
const { iterate } = require("iterare");
const { platform } = require("os");
const { isEmpty } = require("../common/utils");
const LogFactory = require("../common/logging/log-factory");
const { MESSAGES, ShutdownSignal } = require("./constants");

class Application {
  logger = LogFactory.getLog(Application.name);
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
    this.logger.info(MESSAGES.APPLICATION_START);

    this.isInitialized = true;
    this.logger.info(MESSAGES.APPLICATION_READY);
    return this;
  }

  async close() {
    await this.dispose();
    this.unsubscribeFromProcessSignals();
  }

  async dispose() {
    this.httpAdapter && (await this.httpAdapter.close());
  }

  use(...args) {
    this.httpAdapter.use(...args);
    return this;
  }

  getHttpAdapter() {
    return this.httpAdapter;
  }

  registerHttpServer() {
    this.httpServer = this.createServer();
  }

  createServer() {
    this.httpAdapter.initHttpServer(this.appOptions);
    return this.httpAdapter.getHttpServer();
  }

  getHttpServer() {
    return this.httpServer;
  }

  async listen(port, ...args) {
    !this.isInitialized && (await this.init());

    return new Promise((resolve, reject) => {
      const errorHandler = (e) => {
        this.logger.error(e?.toString?.());
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
        },
      );
    });
  }

  async getUrl() {
    return new Promise((resolve, reject) => {
      if (!this.isListening) {
        this.logger.error(MESSAGES.CALL_LISTEN_FIRST);
        reject(MESSAGES.CALL_LISTEN_FIRST);
        return;
      }
      const address = this.httpServer.address();
      resolve(this.formatAddress(address));
    });
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

  listenToShutdownSignals(signals) {
    const cleanup = async (signal) => {
      try {
        signals.forEach((sig) => process.removeListener(sig, cleanup));
        await this.dispose();
        process.kill(process.pid, signal);
      } catch (err) {
        this.logger.error(err);
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

  formatAddress(address) {
    if (isString(address)) {
      if (platform() === "win32") {
        return address;
      }
      const basePath = encodeURIComponent(address);
      return `${this.getProtocol()}+unix://${basePath}`;
    }

    let host = this.host();
    if (address && address.family === "IPv6") {
      if (host === "::") {
        host = "[::1]";
      } else {
        host = `[${host}]`;
      }
    } else if (host === "0.0.0.0") {
      host = "127.0.0.1";
    }

    return `${this.getProtocol()}://${host}:${address.port}`;
  }

  host() {
    const address = this.httpServer.address();
    if (isString(address)) {
      return undefined;
    }
    return address && address.address;
  }

  getProtocol() {
    return this.appOptions && this.appOptions.httpsOptions ? "https" : "http";
  }
}

module.exports = Application;
