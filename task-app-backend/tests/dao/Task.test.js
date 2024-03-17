const {Task} = require('../../src/dao/Task')

const {when} = require('jest-when')

const queryMock = jest.fn()
when(queryMock).calledWith(expect.any(String)).mockResolvedValue({rows:[]})
when(queryMock).calledWith(expect.any(String),expect.any(Array)).mockResolvedValue({rows:[]})

Task.pool = {
  query: queryMock
}

test('should get all', async() => {
  const result = await Task.getAll()
  expect(result).toEqual([])
})