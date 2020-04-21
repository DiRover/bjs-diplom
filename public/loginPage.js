'use strict'

import { response } from "express";

const userForm = new UserForm();
userForm.loginFormCallback = data => {   
    ApiConnector.login(data, response = console.log(response));
    console.log(data);
}