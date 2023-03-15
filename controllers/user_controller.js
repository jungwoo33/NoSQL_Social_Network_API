const {User, Thought} = require("../models");

const user_controller = {
   // Get all users
   get_all_users(req,res) {
      User.find({})
         .then((users) => res.json(users))
         .catch((err) => res.status(500).json(err));
   },

   // Get a single user
   get_user_by_id(req,res) {
      User.findOne({_id: req.params.userId})
         // show not just "thoughts" id but details with "populate" method:
         .populate({
            path: "thoughts",
            select: "-__v",
         })
         // same as "thoughts", i.e., show details of "freinds" info
         .populate({
            path: "friends",
            select: "-__v",
         })
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
               : Thought.deleteMany({_id: {$in: user.thoughts}}))
         .then(() => res.json({message: 'User and associated apps deleted!'}))
         .catch((err) => res.status(500).json(err));
   },

   // Add friend
   add_friend(req,res) {
      User.findOneAndUpdate(
         {_id: req.params.userId},
         {$addToSet: {friends: req.params.friendId}}, // $addToSet adds a value to an array unless the value is already present
         {new: true, runValidators: true})
      .then((user) => 
         !user
            ? res.status(404).json({message: "No user with that ID"})
            : res.json(user))
      .catch((err) => res.json(err));
   },

   // Delete friend
   // Note, this is not actual deleting but updating, i.e., updating "friends"
   // Here, {new: true} should be included since:
   //    By default, the returned document does not include the modifications made on the update. 
   //    To return the document with the modifications made on the update, use the "new" option.
   delete_friend(req,res) {
      User.findOneAndUpdate(
         {_id: req.params.userId},
         {$pull: {friends: req.params.friendId}}, // $pull removes from an existing array all instances of a values that match a specified condition.
         {new: true, runValidators: true})
      .then((user) => 
         !user
            ? res.status(404).json({message: "No user with that ID"})
            : res.json(user))
      .catch((err) => res.json(err));
   }
};

module.exports = user_controller;