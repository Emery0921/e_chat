"use strict"

/** @type Egg.EggPlugin */
module.exports = {
  mongoose: {
    enable: true,
    package: "egg-mongoose",
  },
  jwt: {
    enable: true,
    package: "egg-jwt",
  },
  nunjucks: {
    enable: true,
    package: "egg-view-nunjucks",
  },
  validate: {
    enable: true,
    package: "egg-validate",
  },
  cors: {
    enable: true,
    package: "egg-cors",
  },
}
