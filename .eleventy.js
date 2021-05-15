module.exports = function (config) {
	config.addWatchTarget('../_includes/')
	config.addPassthroughCopy('src/assets/img')
	return {
		passthroughFileCopy: true,
		markdownTemplateEngine: 'liquid',
		htmlTemplateEngine: 'liquid',
		templateFormats: ['html', 'liquid', 'md'],
		dir: {
			input: 'src',
		},
	}
}