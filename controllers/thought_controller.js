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
      Thought.findOne({_id: req.params.id})
         // show not just "reactions" id but details with "populate" method:
         .populate({
            path: "reactions",
            select: "-__v",
         })
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
   // Update a thought by id
   update_thought_by_id(req,res) {
      Thought.findOneAndUpdate({_id: req.params.id})
         .then((thought) =>
            !thought
               ? res.status(404).json({ message: 'No thought found with this ID'})
               : res.json(thought))
         .catch((err) => res.json(err));
   },
   // Delete a thought and associated apps
   delete_thought_by_id(req,res) {
      Thought.findOneAndDelete({_id: req.params.id})
         .then((thought) => 
            !thought
               ? res.status(404).json({message: 'No thought with that ID'})
               : application.deleteMany({_id: {$in: thought.application}}))
         .then(() => res.json({message: 'Thought and associated apps deleted!'}))
         .catch((err) => res.status(500).json(err));
   },

   // add reaction:
   add_reaction(req,res) {
      Thought.findOneAndUpdate(
         {_id: req.params.id},
         {$addToSet: {reactions: req.params.body}}, // $addToSet adds a value to an array unless the value is already present
         {new: true, runValidators: true})
      .then((thought) => 
         !thought
            ? res.status(404).json({message: "No thought with that ID"})
            : res.json(thought))
      .catch((err) => res.json(err));
   },

   // delete reaction:
   delete_reaction(req,res) {
      Thought.findByIdAndDelete(
         {_id: req.params.id},
         {$pull: {reactions: req.params.reactionId}}, // $pull removes from an existing array all instances of a values that match a specified condition.
         {new: true})
      .then((thought) => 
         !thought
            ? res.status(404).json({message: "No thoguht with that ID"})
            : res.json(thought))
      .catch((err) => res.json(err));
   }
};

module.exports = thought_controller;