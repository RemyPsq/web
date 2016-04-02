'use strict';

var _ = require('lodash');
var request = require('request');
var Promise = require('bluebird');

var RPC_URL = 'http://bananapi.local:9091/transmission/rpc';
var TRANSMISSION_USER = 'admin';
var TRANSMISSION_PASS = 'password';
var ROOT_DOWNLOAD_PATH = '/media/usb-storage';

// starts a new download
exports.addDownload = function( req, res ) {
  getSessionID()
    .then(function( sessionid ) {
      request({
        url: RPC_URL,
        method: 'POST',
        auth: {
          user: TRANSMISSION_USER,
          pass: TRANSMISSION_PASS
        },
        json: {
          method: 'torrent-add',
          arguments: {
            'filename':     req.body.item.downloadUrl,
            'download-dir': getDownloadPath( req.body.item )
          }
        },
        headers: {
          'X-Transmission-Session-Id': sessionid,
        }
      }, function( err, resp, body ) {
        if(err || resp.statusCode !== 200 || body.result !== 'success' ) {
          res.status(500).json({ error: err, resp: resp });
        } else {
          // TODO: Check to see if the hash from the response matches that
          // of the hash that came back from the source
          res.status(200).json( resp );
        }
      });
  });
};

// Get list of downloads
exports.getDownloads = function( req, res ) {
  getSessionID()
    .then(function( sessionid ) {
      request({
        url: RPC_URL,
        method: 'POST',
        auth: {
          user: TRANSMISSION_USER,
          pass: TRANSMISSION_PASS
        },
        json: {
          method: 'torrent-get',
          arguments: {
            fields: ['name','totalSize','eta','rateDownload','isFinished','isStalled','percentDone']
          }
        },
        headers: {
          'X-Transmission-Session-Id': sessionid,
        }
      }, function( err, resp, body ) {
        if(err || resp.statusCode !== 200 || body.result !== 'success' ) {
          res.status(500).json({ error: err, resp: resp });
        } else {
          res.status(200).json( body.arguments.torrents );
        }
      });
    });
}

// TODO: Needs some standardizing / config location
function getDownloadPath( item ) {
  switch( item.mediaType ) {
    case 'video':
    case 'movie':
      return ROOT_DOWNLOAD_PATH + '/movies';
      break;
    case 'tvshow':
      return ROOT_DOWNLOAD_PATH + '/tvshows';
      break;
    case 'audio':
    case 'music':
      return ROOT_DOWNLOAD_PATH + '/music';
      break;
    default:
      return ROOT_DOWNLOAD_PATH + '/downloads';
      break;
  }
}


function getSessionID() {
  return new Promise( function( resolve, reject ) {
    request({
      url: RPC_URL,
      method: 'POST',
      auth: {
        user: TRANSMISSION_USER,
        pass: TRANSMISSION_PASS
      }
    }, function( err, resp, body ) {
      resolve( resp.headers['x-transmission-session-id'] );
    });
  });
}
