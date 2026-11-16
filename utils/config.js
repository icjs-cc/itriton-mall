const theme = {
	project_cn: 'ITRITON MALL',
	main_color: '#DCAA6B',
	sub_color: '#E3BB87',
	nav_bar_btn_color: 'rgba(0, 0, 0, .2)',
	nav_bar_text_color: '#FFFFFF',
}

module.exports = {
	...theme,
	theme,
	project_en: 'itriton_mall',
	is_mock: true, // 是否使用mock数据
	dev_env: 'pro', // 开发环境
	pro: {
		url: 'https://ibaleine.com/api',
	},
	dev: {
		url: 'https://ibaleine.com/api'
	}
}
