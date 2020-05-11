module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
 //
//  {
//   username: "zhangsan",
//   password: "123456",
//   mobile: "13077777777",
//   email: "13077777777@163.com",
//   status: 1,
//   is_super: 0,
//   add_time: 1589181144903
//  }
  const AdminSchema = new Schema({
    username: { type: String  },
    password: { type: String  },
    mobile: { type: String  },
    email: { type: String  },
    status: { type: Number, default: 1 },
    role_id: { type: Schema.Types.ObjectId },
    is_super: {type: Number, default: 0},  //1超级管理员
    add_time: {
      type: Number,
      default: new Date().getTime()
    }
  });
 
  return mongoose.model('Admin', AdminSchema, 'admin');
}
