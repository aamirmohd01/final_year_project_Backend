// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// // Initialize the app
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB Connection
// const mongoURI = 'mongodb://localhost:27017/evaluation_app';
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch((err) => console.error('Error connecting to MongoDB:', err));

// // Define a Mongoose Schema and Model for titles
// const TitleSchema = new mongoose.Schema({
//   Title: { type: String, required: true, unique: true },
// });

// const Title = mongoose.model('Title', TitleSchema);

// // API Endpoint to check title availability
// app.post('/api/check-title', async (req, res) => {
//   const { Title } = req.body;

//   if (!Title) {
//     return res.status(400).json({ available: false, message: 'Title is required.' });
//   }

//   try {
//     // Check if the title already exists in the database
//     const existingTitle = await Title.findOne({ Title });

//     if (existingTitle) {
//       return res.json({ available: false, message: `The title "${title}" is already taken.` });
//     }

//     // Save the new title to the database
//     const newTitle = new Title({ Title });
//     await newTitle.save();

//     return res.json({ available: true, message: `The title "${Title}" is available and saved.` });
//   } catch (error) {
//     console.error('Error checking title:', error);
//     return res.status(500).json({ available: false, message: 'Internal server error.' });
//   }
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const mongoURI = 'mongodb://localhost:27017/evaluation_app';
mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define a Mongoose Schema and Model for titles
const TitleSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true }, // Use lowercase `title`
});

const Title = mongoose.model('Title', TitleSchema);

// API Endpoint to check title availability
app.post('/api/check-title', async (req, res) => {
  const { title } = req.body; // Use lowercase `title` to match the schema

  if (!title) {
    return res.status(400).json({ available: false, message: 'Title is required.' });
  }

  try {
    // Check if the title already exists in the database
    const existingTitle = await Title.findOne({ title });

    if (existingTitle) {
      return res.json({ available: false, message: `The title "${title}" is already taken.` });
    }

    // Save the new title to the database
    const newTitle = new Title({ title });
    await newTitle.save();

    return res.json({ available: true, message: `The title "${title}" is available and saved.` });
  } catch (error) {
    console.error('Error checking title:', error);
    return res.status(500).json({ available: false, message: 'Internal server error.' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
