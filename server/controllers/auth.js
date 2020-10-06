const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

exports.getUser = async (req, res, next) => {
  try{
    const user = await User.findById(req.user.id).select('-password');
    console.log('user is authenticated: ');
    res.status(200).json(user);
  }catch (err) {
    if(err) console.log(err);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
}

exports.signup = async (req, res, next) => {
  console.log('signup');
  try{
    const {username, password} = req.body;
    console.log(req.body);
    if (!username || !password) {
      return res.status(400).json({ error: 'Please enter all fields' });
    }
    const user = await User.findOne({username: username});
    if(user){
      console.log('user exists');
      return res.status(400).json({
        success: false,
        error: 'User already exists'
      });
    }else{
      const newUser = await User.create({username: req.body.username, password: req.body.password});
      console.log('user created');
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) =>{
          if(err){
            res.sendStatus(500);
          }else {
            newUser.password = hash;
            newUser.save();
            res.status(201).json({
              success: true,
              user: {
                id: newUser.id,
                username: newUser.username
              }
            })
          }
        });
      });
    }
  }catch(err){
    console.log('err');
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
}

exports.login = async (req, res, next) => {
  const {username, password} = req.body
  if(!username || !password){
    return res.status(400).json({success: false, error: 'Please fill in required fields.'});
  }
  try{
    const user = await User.findOne({username: username});
    if(!user){
      console.log('error logging in');
      return res.status(400).json({success: false, error: 'We had trouble finding that username, try again!'});
    }
     bcrypt.compare(password, user.password, (err, result) => {
       if(result){
         const token = jwt.sign({id: user._id}, config.get('jwtSecret'), {expiresIn: 5600});
         if(token){
           console.log('logging in...');
           return res.status(200).json({
             token: token,
             user: {
               id: user.id,
               username: user.username
             }
           });
         }
       }
       else{
         console.log('passwords dont match');
         return res.status(400).json({success: false, error: 'Looks like your password may be incorrect!'});
       }
     });
  }catch(err){
    if(err) console.log(err);
    return res.status(404).json({
      success: false,
      error: 'User already exists'
    });
  }
}
