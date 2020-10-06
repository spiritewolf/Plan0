const Task = require('../models/Task');

exports.getTasks = async (req, res, next) => {
  try{
    const task = await Task.find({ user: req.user.id });
    console.log('checkpoint: getting tasks ');
    return res.status(200).json(task);
  }catch (err) {
    if(err) console.log(err);
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
}

exports.addTask = async (req, res, next) => {
  const {text} = req.body;
  console.log(text);
  if(!text){
    return res.status(400).json({ error: 'Please ensure all values are filled out'});
  }
  try{
    const task = await Task.create({
      text: text,
      user: req.user.id
    });
    console.log('adding task for ID: ' + req.user.id);
    return res.status(201).json(task);
  } catch(err){
      if(err) console.log(err);
      return res.status(500).json({
        success: false,
        error: 'Server error'
      });
  }
}

exports.deleteTask = async (req, res, next) => {
  try{
    const task = await Task.findById(req.params.id);
    if(!task){
      return res.status(404).json({
        success: false,
        error: 'No task found'
      });
    }
    if(task.user.toString() !== req.user.id) {
      return res.status(401).json({ error: 'Not authorized' });
    }
    console.log('removing task');
    await task.remove();

    return res.status(200).json({
      success: true,
      data: {}
    });
  }catch(err) {
    return res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
}
