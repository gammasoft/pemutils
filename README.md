# pemutils

[![Build Status](https://drone.io/github.com/gammasoft/pemutils/status.png)](https://drone.io/github.com/gammasoft/pemutils/latest)

Converts .pfx to .pem files (key, cert or both) with simple OpenSSL bindings.

```javascript
var pemutils = require('pemutils');

pemutils.fromPfx({
    path: '/path/to/my/cert.pfx',
    password: 'myPass'
}, function(err, results) {
    if(err) {
        throw err;
    }

    console.log(JSON.stringify(results, null, 4));
});
```

Will output:

```json
{
    "attributes": {
        "version": 2,
        "subject": {
            "countryName": "",
            "organizationName": "",
            "stateOrProvinceName": "",
            "localityName": "",
            "organizationalUnitName": "",
            "commonName": ""
        },
        "issuer": {
            "countryName": "",
            "organizationName": "",
            "organizationalUnitName": "",
            "commonName": ""
        },
        "serial": "",
        "notBefore": "",
        "notAfter": "",
        "signatureAlgorithm": "",
        "fingerPrint": "",
        "altNames": [],
        "extensions": {
            "subjectAlternativeName": "",
            "basicConstraints": "",
            "authorityKeyIdentifier": "",
            "keyUsage": "",
            "certificatePolicies": "",
            "cRLDistributionPoints": "",
            "extendedKeyUsage": "",
            "authorityInformationAccess": ""
        }
    },
    "certificate": "",
    "key": ""
}
```

