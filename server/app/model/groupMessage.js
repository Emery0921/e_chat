/* 
  群成员表
*/
module.exports = (app) => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const GroupMessageSchema = new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      groupId: {
        type: Schema.Types.ObjectId,
        ref: "Group",
      },
      types: {
        type: "string",
      },
      time: {
        type: "number",
        default: 0,
      },
      message: {
        type: "string",
      },
    },
    {
      collection: "groupMessage",
      versionKey: false,
    }
  )
  return mongoose.model("GroupMessage", GroupMessageSchema)
}
