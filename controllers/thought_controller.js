const {User, Thought} = require("../models");

const thought_controller = {
   // Get all thoughts
   get_all_thoughts(req,res) {
      Thought.find()
         .then((thoughts) => res.json(thoughts))
         .catch((err) => res.status(500).json(err));
   },

   // Get a single thought by id
   get_thought_by_id(req,res) {
      Thought.findOne({_id: req.params.thoughtId})
         .select('-__v')
         .then((thought) => 
            !thought
               ? res.status(404).json({ message: 'No thought with that ID'})
               : res.json(thought))
         .catch((err) => res.status(500).json(err));
   },
   // Create (post) a new thought
   post_new_thought(req,res) {
      Thought.create(req.body)
         .then((thought) => res.json(thought))
         .catch((err) => res.status(500).json(err));
   },
   /*
   // Update a thought by id
   update_thought_by_id(req,res) {
      Thought.findOneAndUpdate({_id: req.params.thoughtId})
         .then((thought) =>
            !thought
               ? res.status(404).json({ message: 'No thought found with this ID'})
               : res.json(thought))
         .catch((err) => res.json(err));
   },
   // Delete a thought and associated apps
   delete_thought_by_id(req,res) {
      Thought.findOneAndDelete({_id: req.params.thoughtId})
         .then((thought) => 
            !thought
               ? res.status(404).json({message: 'No thought with that ID'})
               : application.deleteMany({_id: {$in: thought.application}}))
         .then(() => res.json({message: 'Thought and associated apps deleted!'}))
         .catch((err) => res.status(500).json(err));
   },
   */
};

module.exports = thought_controller;