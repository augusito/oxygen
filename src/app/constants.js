const MESSAGES = {
  APPLICATION_START: `Starting application...`,
  APPLICATION_READY: `Application successfully started`,
  ERROR_DURING_SHUTDOWN: "Error happened during shutdown",
};

const ShutdownSignal = {
  SIGHUP: "SIGHUP",
  SIGINT: "SIGINT",
  SIGQUIT: "SIGQUIT",
  SIGILL: "SIGILL",
  SIGTRAP: "SIGTRAP",
  SIGABRT: "SIGABRT",
  SIGBUS: "SIGBUS",
  SIGFPE: "SIGFPE",
  SIGSEGV: "SIGSEGV",
  SIGUSR2: "SIGUSR2",
  SIGTERM: "SIGTERM",
};

module.exports = { MESSAGES, ShutdownSignal };
