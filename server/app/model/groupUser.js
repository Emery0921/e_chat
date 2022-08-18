/* 
  群成员表
*/
module.exports = (app) => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const GroupUserSchema = new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      groupId: {
        type: Schema.Types.ObjectId,
        ref: "Group",
      },
      name: {
        type: "string",
      },
      time: {
        //加入群聊时间
        type: "number",
        default: 0,
      },
      tip: {
        //未读消息数
        type: "number",
        default: 0,
      },
      shield: {
        //是否屏蔽群（0 不屏蔽，1 屏蔽）
        type: "number",
      },
      lastTime: {
        type: "number",
      },
    },
    {
      collection: "groupUser",
      versionKey: false,
    }
  )
  return mongoose.model("GroupUser", GroupUserSchema)
}
