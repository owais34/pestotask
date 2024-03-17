const {User} = require('../../src/dao/User')

const {when} = require('jest-when')

const queryMock = jest.fn()
when(queryMock).calledWith(expect.any(String)).mockResolvedValue({rows:[]})
when(queryMock).calledWith(expect.any(String),expect.any(Array)).mockResolvedValue({rows:[]})

User.pool = {
  query: queryMock
}

test('should get all', async() => {
  const result = await User.getAll()
  expect(result).toEqual([])
})

test('should get by id', async() => {
  const result = await User.getFullUserInfoById(1)
  expect(result).toEqual([])
})

test('should get by where condition', async() => {
  const result = await User.getWhere("id=$1",[1])
  expect(result).toEqual([])
})