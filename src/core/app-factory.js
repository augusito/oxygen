const { isFunction } = require("@hemjs/util");
const LogFactory = require("../common/logging/log-factory");
const Application = require("./application");
const HttpAdapter = require("./http-adapter");
const TaskExecutor = require("./task/task-executor");

class AppFactory {
  abortOnError = true;

  create(options) {
    const instance = new Application(new HttpAdapter(), options);
    const target = this.createTarget(instance);
    return this.createAdapterProxy(target, new HttpAdapter());
  }

  createTarget(instance) {
    return this.createProxy(instance);
  }

  createProxy(target) {
    const proxy = this.createTaskProxy();
    return new Proxy(target, {
      get: proxy,
      set: proxy,
    });
  }

  createTaskProxy() {
    return (receiver, prop) => {
      if (!(prop in receiver)) {
        return;
      }
      if (isFunction(receiver[prop])) {
        return this.createTaskExecutor(receiver, prop);
      }
      return receiver[prop];
    };
  }

  createAdapterProxy(app, adapter) {
    const proxy = new Proxy(app, {
      get: (receiver, prop) => {
        const mapToProxy = (result) => {
          return result instanceof Promise
            ? result.then(mapToProxy)
            : result instanceof Application
            ? proxy
            : result;
        };

        if (!(prop in receiver) && prop in adapter) {
          return (...args) => {
            const result = this.createTaskExecutor(adapter, prop)(...args);
            return mapToProxy(result);
          };
        }

        if (isFunction(receiver[prop])) {
          return (...args) => {
            const result = receiver[prop](...args);
            return mapToProxy(result);
          };
        }

        return receiver[prop];
      },
    });

    return proxy;
  }

  createTaskExecutor(receiver, prop) {
    const teardown =
      this.abortOnError === false
        ? (err) => {
            throw err;
          }
        : undefined;

    return (...args) => {
      let result;
      TaskExecutor.execute(() => {
        result = receiver[prop](...args);
      }, teardown);

      return result;
    };
  }
}

module.exports = new AppFactory();
