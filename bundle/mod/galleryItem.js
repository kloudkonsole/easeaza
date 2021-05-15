function update(evt, key, value){
	if ('url' !== key) return
	this.el.setAttribute('href', value)
	this.el.innerHTML = this.deps.tpl({url: value})
}

return {
	deps: {
		model: 'model',
		checkout: 'models',
		tpl: 'file'
	},
	create(deps){
		update.call(this, 'field.update', 'url', deps.model.url)
		deps.model.callback.on('field.update', update, this)
	},
	events: {
		'click div#booknow'(evt, target) {
			this.deps.checkout.createSession({})
		}
	}
}
