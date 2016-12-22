/**
 * Created by Administrator on 2016/6/27 0027.
 */


/*
*使用http模块来构建一个后台服务器（自己修改）
*/
var http = require('http');

var content = '▍if you see that,It means you have get the correct data by backend server(mock data by nodejs server)!';

var srv = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/text'});
    res.end(content);
});


/*
*使用该服务器的时候，对8888端口进行监听
*/
srv.listen(8888, function() {
    console.log('listening on localhost:8888');
});