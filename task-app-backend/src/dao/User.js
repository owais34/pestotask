const { Table } = require("./Table");

class User extends Table {
  static schema = {
    id: { isPK: true },
    name: {},
    email: {},
    avatar_id: {},
    password: {},
    is_verified: {},
    verified_hash: {},
    reset_hash: {},
  };

  static async getFullUserInfoById(id) {
    const result = await this.pool.query(
      `select * from pestotask.user left join pestotask.avatar on pestotask.user.avatar_id=
        pestotask.avatar.id  where pestotask.user.id = $1`,
      [id]
    );
    return result.rows;
  }
}

module.exports = {
  User,
};
