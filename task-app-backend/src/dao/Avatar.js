const { Table } = require("./Table");


class Avatar extends Table {
  static schema = {
    id:{isPK:true},
    avatar_name:{},
    link:{}
  }
}

module.exports = {
  Avatar
}