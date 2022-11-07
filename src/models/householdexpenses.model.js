// householdexpenses-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app)
{
  const modelName = 'householdexpenses';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({

    household: {
      type: mongooseClient.Schema.ObjectId,
      required: true,
    },
    expensetype: {
      type: mongooseClient.Schema.ObjectId,
      required: true,
    },
    paymentDetails: {
      amount: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      method: {
        type: String,
        required: true
      },
    },
    description: {
      type: String,
      minLength: [3, "description should be at least 3 characters long"],
      maxLength: [500, "description should not exceed more than 500 characters"],
      required: true,
    },
    paidThrough: {
      type: String,
      minLength: [3, "BankName/UPI id/Third Party Apps name should be at lease 3 characters long"],
      maxLength: [50, "BankName/UPI id/Third Party Apps name should not exceed more than 50 characters"],
      required: true,
    },
    paidBy: {
      type: String,
      minLength: [3, "payor name should be at least 3 characters long"],
      maxLength: [50, "payor name should not exceed than 50 characters"],
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
