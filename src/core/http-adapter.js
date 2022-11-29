const express = require("express");
const http = require("http");
const https = require("https");

class HttpAdapter {
  instance;
  httpServer;

  constructor(instance = express()) {
    this.instance = instance;
  }

  async init() {}

  use(...args) {
    return this.instance.use(...args);
  }

  get(...args) {
    return this.instance.get(...args);
  }

  post(...args) {
    return this.instance.post(...args);
  }

  head(...args) {
    return this.instance.head(...args);
  }

  delete(...args) {
    return this.instance.delete(...args);
  }

  put(...args) {
    return this.instance.put(...args);
  }

  patch(...args) {
    return this.instance.patch(...args);
  }

  all(...args) {
    return this.instance.all(...args);
  }

  options(...args) {
    return this.instance.options(...args);
  }

  listen(port, ...args) {
    return this.httpServer.listen(port, ...args);
  }

  status(response, statusCode) {
    return response.status(statusCode);
  }

  end(response, message) {
    return response.end(message);
  }

  setErrorHandler(handler, prefix) {
    return this.use(handler);
  }

  setNotFoundHandler(handler, prefix) {
    return this.use(handler);
  }

  isHeadersSent(response) {
    return response.headersSent;
  }

  setHeader(response, name, value) {
    return response.set(name, value);
  }

  getHttpServer() {
    return this.httpServer;
  }

  setHttpServer(httpServer) {
    this.httpServer = httpServer;
  }

  setInstance(instance) {
    this.instance = instance;
  }

  getInstance() {
    return this.instance;
  }

  initHttpServer(options) {
    const isHttpsEnabled = options && options.httpsOptions;
    if (isHttpsEnabled) {
      this.httpServer = https.createServer(
        options.httpsOptions,
        this.getInstance()
      );
      return;
    }
    this.httpServer = http.createServer(this.getInstance());
  }

  close() {
    if (!this.httpServer) {
      return undefined;
    }
    return new Promise((resolve) => this.httpServer.close(resolve));
  }

  getRequestHostname(request) {
    return request.hostname;
  }

  getRequestMethod(request) {
    return request.method;
  }

  getRequestUrl(request) {
    return request.originalUrl;
  }
}

module.exports = HttpAdapter;
