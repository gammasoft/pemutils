'use strict';

var path = require('path'),
    fs = require('fs'),
    child_process = require('child_process'),

    async = require('async'),
    x509 = require('x509');

function chop(array, quantity){
    var result = [],
        subArray = [],
        count = 0;

    array.forEach(function(element){
        if(count === quantity){
            result.push(subArray);
            subArray = [];
            count = 0;
        }

        subArray.push(element);
        count++;
    });

    if(subArray.length > 0) {
        result.push(subArray);
    }

    return result;
};

function removeBagAttributes(content) {
    var title;

    if(content.indexOf('CERTIFICATE') > -1) {
        title = 'CERTIFICATE';
    }

    if(content.indexOf('RSA PRIVATE KEY') > -1) {
        title = 'RSA PRIVATE KEY';
    }

    var regexp = new RegExp('-----BEGIN ' + title + '-----(.*)-----END ' + title + '-----');

    content = content.replace(/\n/g, '');
    content = regexp.exec(content);
    content = content[1].split('');
    content = chop(content, 76);
    content = content.map(function(line) {
        return line.join('');
    }).join('\n');

    return '-----BEGIN ' + title + '-----\n' + content + '\n' + '-----END ' + title + '-----';
}

function fromPfx(params, callback) {
    function attributes(cb) {
        var command = [
            'openssl pkcs12 -in',
            params.path,
            '-nodes -passin pass:' + (params.password || '')
        ].join(' ');

        child_process.exec(command, function(err, stdout, stderr) {
            if(err) {
                return cb(err);
            }

            var attributes = x509.parseCert(stdout);
            delete attributes.publicKey;

            cb(null, attributes);
        });
    }

    function key(cb) {
        var command = [
            'openssl pkcs12 -in',
            params.path,
            '-nodes -nocerts ',
            '-passin pass:' + (params.password || '')
        ].join(' ');

        child_process.exec(command, function(err, stdout, stderr) {
            if(err) {
                return cb(err);
            }

            cb(null, removeBagAttributes(stdout));
        });
    }

    function certificate(cb) {
        var command = [
            'openssl pkcs12 -in',
            params.path,
            '-nodes -clcerts -nokeys',
            '-passin pass:' + (params.password || ''),
        ].join(' ');

        child_process.exec(command, function(err, stdout, stderr) {
            if(err) {
                return cb(err);
            }

            cb(null, removeBagAttributes(stdout));
        });
    }

    async.parallel({
        attributes: attributes,
        key: key,
        certificate: certificate
    }, function(err, result) {
        if(err) {
            return callback(err);
        }

        callback(null, result);
    });
}

module.exports.fromPfx = fromPfx;