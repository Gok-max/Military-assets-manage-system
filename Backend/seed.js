const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/User');
const Asset = require('./models/Asset');

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('DB connected');

  await User.deleteMany();
  await Asset.deleteMany();

  const hashedPassword = await bcrypt.hash('password123', 10);

  await User.insertMany([
    { name: 'Admin User', username: 'admin', email: 'admin@military.com', password: hashedPassword, role: 'admin', base: 'HQ' },
    { name: 'Commander One', username: 'cmd1', email: 'cmd1@military.com', password: hashedPassword, role: 'commander', base: 'Alpha Base' },
    { name: 'Logistics One', username: 'log1', email: 'log1@military.com', password: hashedPassword, role: 'logistics', base: 'Bravo Base' }
  ]);
  

  await Asset.insertMany([
    { name: 'Tank A', type: 'vehicle', base: 'Alpha Base', quantity: 5 },
    { name: 'Rifle X', type: 'weapon', base: 'Bravo Base', quantity: 100 },
    { name: 'Ammo Pack', type: 'ammunition', base: 'Alpha Base', quantity: 1000 }
  ]);

  console.log('Seed data inserted');
  process.exit();
}

seed();
