// households-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app)
{
  const modelName = 'households';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    name: {
      type: String,
      minLength: [3, "Name should be atleast 3 characters long"],
      maxLength: [50, "Name should be atmost 50 characters long"],
      unique: [true, "Household name must be unique"],
      required: true,
    },
    addressLine1: {
      type: String,
      minLength: [5, "AddressLine1 should be atleast 5 characters long"],
      maxLength: [40, "AddressLine1 should be atmost 40 characters long"],
      required: true,
    },
    addressLine2: {
      type: String,
      minLength: [5, "AddressLine2 should be atleast 5 characters long"],
      maxLength: [40, "AddressLine2 should be atmost 40 characters long"],
      // required: true,
    },
    area: {
      type: String,
      minLength: [3, "Area name should be atleast 3 characters long"],
      maxLength: [30, "Area name should be atmost 30 characters long"],
      required: true,
    },
    city: {
      type: String,
      minLength: [3, "City name should be atleast 3 characters long"],
      maxLength: [30, "City name should be atmost 30 characters long"],
      required: true,
    },
    state: {
      type: String,
      minLength: [3, "State name should be atleast 2 characters long"],
      maxLength: [40, "State name should be atmost 40 characters long"],
      required: true,
    },
    zipcode: {
      type: String,
      minLength: [6, "Zipcode should be atleast 6 characters long"],
      maxLength: [6, "Zipcode should be atmost 6 characters long"],
      required: true,
    },
    createdBy: {
      type: mongooseClient.Schema.ObjectId,
      required: true,
    },
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName))
  {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
