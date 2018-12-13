module.exports = config => {
  config.set({
    frameworks: ['jasmine'],

    files: [ 'index.js' ],

    preprocessors: {
      '*.js': [ 'webpack' ],
    },

    webpack: {
      entry: './index.js',
      mode: 'development',
    },

    webpackMiddleware: {
      // stats: 'minimal',
    },

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    concurrency: Infinity,
  });
};
