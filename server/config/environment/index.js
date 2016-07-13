'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV || 'development',

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Server IP
  ip: process.env.IP || '0.0.0.0',

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'kapture-secret'
  },

  // where the system lives
  kaptureHost: 'localhost',

  // keep the trailing slash
  rootDownloadPath : '/media/usb/',
  moviesPath       : 'movies',
  showsPath        : 'tvshows',
  musicPath        : 'music',
  photosPath       : 'photos',
  defaultMediaPath : 'downloads',

  transmissionPort  : 9091,
  transmissonUser   : 'admin',
  transmissionPass  : 'password',

  // settings that will be used by ansible here
  settingsFileStore : 'system_settings.yml',

  // where to keep the series files for flexget to use
  seriesFileStore         : 'user_series.yml',          //flexget
  seriesMetadataFileStore : 'user_series_metadata.yml', //kapture

  // if ngrok enabled and installed, can hit the /api/remote url to spin up a ngrok tunnel
  ngrokEnabled   : false,
  ngrokAuthToken : null,
  ngrokTimeout   : 30 * 60 * 1000,   // time in ms to keep ngrok alive

  logger: require('../logger')()
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
