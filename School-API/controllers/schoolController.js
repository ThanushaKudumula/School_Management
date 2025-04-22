const { addSchool, getAllSchools } = require('../models/schoolModel');

const Distance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; 

  const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2 * Math.PI / 180);
  const y = lat2 - lat1;

  const distance = Math.sqrt(x * x + y * y) * (Math.PI / 180) * R;
  return distance;
};


const createSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const result = await addSchool(name, address, latitude, longitude);
    res.status(201).json({ message: 'School added successfully', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Database error', error });
  }
};

const listSchools = async (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  if (isNaN(userLat) || isNaN(userLon)) {
    return res.status(400).json({ message: 'Invalid latitude or longitude' });
  }

  try {
    const schools = await getAllSchools();
    const sorted = schools.map(school => ({
      ...school,
      distance:Distance(userLat, userLon, school.latitude, school.longitude)
    })).sort((a, b) => a.distance - b.distance);

    res.json(sorted);
  } catch (error) {
    res.status(500).json({ message: 'Database error', error });
  }
};

module.exports = { createSchool, listSchools };
