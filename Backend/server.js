const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const purchaseRoutes = require('./routes/purchase');
const transferRoutes = require('./routes/transfer');
const assignmentRoutes = require('./routes/assignment');
const profileRoutes = require('./routes/profile');
const logger = require('./middleware/logger');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(cors({
    origin: 'http://localhost:5173', // allow Vite frontend
    credentials: true
  }));
  

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/purchase', purchaseRoutes);
app.use('/api/transfer', transferRoutes);
app.use('/api/assignment', assignmentRoutes);
app.use('/api/profile', profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
