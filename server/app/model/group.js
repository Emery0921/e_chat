/* 
  群表
*/
module.exports = (app) => {
  const mongoose = app.mongoose
  const Schema = mongoose.Schema
  const GroupSchema = new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      name: {
        type: "string",
      },
      imgUrl: {
        type: "string",
        default: "group.png",
        //默认值
      },
      time: {
        type: "number",
        default: 0,
      },
      notice: {
        type: "string",
        default: "",
      },
    },
    {
      collection: "group",
      versionKey: false,
    }
  )
  return mongoose.model("Group", GroupSchema)
}
