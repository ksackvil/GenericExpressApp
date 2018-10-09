const configValidator = require('../src/utils/configValidator.js')

// ********** DO NOT EDIT ABOVE THIS LINE **********//

const config = {
  // ~~~~~ Mongo vars ~~~~~ //
  hostname: "mongodb://127.0.0.1/",
  dbName: 'dev',

  // ~~~~~ Express vars ~~~~~ //
  port: 5000,
  basePath: '/',
  endpoints: [
    {
      relPath: 'user/:id?/:key?',
      model: "UserModel.js",
      methods: ["GET", "POST", "DELETE"]
    }
  ]

}

// ********** DO NOT EDIT BELOW THIS LINE ********** //
configValidator(config)
if (typeof module !== "undefined") {module.exports = config;}
