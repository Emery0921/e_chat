/* 
  好友表
*/
module.exports = (app) => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const FriendSchema = new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      friendId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      time: {
        type: "number",
        default: 0,
      }, //生成时间
      nickName: {
        //好友昵称
        type: "string",
        default: "",
      },
      state: {
        type: "string",
      },
      lastTime: {
        type: "number",
      }, //最后通讯时间
    },
    {
      collection: "friend",
      versionKey: false,
    }
  )
  return mongoose.model("Friend", FriendSchema)
}
