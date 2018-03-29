const express = require('express');


// 自己导出的模块
const fortune = require('./lib/fortune');


const app = express();

app.set('port', process.env.PORT || 3000);


// 模板引擎设置
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');


// 静态资源
app.use(express.static(__dirname + '/public'));

// 测试框架mocha
app.use((req, res, next) => {
	if(req.query.test === '1'){
		console.log('开始测试');
		console.log(app.get('env'))
	}
	res.locals.showTests = req.query.test === "1";
	next();
})

// 首页
app.get('/', (req, res, next) => {
	res.render('home');
	let str = "";
	for(let name in req.headers) {
		str += name + '=' + req.headers[name] + '\n';
	}
	console.log(str);
})

// about页面
app.get('/about', (req, res) => {
	const page = '关于页面';
	res.render('about', {
		page: fortune.getFortune()
	});
})

// 定制404页面
app.use((req, res) => {
	res.status(404);
	res.render('404');
})

// 定制500页面

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500);
	res.renderd('500');
})

app.listen(app.get('port'), () => {
	console.log('Express started on http://localhost:' + app.get('port'))
})