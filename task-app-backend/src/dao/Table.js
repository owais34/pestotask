const { pool } = require("../db_connect")

const schema = process.env.PGSCHEMA
let schemaPrefix = ""
if(schema){
  schemaPrefix = schema.concat(".")
}

class Table {
  static pool = pool
  static schema = {

  }


  static async getAll(){
    const result = await pool.query(`select * from ${schemaPrefix}${this.name}`)
    return result.rows
  }

  static async getWhere(whereClause,params){
    const result = await pool.query(`select * from ${schemaPrefix}${this.name} where ${whereClause}`,params)
    return result.rows
  }

  static async add(entryObject){
    entryObject = this.deleteNonFields(entryObject)
    let dynamicFieldSet = ""
    let dynamicParam = ""
    const dynamicValues = []
    let counter = 1
    for(let field in entryObject){
      dynamicFieldSet = dynamicFieldSet.concat(`${field},`)
      dynamicParam = dynamicParam.concat(`$${counter},`)
      counter+=1
      dynamicValues.push(entryObject[field])
    }

    dynamicFieldSet = dynamicFieldSet.substring(0,dynamicFieldSet.length-1)
    dynamicParam = dynamicParam.substring(0,dynamicParam.length-1)
    const result = await pool.query(`insert into ${schemaPrefix}${this.name}(${dynamicFieldSet}) values (${dynamicParam})`,dynamicValues)

    return result.rows

  }

  static async update(updatedObject) {
    updatedObject = this.deleteNonFields(updatedObject)
    const primaryKeyValueObj = this.getPrimaryKeyValues(updatedObject)
    updatedObject = this.deletePrimaryKeyFields(updatedObject)
    let dynamicUpdateSet = "";
    let dynamicWhereClause = "";
    
    let counter = 1;
    let params = []
    for(let field in updatedObject){
        dynamicUpdateSet = dynamicUpdateSet.concat(`${field}=$${counter},`)
        params.push(updatedObject[field])
        counter+=1
    }
    dynamicUpdateSet = dynamicUpdateSet.substring(0,dynamicUpdateSet.length-1)

    for(let primaryKey in primaryKeyValueObj){
      dynamicWhereClause = dynamicWhereClause.concat(`${primaryKey}=$${counter} and `)
      params.push(primaryKeyValueObj[primaryKey])
      counter+=1
    }

    dynamicWhereClause = dynamicWhereClause.substring(0,dynamicWhereClause.length -4);
    
    const result = await pool.query(`update ${schemaPrefix}${this.name} set ${dynamicUpdateSet} where ${dynamicWhereClause}`,params)
    return result.rows
  }

  static async delete(deleteObject){
    deleteObject = this.deleteNonFields(deleteObject)
    const primaryKeyValueObj = this.getPrimaryKeyValues(deleteObject)
    let dynamicWhereClause = "";
    let counter = 1;
    let params = []
    
    for(let primaryKey in primaryKeyValueObj){
      dynamicWhereClause = dynamicWhereClause.concat(`${primaryKey}=$${counter} and `)
      params.push(primaryKeyValueObj[primaryKey])
      counter+=1
    }

    dynamicWhereClause = dynamicWhereClause.substring(0,dynamicWhereClause.length -4);
    const result = await pool.query(`delete from ${schemaPrefix}${this.name} where ${dynamicWhereClause}`,params)

    return result.rows
  }
  
  static deleteNonFields(baseObject){
    const modifiedObj = {...baseObject}
    for(let key in modifiedObj){
      if(!(key in this.schema)){
        delete modifiedObj[key]
      }
    }

    return modifiedObj
  }


  static getPrimaryKeyValues(baseObject){
    const primaryKeyValueObj = {}
    for(let key in baseObject){
      if(key in this.schema && this.schema[key].isPK){
        primaryKeyValueObj[key]=baseObject[key]
      }
    }

    return primaryKeyValueObj
  }

  static deletePrimaryKeyFields(baseObject){
    const modifiedObj = {...baseObject}
    for(let key in modifiedObj){
      if(key in this.schema && this.schema[key].isPK){
        delete modifiedObj[key]
      }
    }

    return modifiedObj
  }

}

module.exports={
  Table
}