pico.run({
	name: 'shop',
	ajax: __.ajax,
	onLoad: __.load,
	env: Object.assign(
		{ build: 'prod' },
		(function(el){
			return el && el.dataset ? el.dataset : {}
		})(document.getElementById('pEnv'))
	),
	preprocessors:{
		'.asp':function(url,asp){
			return pico.export('pico/str').template(asp)
		}
	},
	paths:{
		'~': './mod/',
		root: './',
		main: './main/',
		cfg: './cfg/',
		p: './lib/pico/',
		po: './lib/pojs/'
	}
},function(){
	var specMgr= require('p/specMgr')
	var View= require('p/View')
	var project = require('cfg/shop.json')
	var host = require('cfg/shop.'+ pico.env('build') +'.json')
	var main

	return function(){
		specMgr.load(null, null, project, function(err, spec){
			if (err) return console.error(err)
			main = new View(null, host, null, [])
			main.spawnBySpec(spec)
		})
	}
})
