return {
	create(deps, params){
		this._nav_menu = this.el.querySelector('div#nav-menu')
	},
	events: {
		'click button#overlayMenuBtn':function() {
			console.log('open overlay menu')
			this._nav_menu.classList.add('active')
		},
		'click #overlayMenu button': function() {
			console.log('close overlay menu by menu')
			this._nav_menu.classList.remove('active')
		},
		'click #overlayMenu a': function() {
			console.log('close overlay menu by option')
			this._nav_menu.classList.remove('active')
		}
	}
}
