const express = require('express');
    const app = express();
    const consign = require('consign');
    const bodyParser = require('body-parser');
    const validator = require('express-validator');

app.set('secret','dikgu2-fyqvix-pEcqib');

app.use(express.static('./public'));
app.use( bodyParser.json({limit: '500mb'}) );
app.use(bodyParser.urlencoded({
    limit: '500mb',
    extended: true,
    parameterLimit:500000
}));

app.use(validator());

consign({cwd:'app'})
    .include('models')
    .then('helpers/connectionFactory.js')
    .then('api')
    .then('routes/login.js')
    .then('routes')
    .into(app);

module.exports = app;

