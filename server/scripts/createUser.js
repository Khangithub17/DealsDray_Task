// filepath: /path/to/server/scripts/createUser.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');

    const username = 'testUser@gmail.com';
    const password = 'test@1234';

    const createUser = async () => {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        console.log('User already exists');
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        password: hashedPassword,
      });

      await newUser.save();
      console.log('User created successfully');
    };

    createUser().finally(() => mongoose.connection.close());
  })
  .catch(err => console.error('MongoDB connection error:', err));