const express = require("express")
const {createSchool ,getSchoolByDistance}= require("../controller/school_controller")

const router = express.Router()

router.route('/addSchool').post(createSchool);
router.route('/listSchools').get(getSchoolByDistance);

module.exports = router;