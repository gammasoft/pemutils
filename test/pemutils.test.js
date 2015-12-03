/**
 * Created by johnsonb on 12/2/2015.
 */
require('./chai');
const pemutils = require('../');
const path = require('path');

describe('PEMUTILS', function(){
    describe('PFX', function(){
        it('should return certificate', function(done){
            pemutils.fromPfx({path: './test/data/test.pfx'}, function(error, cert){
               if(error != null) {
                   done(error);
               } else {
                   console.log(cert);
                   done();
               }
            });
        });

        it('should handle space in path', function(done){
            pemutils.fromPfx({path: './test/data/i have a space/test.pfx'}, function(error, cert){
                if(error != null) {
                    done(error);
                } else {
                    console.log(cert);
                    done();
                }
            });
        });
    });

    describe('DER', function(){
        it('should return certificate', function(done){
            pemutils.fromDer({path: './test/data/test.cer'}, function(error, cert){
                if(error != null) {
                    done(error);
                } else {
                    console.log(cert);
                    done();
                }
            });
        });

        it('should handle space in path', function(done){
            pemutils.fromDer({path: './test/data/i have a space/test.cer'}, function(error, cert){
                if(error != null) {
                    done(error);
                } else {
                    console.log(cert);
                    done();
                }
            });
        });
    });
});