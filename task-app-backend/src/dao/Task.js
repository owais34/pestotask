const { Table } = require("./Table");


class Task extends Table {
  static schema = {
    id:{
      isPK: true
    },
    user_id:{},
    title:{},
    description:{},
    creation_date:{},
    updation_date:{},
    completion_date:{},
    status:{}
  }
}

module.exports = {
  Task
}