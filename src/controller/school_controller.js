const { School } = require("../models/index");

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

module.exports = createSchool;
