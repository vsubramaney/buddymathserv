/**
 * Created by vsubramaney on 1/16/14.
 */

var mongoose = require('mongoose')
    , Problems = mongoose.model('Problems')
    , url = require( "url" )
    , queryString = require( "querystring" )

exports.get_problem_by_id = function(req, res) {
    var theUrl = url.parse( req.url );
    var queryObj = queryString.parse( theUrl.query );
    var problem_id = queryObj.id;

    Problems.load(problem_id, function(error, problem){
        if (error){
            res.send(404);
        } else {
            res.json(problem);
        }
    });
}

exports.get_problems = function(req, res) {
    Problems.list('', function(error, problems){
        if (error) {
            res.send(404);
        } else {
            res.json(problems);
        }
    });
}

exports.get_problem = function (req, res) {
    randomNo = randomFromInterval(0,31);
    console.log("random No - "+randomNo);
    Problems.randomProblem(randomNo, function(error, problem){
        if (error) {
            res.send(404);
        } else {
            return res.json(problem[0]);
        }
    });
}

exports.createProblem = function(req, res) {
    console.log("Vinod inside createProblem()----");
    var problem = new Problems(req.body);

    console.log('Adding Problem:' + JSON.stringify(problem))
    problem.save(function (err) {
        if (err) {
          res.send(404);
        } else {
            res.send(200);
        }
    });
    res.send(200);
}

var randomFromInterval  = function(from,to) {
    return Math.floor(Math.random()*(to-from+1)+from);
}