const {Schema, model} = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
   {
      userename: {type: String, unique: true, required: true, trim: true},
      email: {type: String, unique: true, required: true, match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/]},
      thought: [{type: Schema.Types.ObjectID, ref: "Thought"}], // Array of _id values referencing the "Thought" model:
      friends: [{type: Schema.Types.ObjectID, ref: "User"}], // Array of _id values referencing the "User" model (self-reference)
   },

   // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
   // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
   {
      toJSON: {
         virtuals: true,
      },
      id: false,
   }
);

// Create a virtual property 'friendCount' that retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount').get(function(){
   return this.friends.length; // this will return the length of the user's friends array
});

//const User = mongoose.model('User', userSchema);
const User = model('User', userSchema);

const handleError = (err) => console.error(err);

/*
// Will add data only if collection is empty to prevent duplicates
// More than one document can have the same name value
User.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    User.insertMany(
      [
        { username: 'sam_1', email: 'sam_1@gmail.com' },
        { username: 'sam_2', email: 'sam_2@gmail.com' },
      ],
      (insertErr) => {
        if (insertErr) {
          handleError(insertErr);
        }
      }
    );
  }
});
*/

module.exports = User;