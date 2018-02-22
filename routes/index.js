var express = require('express');
var router = express.Router();

var Client = require('azure-iothub').Client;
var connectionString = 'HostName=jktest.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=foxq0i4k81CASYeLn/cS4C6jEkfFciQXqaHFBGwLGwU=';

const methodMap = {
    "btn_led1": "PutLEDRed",
    "btn_led2": "PutLEDGreen",
    "btn_update": "GetHumidity",
};

// デフォルトルーティング
router.get('/', function(req, res) {
    res.render('index', { title: 'IoT Backend Application', message: 'Hello there!' });
});

router.post('/process', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    console.log("req.body:%j", req.body);
    var method = req.body.method;

    var client = Client.fromConnectionString(connectionString);
    var deviceId = 'raspi1';
    var methodParams = {
        methodName: methodMap[method],
        payload: 'hello world',
        timeoutInSeconds: 30
    };
    
    client.invokeDeviceMethod(deviceId, methodParams, function (err, result) {
        if (err) {
            console.error('Failed to invoke method \'' + methodParams.methodName + '\': ' + err.message);
            return;
        }
        console.log(methodParams.methodName + ' on ' + deviceId + ':');
        console.log(JSON.stringify(result, null, 2));
        res.send(result.payload);
    });

});
 
module.exports = router;

