const db = require('../config/db');

const addSchool = async (name, address, latitude, longitude) => {
  const [result] = await db.execute(
    'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)',
    [name, address, latitude, longitude]
  );
  return result;
};

const getAllSchools = async () => {
  const [schools] = await db.execute('SELECT * FROM schools');
  return schools;
};

module.exports = { addSchool, getAllSchools };
