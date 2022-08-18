const moment = require("moment")
const nodemailer = require("nodemailer")
const bcrypt = require("bcrypt")
const fs = require("fs") // 导入 fs 模块
const path = require("path") // 导入 path 模块
module.exports = {
  moment,
  // 成功获取数据的回调
  success({ ctx, res = null }) {
    ctx.status = res.status ? res.status : 200
    if (res.status) {
      delete res.status
    }
    ctx.body = {
      ...res,
      data: res.data ? res.data : null,
      code: res.code ? res.code : 0,
      msg: res.msg ? res.msg : "请求成功",
    }
  },

  /**
   * 发邮件
   * @param {Object}
   */
  sendEmail(email) {
    const transporter = nodemailer.createTransport(this.app.config.qqEmail)
    //发送信息
    let emailOption = {
      from: "927987860@qq.com",
      to: email,
      subject: "感谢你在e_chat注册",
      html: '<span>e_chat欢迎你的加入</span><a href="http://localhost:8080/">点击</a>',
    }
    transporter.sendMail(emailOption, function (error, info) {
      console.log("error", error, "info", info)
      if (!error) {
        return { code: 0, msg: "验证码发送成功", info }
      } else {
        return { code: 1, msg: "验证码发送失败，请稍后重试", error }
      }
    })
  },
  // 密码加密
  genSaltPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (!err) {
            resolve(hash)
          } else {
            reject(err)
          }
        })
      })
    })
  },
  // 密码解密
  /**
   *
   * @param {未加密的密码} _password
   * @param {数据库已保存的加密的密码} password
   * @returns Boolean 是否匹配
   */
  comparePassword(_password, password) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(_password, password, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(err)
        }
      })
    })
  },

  // 动态生成文件夹
  // 动态新建文件夹的方法

  mkdirs(pathname, callback) {
    // 需要判断是否是绝对路径（避免不必要的 bug）
    pathname = path.isAbsolute(pathname)
      ? pathname
      : path.join(__dirname, pathname)
    // 获取相对路径
    pathname = path.relative(__dirname, pathname)
    // path.sep 避免平台差异带来的 bug
    const floders = pathname.split(path.sep)
    let pre = "" // 最终用来拼合的路径
    floders.forEach((floder) => {
      try {
        // 没有异常，文件已经创建，提示用户该文件已经创建
        const _stat = fs.statSync(path.join(__dirname, pre, floder))
        const hasMkdir = _stat && _stat.isDirectory()
        if (hasMkdir) {
          callback // && callback(`文件${floder}已经存在，不能重复创建，请重新创建！`)
        }
      } catch (err) {
        // 抛出异常，文件不存在则创建文件
        try {
          // 避免父文件还没有创建的时候，先创建子文件所出现的意外 bug，这里选择同步创建文件
          fs.mkdirSync(path.join(__dirname, pre, floder))
          callback && callback(null)
        } catch (error) {
          callback && callback(error)
        }
      }
      pre = path.join(pre, floder) // 路径拼合
    })
  },
}
