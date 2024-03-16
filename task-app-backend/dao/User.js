const { Table } = require("./Table");


class User extends Table{
  static schema = {
    id:{
      isPK: true,
    },
    name:{},
    email:{},
    avatar_id:{},
    password:{},
    is_verified:{},
    verified_hash:{},
    reset_hash:{}
  }
}