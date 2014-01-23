/**
 * Created by vsubramaney on 1/16/14.
 */

var mongoose = require('mongoose')
    , Questions = mongoose.model('Questions')
    , url = require( "url" )
    , queryString = require( "querystring" )
    , DataMassager = require('../utils/dataHelper')

exports.get_problem_by_id = function(req, res) {
 /*   var theUrl = url.parse( req.url );
    var queryObj = queryString.parse( theUrl.query );
    var problem_id = queryObj.id;*/

    var problem_id = req.params.id;

    Questions.load(problem_id, function(error, problem){
        if (error){
            res.send(404);
        } else {
            res.json(null, problem);
        }
    });
}

exports.get_n_problems = function(req, res) {
    var theUrl = url.parse( req.url );
    var queryObj = queryString.parse( theUrl.query );
    var pageNo = queryObj.pageNo;
    //var n = queryObj.n;
    var n = req.params.n;
    if (typeof(n) == 'undefined') {
        n =10;
    }

    if (typeof(pageNo) == 'undefined' || pageNo == 0) {
        pageNo = 1;
    }

    Questions.listNProblem(n, pageNo*n, function(error, problem){
        console.log(n);

        if (error) {
            res.send(404);
        } else {
            return res.json(null, DataMassager.addNumericIdentifier(problem, pageNo*n));
        }
    });
}

exports.get_problems = function(req, res) {
    Questions.list('', function(error, problems){
        if (error) {
            res.send(404);
        } else {
            var pageNo = 0;
            res.json(null, DataMassager.addNumericIdentifier(problems, pageNo));
        }
    });
}

exports.get_problem = function (req, res) {
    randomNo = randomFromInterval(0,3);
    console.log("random No - "+randomNo);
    Questions.randomProblem(randomNo, function(error, problem){
        if (error) {
            res.send(404);
        } else {
            return res.json(null, problem[0]);
        }
    });
}

exports.createProblem = function(req, res) {
    var question = new Questions(req.body);

    console.log('Adding Problem:' + JSON.stringify(question))
    question.save(function (err) {
        console.log("error", err);
        if (err) {
          res.send(404);
        } else {
            res.send(null, 200);
        }
    });
}

var randomFromInterval  = function(from,to) {
    return Math.floor(Math.random()*(to-from+1)+from);
}