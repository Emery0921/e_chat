/* eslint valid-jsdoc: "off" */

"use strict"

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const userConfig = require("./config.user")
module.exports = (appInfo) => {
	/**
	 * built-in config
	 * @type {Egg.EggAppConfig}
	 **/
	const config = (exports = {})

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + "_1653463345828_3371"

	// add your middleware config here
	config.middleware = ["errorHandler"]

	// add your user config here

	config.mongoose = {
		url: "mongodb://127.0.0.1/e_chat",
		options: {},
	}
	config.jwt = {
		secret: userConfig.userName,
	}
	// 上传文件时，配置multipart参数  mode参数的可选值  file  stream
	config.multipart = {
		fileSize: "50mb",
		mode: "file",
		fileExtensions: [".png", ".jpg"], // 扩展几种上传的文件格式
	}
	//配置外部访问本地图片的路径的名字
	config.assets = {
		publicPath: "app/public/images",
	}
	config.security = {
		domainWhiteList: ["http://localhost:8080", "http://localhost:8081"],
		csrf: {
			enable: false,
		},
	}
	return {
		...config,
		...userConfig,
	}
}
