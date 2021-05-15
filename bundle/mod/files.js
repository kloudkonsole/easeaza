function get(evt, coll, id){
	const model = coll.get(id)
	const req = {
		'fields': 'id,type,title,filename_disk',
		'filter[id][_in]': model.id
	}
	switch(evt){
	case 'add':
		this.auth.request('GET', '/files', req, null, (err, {data}) => {
			if (err) return console.error(err)
			coll.set(data)
		})
		break
	default:
		break
	}
}

return {
	init(deps){
		this.auth = deps.auth
		this.callback.on('add', get, this)
		this.forEach(model => get.call(this, 'add', this, model.id))
	},
	fini(){
		this.callback.off('add', get, this)
	}
}
