
/**
 * 项目基本配置
 * 注：若使用命令行自动创建应用，请注意书写格式，负责可能导致创建失败
 */

exports.path = {
	src: './src', // 开发目录
	build: './build', // 发布目录

	// 提供给webpack打包用的入口文件
	// 若新增一个页面，需添加一条入口配置，原则上异步加载
	js: {
		index: ['./src/page/index/controller.js'],
		// 二级路由入口文件chunk名必须是一级路由加二级路由，遵循驼峰命名规范
		index_dialog: ['./src/page/index/dialog/controller.js'],
		home: ['./src/page/home/controller.js'], 
		home_account: ['./src/page/home/account/controller.js'],
		home_info: ['./src/page/home/info/controller.js'],
		home_patient: ['./src/page/home/patient/controller.js'],
		home_doctor: ['./src/page/home/doctor/controller.js'],
		home_meeting: ['./src/page/home/meeting/controller.js'],
		home_shortmessage: ['./src/page/home/shortmessage/controller.js'],
		home_dictionary: ['./src/page/home/dictionary/controller.js'],
		home_gaoxin: ['./src/page/home/gaoxin/controller.js']
	}
};