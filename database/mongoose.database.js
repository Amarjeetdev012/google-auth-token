const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

const connectDatabase = () => {
  console.log('mongodb is connecting');
  mongoose
    .connect(
        'mongodb+srv://amarjeet:8ckRS2Equ0wiGgKx@cluster0.9lvsazp.mongodb.net/test',
      {
        useNewUrlParser: true,
      }
    )
    .then(() => {
      console.log(`mongodb is connected`);
    })
    .catch((err) => {
      console.log(`${err}`);
    });
};

module.exports = connectDatabase
