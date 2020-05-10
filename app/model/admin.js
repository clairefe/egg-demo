module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
 
  const AdminSchema = new Schema({
    username: { type: String  },
    password: { type: String  },
    mobile: { type: String  },
    email: { type: String  },
    status: { type: Number, default: 1 },
    role_id: { type: Schema.Types.ObjectId },
    is_super: {type: Number},
    add_time: {
      type: Number,
      default: new Date().getTime()
    }
  });
 
  return mongoose.model('Admin', UserSchema, 'admin');
}
