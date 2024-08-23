const express = require("express")
const createSchool = require("../controller/school_controller")

const router = express.Router()

router.route('/addSchool').post(createSchool);

module.exports = router;