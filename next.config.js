const { aliasTinaDev } = require("@tinacms/webpack-helpers")

require("dotenv").config()

module.exports = {
  env: {
    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    REPO_FULL_NAME: process.env.REPO_FULL_NAME,
    BASE_BRANCH: process.env.BASE_BRANCH,
  },
  webpack(config) {
    if (process.env.TINA) {
      let watch
      if (process.env.TINA_WATCH) {
        watch = process.env.TINA_WATCH.split(",")
      }
      aliasTinaDev(config, process.env.TINA, watch)
    }

    return config
  },
}
