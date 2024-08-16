import passport from "passport";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";


// Create user from body
export const register = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      return res.status(409).json({ error: "El usuario ya existe" });  
    }

    User.register(
      new User({
        username: req.body.username 
      }), req.body.password, function (err, msg) {
        if (err) {
          res.send(err);
        } else {
          return res.status(201).json({ message: 'User created correctly', newUser });
        }
      }
    );
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Error creating user' });
  }
};

// Get all users list
export const getUsers = async (req, res) => {
  try {
    console.log(req.user);
    const users = await User.find({isDeleted: false});

    res.status(200).json(users);
  } catch (error) {
    console.error('Error getting users: ', error);
    res.status(500).json({ error: 'Error getting users' });
  }
};

// Get user data by id
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    console.error('Error getting user data: ', error);
    res.status(500).json({ error: 'Error getting user data' });
  }
};

// Update user by id
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated correctly', user });
  } catch (error) {
    console.error('Error updating user: ', error);
    res.status(500).json({ error: 'Error updating user' });
  }
}

// Delete user (soft) by id
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        isDeleted: true
      },
      {
        new: true
      }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted correctly', user });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Error deleting user' });
  }
};
