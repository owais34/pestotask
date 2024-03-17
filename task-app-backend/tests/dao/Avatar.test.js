const {Avatar} = require('../../src/dao/Avatar')

const {when} = require('jest-when')

const queryMock = jest.fn()
when(queryMock).calledWith(expect.any(String)).mockResolvedValue({rows:[]})
when(queryMock).calledWith(expect.any(String),expect.any(Array)).mockResolvedValue({rows:[]})

Avatar.pool = {
  query: queryMock
}

test('should get all', async() => {
  const result = await Avatar.getAll()
  expect(result).toEqual([])
})