
const pool = {
  query : async(query,param=[])=>{
    
    let p = "["
    for(let i of param)
    p=p+i+","
    p=p+"]"
    return {
      rows: query+p
    }
  }
}

const runner = (callback) => {
  console.log(callback.toString())
}

const func = (id) => {
  return (id>=1
    && id<=5
    )
}

console.log(func.prototype)
console.log(func.toString())

console.log(runner((user)=>{
  return (user.id == 2)
}))