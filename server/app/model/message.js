/* 
  一对一消息表
*/
module.exports = (app) => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const MessageSchema = new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      friendId: {
        type: Schema.Types.ObjectId,
        ref: "User",
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
      state: {
        type: "number",
      },
    },
    {
      collection: "message",
      versionKey: false,
    }
  )
  return mongoose.model("Message", MessageSchema)
}
