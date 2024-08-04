const express = require('express');
const pdfRoute = express.Router();
const taskController = require('../controller/taskController')
const {authToken} = require('../middleware/authnticate')


pdfRoute.post("/",[authToken],taskController.createTask);
pdfRoute.get("/",[authToken],taskController.getTask);










module.exports = {
    pdfRoute
}