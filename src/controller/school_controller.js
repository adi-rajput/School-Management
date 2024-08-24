const { School } = require("../models/index"); 
const calculateDistance = require("../utils/school_sort"); 

// Function to create a new school
const createSchool = async (req, res) => {
  try {

    const { name, address, latitude, longitude } = req.body;

    // Check if a school with the same name and address already exists
    const existingSchool = await School.findOne({ where: { name, address } });

    if (existingSchool) {
      return res.status(409).json({
        message: "School with this name already exists.",
      });
    }

    if (!name || !address || !longitude || !latitude) {
      return res.status(409).json({
        message: "All fields are required.",
      });
    }

    // Create a new school in the database
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

// Function to retrieve schools sorted by distance from a given location
const getSchoolByDistance = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Please provide latitude and longitude' });
    }

    const schools = await School.findAll();

    // Map through the schools to calculate their distance from the provided coordinates
    const schoolsWithDistance = schools.map(school => {
      const distance = calculateDistance(latitude, longitude, school.latitude, school.longitude);
      return { ...school.toJSON(), distance }; // Return school data along with the calculated distance
    });

    // Sort schools by distance
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);


    res.json(schoolsWithDistance);
  } catch (error) {

    res.status(500).json({ error: 'Failed to retrieve schools' });
  }
};

module.exports = { createSchool, getSchoolByDistance };
