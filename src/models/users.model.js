// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app)
{
  const modelName = 'users';
  const mongooseClient = app.get('mongooseClient');
  const schema = new mongooseClient.Schema({
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
    email: {
      type: String,
      minLength: [5, "Email should be atleast 5 characters long"],
      maxLength: [255, "Email should be atmost 255 characters long"],
      required: true,
      unique: true,
      lowercase: true
    },
    phone: {
      type: String,
      minLength: [7, "Phone should be atleast 7 digits long"],
      maxLength: [10, "Phone should be atmost 10 digits long"],
      required: true,
    },
    userName: {
      type: String,
      minLength: [5, "Username should be atleast 5 characters long"],
      maxLength: [100, "Username should be atmost 255 characters long"],
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minLength: [8, "Password should be atleast 8 characters long"],
      maxLength: [1024, "Password should be atmost 1024 characters long"],
      required: true,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "primary user", "member"],
        message: "{VALUE} is not supported,",
      },
      required: true,
    },
    lastLoggedIn: {
      type: Date,
      default: new Date(Date.now()),
    },
    isActive: { type: Boolean, default: true },
    updatedBy: {
      type: mongooseClient.Schema.ObjectId,
      default: null
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
    resetLink: {
      type: String,
      default: ''
    },
    profileImage: {
      imageBuffer: {
        type: Buffer,

      },
      fileName: { type: String },
      type: { type: String },
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
