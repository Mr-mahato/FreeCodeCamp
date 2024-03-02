require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
let Person;

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  // array of string
  favoriteFoods: [String]
})


// this is the model creation part
Person = mongoose.model('Person', personSchema);


//   3rd task
const createAndSavePerson = (done) => {

  const newPerson = new Person({
    name: "chandan",
    age: 23,
    favoriteFoods: ["chicken", "mutton", "pork"]
  });
  newPerson.save((err, data) => {
    if (err) {
      return console.error(err);
    }
    done(null, data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {

  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  })
};

const findPeopleByName = (personName, done) => {

  Person.find({ name: personName }, (err, data) => {
    if (err) done(err);
    else
      console.log(data); http://localhost:3000/
    done(null, data);
  })

};

const findOneByFood = (food, done) => {

  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return console.error(err);
    console.log(data);
    done(null, data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, data) => {
    if (err) return console.error(err)
    done(null, data);
  })
  // done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById({ _id: personId }, (err, person) => {
    if (err) return console.error(err);
    else {
      // console.log(data);
      person.favoriteFoods.push(foodToAdd);
      person.save((err, updatedData) => {
        if (err) return console.error(err);
        done(null, updatedData);
      })
    }
  })

  // done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, (err, person) => {
    if (err) return console.error(err)
    done(null, person);
  })
};

const removeById = (personId, done) => {

  Person.findOneAndRemove({_id:personId},(err,person)=>{
    if(err) return console.error(err)
    done(null,person);
  })
  // done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name:nameToRemove},(err,person)=>{
    if(err) return console.error(err);
    done(null,person);
  })

};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch})
  .sort({name:1})
  .limit(2)
  .select({name:1})
  .exec((err,data)=>{
    if(err) return console.error(err)
    done(null,data);
  })

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
