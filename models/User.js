const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
   {
      userename: { type: String, required: true },
      lastAccessed: { type: Date, default: Date.now },
   },
   {
      toJSON: {
         virtuals: true,
      },
      id: false,
   }
);

// Create a virtual property 'friendCount' that retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount').get(function(){
   return ; // I have to insert the return value later...
})

const User = mongoose.model('User', userSchema);

const handleError = (err) => console.error(err);

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

module.exports = User;