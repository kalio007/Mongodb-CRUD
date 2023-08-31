
require('dotenv').config();
const mongoose = require('mongoose');
const { Schema } = mongoose;
let uri = "mongodb+srv://user1:utjwA5tNuduMDSOT@lighthouse.8sdhpcv.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});

const peopleSchema = new Schema({
  name: String,
  age: Number,
  favfood: String,
});

let Person = mongoose.model('Person', peopleSchema);

const createAndSavePerson = (done) => {
  let dave = new Person({ name: 'Dave', age:22, favfood:'beans' });
  dave.save((error, data) => {
    if (error){
      console.log(error)
    } else {
      done(null, data)
    }
  });
};
const arrayOfPeople = [
  { name: 'Adam', age: 24, favoriteFoods: ['indomie noodle'] },
  { name: 'Sola', age: 36, favoriteFoods: ['roasted yam'] },
  { name: 'Colins', age: 48, favoriteFoods: ['Red wine'] },
]

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error, createdPeople) => {
    if (error){
      console.log(error)
    }else{
      done(null, createdPeople);
    }
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: 'kris', age: 22 }, (error, data) => {
    if (error){
      console.log(error)
    }else{
      // console.log(data)
      done(null, data);
    }
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favfood: {$all: 'prawns'}}, (error, data) => {
    if(error){
      console.log(error)
    }else{
      done(null, data);
    }
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (error, data) => {
    if (error){
      console.log(error)
    }else{
      done(null, data);
    }
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';
  Person.findById(personId, (error, person) => {
    if (error) {return console.log(error)};

    person.favfood.push(foodToAdd);

    person.save((error, updatedPerson) => {
      if (error) {return console.log(error)};
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  Person.findOneAndRemove(personId, (error, deleteData) => {
    if(!error){
      console.log(deleteData)
    }
  })
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};


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
