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
      if (this.gender === 'Male') {
        return 'https://pixabay.com/vectors/male-portrait-avatar-face-head-306408/';
      } else if (this.gender === 'Female') {
        return 'https://cdn.pixabay.com/photo/2014/04/02/14/10/female-306407_1280.png';
      } else {
        return '';
      }
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
