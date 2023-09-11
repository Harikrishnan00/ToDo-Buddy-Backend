
const {Router} = require("express")
const {signup} = require("../routeHandlers/handleRoutes")
const cors = require('cors')

const router = Router()

router.post("/signup",cors(),signup)

module.exports = router