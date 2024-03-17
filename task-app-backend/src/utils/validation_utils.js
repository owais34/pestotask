

const validationFunctionObject = {
    email: function (email) {
      if (email) {
        return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      } else {
        return false;
      }
    },
    password: function (password) {
      if (password) {
        return password.length >= 8;
      } else {
        return false;
      }
    },
      name: function(name) {
          if(name) {
              return true;
          } else {
              return false;
          }
      },
      reset_hash: function(reset_hash) {
          if(reset_hash && String(reset_hash).length === 100){
              return true;
          } else {
              return false;
          }
      },
      verify_hash: function(verify_hash) {
          if(verify_hash && String(verify_hash).length>10){
              return true;
          } else {
              return false
          }
      },
      title: function (title) {
        if (title && title.length<=100) {
            return true
        } else {
            return false
        }
      },
      description: function (description) {
        if(description) {
            return true
        } else {
            return false
        }
      },
      status: function (status) {
        return ["To Do","In Progress","Completed"].includes(status)
      }
  };

  const validateMandatoryFields = (object, field_list) => {
    field_list.forEach((field) => {
      if(!validationFunctionObject[field])
        return

      if (!validationFunctionObject[field](object[field])) {
        throw new Error(`${field} is missing or invalid`);
      }
    });
  };


module.exports = {
    validateMandatoryFields
}