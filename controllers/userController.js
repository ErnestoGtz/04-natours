const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  //Send Response
  res.status(200).json({
    status: 'Success',
    requestAt: req.requestTime,
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'This route is not yet define',
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'This route is not yet define',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'This route is not yet define',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'err',
    message: 'This route is not yet define',
  });
};
