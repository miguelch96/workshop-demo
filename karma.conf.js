process.env.CHROME_BIN = require("puppeteer").executablePath();
const isDocker = require("is-docker")();

module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine", "@angular-devkit/build-angular"],
    plugins: [
      require("karma-jasmine"),
      require("karma-chrome-launcher"),
      require("karma-jasmine-html-reporter"),
      require("karma-coverage"),
      require("@angular-devkit/build-angular/plugins/karma"),
      require("karma-mocha-reporter"),
      require("karma-junit-reporter"),
    ],
    client: {
      clearContext: false,
      jasmine: {
        random: false,
      },
    },
    coverageReporter: {
      dir: require("path").join(__dirname, "./coverage"),
      subdir: ".",
      reporters: [
        { type: 'html' },
        { type: 'lcovonly' }
      ],
    },
    reporters: ["coverage", "mocha", "progress", "kjhtml", "junit"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["Chrome", "ChromeHeadless"],
    customLaunchers: {
      HeadlessChrome: {
        base: "ChromeHeadless",
        flags: isDocker ? ["--no-sandbox"] : [],
      },
    },
    singleRun: false,
    restartOnFileChange: true,
    files: ["globals.test.js"],
  });
};