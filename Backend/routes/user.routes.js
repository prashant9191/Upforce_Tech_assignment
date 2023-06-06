const express = require("express");
const bcrypt = require("bcrypt");
const {userModel} = require("../models/users.model");
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require("fs");
require("dotenv").config();

const userRouter = express.Router();

// Get all users
userRouter.get('/', async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
  
    try {
      const users = await userModel.find().skip(startIndex).limit(limit);
      const totalUsers = await userModel.countDocuments();
  
      const results = {
        users,
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalUsers / limit)
      };
  
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving users", error: error.message });
    }
  });


// Create a new user
userRouter.post("/register", async (req, res) => {
  const newUser = req.body;

  try {
    const salt = bcrypt.genSaltSync(Number(process.env.saltRounds));
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);
    newUser.password = hashedPassword;

    const user = new userModel(newUser);
    await user.save();
    res.status(201).json({ msg: "New user has been registered", newUser });
  } catch (error) {
    res.status(500).json({ msg: "Error registering user", error: error.message });
  }
});

// Update user by ID
userRouter.put('/:id', async (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;

  try {
    const user = await userModel.findByIdAndUpdate(id, updatedUser, { new: true });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});

// Update user by ID using patch method
userRouter.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const updatedUser = req.body;
  
    try {
      const user = await userModel.findById(id);
      if (user) {
        // Update only the provided fields
        Object.assign(user, updatedUser);
        const updatedUserData = await user.save();
        res.status(200).json(updatedUserData);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error: error.message });
    }
  });
  

// Delete user by ID
userRouter.delete('/delete/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userModel.findByIdAndDelete(id);
    if (user) {
      res.status(200).json({message:`This user has been deleted from Database`,user});
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

// Search users by name or email
userRouter.get('/search', async (req, res) => {
    const { name, email } = req.query;
  
    try {
      const results = await userModel.find({
        $or: [
          { name: { $regex: name || '', $options: 'i' } },
          { email: { $regex: email || '', $options: 'i' } }
        ]
      });
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: 'Error searching users', error: error.message });
    }
  });
  

// Export users to CSV file
userRouter.get('/export', async (req, res) => {
  const csvWriter = createCsvWriter({
    path: 'users.csv',
    header: [
      { id: 'id', title: 'ID' },
      { id: 'fullname', title: 'Name' },
      { id: 'gender', title: 'Gender' },
      { id: 'email', title: 'Email' },
    ],
  });

  try {
    const users = await userModel.find();
    await csvWriter.writeRecords(users);
    res.download('users.csv', 'users.csv', (err) => {
      if (err) {
        console.error(err);
      }
      fs.unlinkSync('users.csv');
    });
  } catch (error) {
    res.status(500).json({ message: 'Error exporting users', error: error.message });
  }
});


// Get user by ID
userRouter.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const user = await userModel.findById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error: error.message });
  }
});

module.exports = {
  userRouter
};
