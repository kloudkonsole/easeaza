function add(ctx, skuModel){
	const id = (skuModel.img[0] || {}).directus_files_id
	if (!id) return
	const fileModel = ctx.files.get(id)
	let url = null
	if (fileModel.id){
		url = ctx.domain + '/assets/' + fileModel.id
	}
	ctx.set({
		id,
		name: skuModel.name,
		url
	})
}

function proxy(evt, ...args){
	let coll
	let id
	switch(evt){
	case 'add':
		coll = args[0]
		id = args[1]
		add(this, coll.get(id))
		break
	case 'update':
		break
	case 'delete':
		break
	}
}

function updateURL(evt, coll, id){
	const model = this.get(id)
	if (!model) return
	const fileModel = coll.get(id)
	if (!fileModel.filename_disk) return
	model.url = this.domain + '/assets/' + fileModel.id
}

return {
	init(deps){
		this.files = deps.files
		this.sku = deps.sku
		this.domain = deps.backend.domain

		this.sku.callback.on('*', proxy, this)
		this.files.callback.on('update', updateURL, this)
	},
	fini(){
		this.files.callback.off('update', updateURL, this)
		this.sku.callback.off('*', proxy, this)
	},

	list(criteria){
		this.sku.filter(criteria)
	}
}
