// // Get all schools
// app.get('/', async (req, res) => {
//   try {
//     const data = await pool.query('SELECT * FROM school');
//     res.status(200).send({ schools: data.rows });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ error: "Failed to fetch schools" });
//   }
// });

// // Add a new school
// app.post('/', async (req, res) => {
//   const { name, location } = req.body;
//   try {
//     await pool.query(
//       'INSERT INTO school (name, address) VALUES ($1, $2)',
//       [name, location]
//     );
//     res.status(200).send({ message: "Successfully added a school" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ error: "Failed to add school" });
//   }
// });
// app.get('/setup/school', async (req, res) => {
//   try {
//     await pool.query(`
//       CREATE TABLE IF NOT EXISTS school (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(100),
//         address VARCHAR(100)
//       )
//     `);
//     res.status(200).send({ message: "School table created successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ error: "Failed to create school table" });
//   }
// });

// Route to create students table
// app.get('/setup/students', async (req, res) => {
//   try {
//     await pool.query(`
//       CREATE TABLE IF NOT EXISTS students (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(100),
//         address VARCHAR(100)
//       )
//     `);
//     res.status(200).send({ message: "Students table created successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ error: "Failed to create students table" });
//   }
// });
// app.get('/setup/parents', async (req, res) => {
//   try {
//     await pool.query(`
//       CREATE TABLE IF NOT EXISTS students (
//         id SERIAL PRIMARY KEY,
//         name VARCHAR(100),
//         address VARCHAR(100)
//       )
//     `);
    // res.status(200).send({ message: "parents table created successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ error: "Failed to create students table" });
//   }
// });
