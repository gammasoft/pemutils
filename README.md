# pemutils

Allows to convert from `.pfx` to `.pem`

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

