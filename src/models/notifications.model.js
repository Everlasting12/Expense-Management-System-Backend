// notifications-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app)
{
  const modelName = 'notifications';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    firstName: {
      type: String,
      minLength: [2, "firstName should be atleast 5 characters long"],
      maxLength: [50, "firstName should be atmost 50 characters long"],
      required: true,
    },
    lastName: {
      type: String,
      minLength: [2, "lastName should be atleast 5 characters long"],
      maxLength: [50, "lastName should be atmost 50 characters long"],
      required: true,
    },
    emailid: {
      type: String,
      minLength: [3, "Email should be atleast 5 characters long"],
      maxLength: [255, "Email should be atmost 255 characters long"],
      match: /.+\@.+\..+/,
    },
    phone: {
      type: String,
      minLength: [7, "Phone should be atleast 7 digits long"],
      maxLength: [10, "Phone should be atmost 10 digits long"],
      required: true,
    },
    message: {
      type: String,
      minLength: [5, "Message should be atleast 5 characters long"],
      maxLength: [2000, "Message should be atmost 2000 characters long"],
      required: true,
    },
    isRegistered: {
      type: Boolean,
      default: false,
    },
    isViewed: {
      type: Boolean,
      default: false,
    },
    issueNumber: {
      type: String,
    }

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
