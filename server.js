var http = require('http'),
    app = require('./config/express')
db = require('./config/database');

http.createServer(app).listen(4000, function () {
    console.log('Servidor estutando na porta: ' + this.address().port);
});