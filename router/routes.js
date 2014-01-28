/**
 * Created by vsubramaney on 1/16/14.
 */

var questionsController = require('../app/controllers/questionsController')
var userController = require('../app/controllers/userController')

module.exports = function (app)
{
    // router for Problem
    app.get('/problems/random', questionsController.get_problem)
    app.get('/problems/:id', questionsController.get_problem_by_id)
    //app.get('/problems', questionsController.get_problems)
    app.get('/problems/:n', questionsController.get_n_problems)
    app.post('/problems', questionsController.createProblem)

    // router for User
    app.get('/user/:id', userController.getUserById)
    app.post('/user', userController.createUser)
    app.post('/user/authenticate', userController.authenticate)


}