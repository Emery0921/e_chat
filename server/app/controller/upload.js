const Controller = require("egg").Controller

class UploadController extends Controller {
  //上传文件
  async uploadFile() {
    const { ctx } = this
    // 获取前端传过来的第一个文件 如果前端传过来的是多个文件 就要选择遍历的方式去过去每个文件
    let file = ctx.request.files[0]
    const data = ctx.request.body
    const res = await ctx.service.upload.uploadFile(file, data)
    console.log("res", res)
    ctx.helper.success({
      ctx,
      res,
    })
  }
}
module.exports = UploadController
