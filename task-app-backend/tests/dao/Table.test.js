const {Table} = require('../../src/dao/Table')
const {when} = require('jest-when')

const queryMock = jest.fn()
when(queryMock).calledWith(expect.any(String)).mockResolvedValue({rows:[]})
when(queryMock).calledWith(expect.any(String),expect.any(Array)).mockResolvedValue({rows:[]})


Table.pool = {
  query: queryMock
}

Table.schema = {
  id:{
    isPK: true
  },
  name:{

  }
}

test('should get all', async () => { 
  const result = await Table.getAll()
  expect(result).toEqual([])
 })

 test('should add', async () => { 
  const result = await Table.add({id:1,name:"name"})
  expect(result).toEqual([])
 })

 test('should update', async () => { 
  const result = await Table.update({id:1,name:"name"})
  expect(result).toEqual([])
 })

 test('should delete', async () => { 
  const result = await Table.delete({id:1,name:"name"})
  expect(result).toEqual([])
 })

 