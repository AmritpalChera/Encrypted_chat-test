const cors = require('cors');

module.exports = function (app) {
  app.use(cors({origin: true, credentials: true}))
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept")
    res.header('Access-Control-Allow-Credentials', true)
    next()
  })
}