const chalk = require('chalk');
const ip = require('ip');

const divider = chalk.gray('\n-----------------------------------');

/**
 * Logger middleware, you can customize it to make messages more personal
 */
const logger = {

  // Called whenever there's an error on the server we want to print
  error: (err) => {
    console.error(chalk.red(err));
  },

  // Basic debug logs
  debug: (msg) => {
    console.debug(msg);
  },

  // success logs : for better console log view
  success: (msg) => {
    console.debug(chalk.green(msg));
  },

  // Called when express.js app starts on given port w/o errors
  appStarted: (port, tunnelStarted) => {
    console.log(`Server started ${chalk.green('✓')}`);

    // If the tunnel started, log that and the URL it's available at
    if (tunnelStarted) {
      console.log(`Tunnel initialised ${chalk.green('✓')}`);
    }

    console.log(
      `
      ${chalk.bold('Access URLs:')}${divider}
      Localhost: ${chalk.magenta(`http://localhost:${port}`)}
            LAN: ${chalk.magenta(`http://${ip.address()}:${port}`) +
      (tunnelStarted ? `\n    Proxy: ${chalk.magenta(tunnelStarted)}` : '')}${divider}
      ${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `
    );
  },

  secureAppStarted: (port, tunnelStarted) => {
    console.log(`Server started ${chalk.green('✓')}`);

    // If the tunnel started, log that and the URL it's available at
    if (tunnelStarted) {
      console.log(`Tunnel initialised ${chalk.green('✓')}`);
    }

    console.log(
      `
      ${chalk.bold('Access URLs:')}${divider}
      Localhost: ${chalk.magenta(`https://localhost:${port}`)}
            LAN: ${chalk.magenta(`https://${ip.address()}:${port}`) +
      (tunnelStarted ? `\n    Proxy: ${chalk.magenta(tunnelStarted)}` : '')}${divider}
      ${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `
    );
  },
};

module.exports = logger;
