const fortuneArr = [
	'html5',
	'css3',
	'javascript',
	'jquery'
]

exports.getFortune = function() {
	let val = fortuneArr[Math.floor(Math.random() * fortuneArr.length)];
	return val;
}