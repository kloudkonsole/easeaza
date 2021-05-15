function spawn(ctx, mod, id){
	ctx.spawn(mod, {id}, [['model','model','supermodel','id']])
}

function populate(ctx, coll, mod){
	var ids=Object.keys(coll.models)
	for(var i=0,k; (k=ids[i]); i++){
		spawn(ctx, mod, k)
	}
}

return {
	deps:{
		galleryItem: 'view',
		supermodel: 'models'
	},
	create(deps){
		deps.supermodel.callback.on('add',function(evt, coll, id){
			console.log('Coll.update',arguments)
			spawn(this, this.galleryItem, id)
		},this)

		populate(this, deps.supermodel, deps.galleryItem)
		deps.supermodel.list()
	},
	remove(){
		var supermodel=this.deps.supermodel
		supermodel.models[1].callback.off(null,null,this)
		supermodel.callback.off(null,null,this)
		this.super.remove.call(this)
	}
}
