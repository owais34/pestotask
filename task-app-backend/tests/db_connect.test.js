const {connect_db,pool} = require('../src/db_connect')


jest.mock('pg',()=>{
  return {
    Pool: jest.fn(()=>{
      return {
        connect: async()=>{}
      }
    })
  }
})


test('should connect', async() => {
  await connect_db()
})