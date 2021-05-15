return {
	init(deps){
		this.auth = deps.auth
		this.stripe = Stripe(deps.payment.pub)
	},
	createSession(body){
		this.auth.request('POST', '/create-checkout-session', body, null, async (err, {data}) => {
			if (err) throw err

			const result = await this.stripe.redirectToCheckout({ sessionId: data.id })
			if (result.error) alert(result.error.message)
		})
	}
}
