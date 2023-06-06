const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  profile: {
    type: String,
    default: function() {
      if (this.gender == 'Male') {
        return 'https://img.freepik.com/premium-vector/cartoon-man-elegant-human-resources_24877-17816.jpg?w=740';
      } else if (this.gender == 'Female') {
        return 'https://img.freepik.com/premium-vector/beautiful-girl-with-long-black-hair-sweater_6138-239.jpg?w=740';
      }
      return '';
    }
  },
  mobile: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

const userModel = mongoose.model('User', userSchema);

module.exports = {
    userModel
};
