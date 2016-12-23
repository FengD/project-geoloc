// ---- 基本設定 ----
var express = require('express');
var app     = express();
var port    = process.env.PORT || 8080;

// // ---- ROUTES ----

// // 舊方法
// app.get('/sample', function(req, res) {
//   res.send('this is a sample!');
// });

// // Express Router

// // 建立 Router 物件
// var router = express.Router();

// // 首頁路由 (http://localhost:8080)
// router.get('/', function(req, res) {
//   res.send('home page!');
// });

// // 另一張網頁路由 (http://localhost:8080/about)
// router.get('/about', function(req, res) {
//   res.send('about page!');
// });

// // 將路由套用至應用程式
// app.use('/', router);


var router = express.Router();

// 在每一個請求被處理之前都會執行的 middleware
router.use(function(req, res, next) {

  // 輸出記錄訊息至終端機
  console.log(req.method, req.url);

  // 繼續路由處理
  next();
});

// 首頁路由 (http://localhost:8080)
router.get('/', function(req, res) {
  res.send('home page!');
});

// 另一張網頁路由 (http://localhost:8080/about)
router.get('/about', function(req, res) {
  res.send('about page!');
});

// 含有參數的路由 (http://localhost:8080/hello/:name)
router.get('/hello/:name', function(req, res) {
  res.send('hello ' + req.params.name + '!');
});


// 將路由套用至應用程式
app.use('/', router);
// ---- 啟動伺服器 ----
app.listen(port);