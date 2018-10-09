
class DatabaseHandler {
  constructor(db, model) {
    this.db = db;
    this.model = model;
   }

  addObject(body) {
    const Model = this.model;
    var object = new Model(body);

    // Save the new model instance, passing a callback
    object.save( err => {
      if (err) {
        console.log(err.errors);
        return(err.errors)
      }
    });
  }

  getCollection() {
    return new Promise( resolve => {
      this.model.find({}, (err, res) => {
        if(err) {
          console.log(err);
          resolve(err);
        }
        else{
          resolve(res)
        }
      })
    })
  }

  findObject(key, value) {
    return new Promise ( resolve => {
      if(key === '_id') {
        this.model.findById(value, (err, res) => {
          if (err) {
            console.log(err);
            resolve(err);
          }
          else{
            resolve(res);
          }
        });
      }
      else {
        var jsonObj = {};
        jsonObj[key] = value
        this.model.findOne(jsonObj, (err, res) => {
          if (err) {
            console.log(err);
            resolve(err);
          }
          else{
            resolve(res);
          }
        })
      }
    });
  }

  updateObject(id, newValue) {
    return new Promise( resolve => {
      this.model.findByIdAndUpdate(id, newValue, (err, res) => {
        if(err) {
          console.log(err);
          resolve(err);
        }
        else {
          resolve(res);
        }
      })
    });
  }

  deleteObject(id) {
    new Promise(resolve => {
      this.model.findByIdAndRemove(id, (err, res) =>{
        if(err) {
          console.log(err);
          resolve(err);
        }
        else {
          console.log(res);
          resolve(res)
        }
      })
    });
  }

  // TODO:
  // deleteObject
  // appendToKey
  // pullFromKey
  // changeKey
  // incerementKey
  // decrementKey
}

module.exports = DatabaseHandler
