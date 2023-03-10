const {User, Thought} = require("../models");

const user_controller = {
   // Get all users
   get_all_users(req,res) {
      User.find()
         .then((users) => res.json(users))
         .catch((err) => res.status(500).json(err));
   },
   // Get a single user
   get_user_by_id(req,res) {
      User.findOne({_id: req.params.userId})
         .select('-__v')
         .then((user) => 
            !user
               ? res.status(404).json({ message: 'No user with that ID'})
               : res.json(user))
         .catch((err) => res.status(500).json(err));
   },
   // Create (post) a new user
   post_new_user(req,res) {
      User.create(req.body)
         .then((user) => res.json(user))
         .catch((err) => res.status(500).json(err));
   },
   // Update a user by id
   update_user_by_id(req,res) {
      User.findOneAndUpdate({_id: req.params.userId})
         .then((user) =>
            !user
               ? res.status(404).json({ message: 'No user found with this ID'})
               : res.json(user))
         .catch((err) => res.json(err));
   },
   // Delete a user and associated apps
   delete_user_by_id(req,res) {
      User.findOneAndDelete({_id: req.params.userId})
         .then((user) => 
            !user
               ? res.status(404).json({message: 'No user with that ID'})
               : application.deleteMany({_id: {$in: user.application}}))
         .then(() => res.json({message: 'User and associated apps deleted!'}))
         .catch((err) => res.status(500).json(err));
   },
};