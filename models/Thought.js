const { Schema, model, Types } = require('mongoose');

const reactionSchema = new Schema({
   reactionID: {
      type: Schema.Types.ObjectID, 
      default: () => new Types.ObjectID() // Default value is set to a new ObjectID
   },
   reactionBody: {
      type: String,
      required: true,
      maxlength: 280 // character max length
   },
   username: {
      type: String,
      required: true
   },
   createdAt: {
      type: Date,
      default: Date.now, // Set default value to the current timestamp
      get: (timestamp) => dateFormat(timestamp), // use a getter method to format the timestamp on query
   }
},
{
   toJSON: {
      getters: true,
   },
   id: false
});

const thoughtSchema = new Schema({
   thoughtText: {
      type: String,
      required: true,
      // must be between 1 and 280 characters:
      minlength: 1,
      maxlength: 280,
   },
   createdAt: {
      type: Date,
      default: Date.now, // Set default value to the current timestamp
      get: (timestamp) => dateFormat(timestamp) // use a getter method to format the timestamp on query
   },
   username: {
      type: String,
      required: true,
   },
   // These are like replies,
   // Array of nested documents created with the reactionSchema
   reactions: [reactionSchema]
},
{
   toJSON: {
      virtuals: true, // "reactionCount" will be added virtually
      getters: true,
   },
   id: false
});

// This will retrieves the length of the thought's 'reactions' array field on query, and put into the "thoughtSchema"
thoughtSchema.virtual("reactionCount").get(function () {
   return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;