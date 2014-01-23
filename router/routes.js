/**
 * Created by vsubramaney on 1/16/14.
 */

var questions = require('../app/controllers/questionsController')

module.exports = function (app)
{
    // router for GET requests
    app.get('/problem', questions.get_problem)
    app.get('/problem/:id', questions.get_problem_by_id)
    app.get('/problems', questions.get_problems)
    app.get('/problems/:n', questions.get_n_problems)

    //router for POST requests
    app.post('/problem', questions.createProblem)

}