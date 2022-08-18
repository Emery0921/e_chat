const Service = require("egg").Service
// ----定义写入文件时，需要导入的文件------
const fs = require("mz/fs")
const path = require("path")
class UploadService extends Service {
  // 上传文件
  async uploadFile(file, data) {
    const { ctx } = this
    ctx.helper.mkdirs("../public/" + data.url, (err) => {
      console.log(err, "err")
    })
    const name = new Date().getTime() + path.extname(file.filename)
    // 读取文件流
    file = fs.readFileSync(file.filepath)
    // 写入文件流
    fs.writeFileSync(path.join("./", `app/public/${data.url}/${name}`), file)
    // 返回前端访问链接
    let url = `public/${data.url}/${name}`
    // 返回文件上传处理结果
    return {
      code: 0,
      data: {
        imgUrl: url,
      },
      msg: "上传成功",
    }
  }
}
module.exports = UploadService
