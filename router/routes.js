/**
 * Created by vsubramaney on 1/16/14.
 */

var questions = require('../app/controllers/questionsController')

module.exports = function (app)
{
    // router for GET requests
    app.get('/newProblem', questions.get_problem)
    app.get('/problemById', questions.get_problem_by_id)
    app.get('/allProblems', questions.get_problems)
    app.get('/getNProblems', questions.get_n_problems)

    //router for POST requests
    app.post('/createProblem', questions.createProblem)

}