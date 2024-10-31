
const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render('adventures/index.ejs', {
    adventures: currentUser.adventures,
    });
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
});

router.get('/new', async (req, res) => {
    res.render('adventures/new.ejs');
});
  
router.post('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.adventures.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/adventures`);
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});

router.get('/:adventureId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const adventure = currentUser.adventures.id(req.params.adventureId);
    res.render('adventures/show.ejs', {
    adventure: adventure,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});

router.delete('/:adventureId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.adventures.id(req.params.adventureId).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/adventures`);
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});

router.get('/:adventureId/edit', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const adventure = currentUser.adventures.id(req.params.adventureId);
    res.render('adventures/edit.ejs', {
    adventure: adventure,
    });
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});
      
router.put('/:adventureId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const adventure = currentUser.adventures.id(req.params.adventureId);
    adventure.set(req.body);
    await currentUser.save();
    res.redirect(
     `/users/${currentUser._id}/adventures/${req.params.adventureId}`
    );
  } catch (error) {
    console.log(error);
    res.redirect('/')
  }
});



module.exports = router;