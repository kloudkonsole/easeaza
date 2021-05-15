return {
	init(deps){
		this.auth = deps.auth
		this.files = deps.files
	},
	filter(criteria){
		const body = Object.assign({
			fields: '*,img.*'
		}, criteria)
		this.auth.request('GET', '/items/sku', body, null, (err, {data}) => {
			if (err) throw err
			this.files.set(data.map(sku => sku.img.map(obj => ({id: obj.directus_files_id}))).flat())
			this.set(data)
		})
	}
}
