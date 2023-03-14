const { Schema, model, Types } = require('mongoose');
//const date_format = require('../utils/date_format');
import dateFormat, {masks} from "dateformat";

// this "reactionSchema" will be inserted into "thoughtSchema"
// So, this will be the reaction to the "thought"
const reactionSchema = new Schema(
   {
      reactionId: {
         type: Schema.Types.ObjectId, 
         default: () => new Types.ObjectId() // Default value is set to a new ObjectID
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
   }
);

const thoughtSchema = new Schema(
   {
      thoughtText: {
         type: String,
         required: true,
         // must be between 1 and 280 characters:
         minlength: 1,
         maxlength: 280,
      },
      username: {
         type: String,
         required: true,
      },
      createdAt: {
         type: Date,
         default: Date.now, // Set default value to the current timestamp
         get: (timestamp) => dateFormat(timestamp) // use a getter method to format the timestamp on query
      },
      // These are like replies,
      // Array of nested documents created with the reactionSchema
      reactions: [reactionSchema],

      // here, "reactionCount" will be virtually included ...
   },
   {
      toJSON: {
         virtuals: true, // "reactionCount" will be added virtually
         getters: true,
      },
      id: false
   }
);

// This will retrieves the length of the thought's 'reactions' array field on query, and put into the "thoughtSchema"
thoughtSchema.virtual("reactionCount").get(function () {
   return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);


// Let's initialize with some information...
const handleError = (err) => console.error(err);

// Will add data only if collection is empty to prevent duplicates
// More than one document can have the same name value
Thought.find({}).exec((err, collection) => {
  if(err) {
    return handleError(err);
  }
  if (collection.length === 0) {
    return Thought.insertMany(
      [
        { thoughtText: 'Thoughts are the words of our minds', username: "sam_1" },
      ],
      (insertErr) => {
        if (insertErr) {
          handleError(insertErr);
        } else {
          console.log ('Initial thoughts have been inserted');
        }
      }
    );
  }
});

module.exports = Thought;