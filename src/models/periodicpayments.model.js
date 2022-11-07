// periodicpayments-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app)
{
  const modelName = 'periodicpayments';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    household: {
      type: mongooseClient.Schema.ObjectId,
      required: true,
    },
    frequency: {
      type: String,
      minlength: [2, "frequency should be atleast 3 characters long"],
      maxlength: [40, "frequency should not exceed 40 characters"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    expensetype: {
      type: mongooseClient.Schema.ObjectId,
      required: true,
    },
    paymentDetails: {
      type: [
        {
          amount: {
            type: Number,
          },
          date: {
            type: Date,
          },
          method: {
            type: String,
          },
        },
      ],
      default: null,
    },
    description: {
      type: String,
      minLength: [3, "description should be at least 3 characters long"],
      maxLength: [500, "description should not exceed more than 500 characters"],
      required: true,
    },
    paidThrough: {
      type: [String],
      minLength: [3, "BankName/UPI id/Third Party Apps name should be at lease 3 characters long"],
      maxLength: [50, "BankName/UPI id/Third Party Apps name should not exceed more than 50 characters"],
      default: []
    },
    paidBy: [
      {
        type: String,
        minLength: [3, "payor name should be at least 3 characters long"],
        maxLength: [50, "payor name should not exceed than 50 characters"],
        default: null,
      }
    ],
  },
    {
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
