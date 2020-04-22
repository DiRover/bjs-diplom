'use strict'

const userForm = new UserForm();
userForm.loginFormCallback = data => {   
    ApiConnector.login(data, response => {
      if (response.success) {
        location.reload();
      } else {
        console.error(`Error, this staff doesn't work`)
        }
    })
}
userForm.registerFormCallback = data => {   
    ApiConnector.login(data, response => {
        if (response.success) {
            location.reload();
        } else {
            console.error(`Error, this staff doesn't work`)
        }
    })
}