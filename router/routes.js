/**
 * Created by vsubramaney on 1/16/14.
 */

var problems = require('../app/controllers/problemsController')

module.exports = function (app)
{
    // router for GET requests
    app.get('/newProblem', problems.get_problem)
    app.get('/problemById', problems.get_problem_by_id)
    app.get('/allProblems', problems.get_problems)

    //router for POST requests
    app.post('/createProblem', problems.createProblem)

}