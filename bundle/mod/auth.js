const OFFSET = 1000 * 60

function login(ctx, model, cb){
	pico.ajax('POST', `${ctx.domain}/auth/login`, ctx.cred, null, (err, state, xhr) => {
		if (4 !== state) return
		if (err) return cb(err)
		try {
			const {data} = JSON.parse(xhr)
			model.access_token = data.access_token
			model.refresh_token = data.refresh_token
			model.expires = Date.now() + data.expires
		} catch (ex) {
			return cb(ex)
		}
		cb(null, model.access_token)
	})
}

function refresh(ctx, model, cb){
	const body = { refresh_token: model.refresh_token }
	pico.ajax('POST', `${ctx.domain}/auth/refresh`, body, null, (err, state, xhr) => {
		if (4 !== state) return
		if (err) return cb(err)
		try {
			const {data} = JSON.parse(xhr)
			model.access_token = data.access_token
			model.expires = Date.now() + data.expires
		} catch (ex) {
			return cb(ex)
		}
		cb(null, model.access_token)
	})
}

function getToken(ctx, cb){
	const model = ctx.at(0)
	if (model.expires > (Date.now() + OFFSET)) return cb(null, model.access_token)

	if (model.refresh_token) return refresh(ctx, model, cb)

	login(ctx, model, cb)
}

function request(method, url, body, opt, cb){
	getToken(this, (err, access_token) => {
		if (err) return cb(err)

		const headers = Object.assign({}, opt || {}, {
			headers: {
				Authorization: 'Bearer ' + access_token
			}
		})

		pico.ajax(method, `${this.domain}${url}`, body, headers, (err, state, xhr) => {
			if (4 !== state) return
			if (err) return console.error(err)
			try {
				var json = JSON.parse(xhr)
			} catch (ex) {
				return cb(ex)
			}
			cb(null, json)
		})
	})
}

return {
	init(deps){
		this.domain = deps.backend.domain
		this.cred = deps.cred
		this.set({
			id: Date.now(),
			access_token: null,
			refresh_token: null,
			expires: 0
		})
	},
	request
}
