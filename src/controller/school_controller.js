const { School } = require("../models/index");
const calculateDistance = require("../utils/school_sort")

const createSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    const existingSchool = await School.findOne({ where: { name,address } });

    if (existingSchool) {
      return res.status(409).json({
        message: "School with this name already exists.",
      });
    }
    if(!name || !address || !longitude || !latitude) 
    {
        return res.status(409).json({
            message: "All fields are required.",
          });
    }
    const school = await School.create({ name, address, latitude, longitude });

    res.status(201).json({
      message: "School created successfully",
      success: true,
      school,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add school" });
    console.log(error);
  }
};

const getSchoolByDistance= async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Please provide latitude and longitude' });
    }

    const schools = await School.findAll();

    const schoolsWithDistance = schools.map(school => {
      const distance = calculateDistance(latitude, longitude, school.latitude, school.longitude);
      return { ...school.toJSON(), distance };
    });

    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    res.json(schoolsWithDistance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve schools' });
  }
};

module.exports = {createSchool,getSchoolByDistance};
