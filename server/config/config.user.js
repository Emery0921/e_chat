module.exports = {
  baseRouter: "/api/v1",
  // webRouter: "/api/web",
  userName: "emery",
  qqEmail: {
    host: "smtp.qq.com", // QQ邮箱的SMTP地址
    port: 465, // 邮箱的端口号一般都使用465，
    auth: {
      user: "927987860@qq.com", // 发送方的邮箱，可以选择你自己的qq邮箱
      pass: "sqbmzrpjqecwbbjf", // 上文获取的stmp授权码
    },
  },
}
