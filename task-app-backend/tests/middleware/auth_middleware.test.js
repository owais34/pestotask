const { auth_handler } = require("../../src/middleware/auth_middleware")


test('should reject token', () => { 
  const req = {
    headers:{
      authorization: "Bearer hhhaij9ji09qke90eq"
    }
  }

  const res = {}
  const next = jest.fn((err)=>{

  })

  auth_handler(req,res,next)
  expect(next).toHaveBeenCalledWith(new Error("Invalid Token"))
 })

 

 test('should accept token', () => { 
  const req = {
    headers:{
      authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzA5OTE0Njc3fQ.KayojMSwh11PJ01AhhFyJlRFoLH9UJgMhFACzhlBjuM"
    }
  }
  const res = {}
  const next = jest.fn((err)=>{
    
  })
  auth_handler(req,res,next)
  expect(next).toHaveBeenCalled()
 })