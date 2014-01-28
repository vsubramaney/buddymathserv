/**
 * Created by vsubramaney on 1/16/14.
 */

var mongoose = require('mongoose')
    , Questions = mongoose.model('Questions')
    , url = require( "url" )
    , queryString = require( "querystring" )
    , DataMassager = require('../utils/dataHelper')

/*
 method to retrieve problem based on an ObjectId
*/
exports.get_problem_by_id = function(req, res) {
 /*   var theUrl = url.parse( req.url );
    var queryObj = queryString.parse( theUrl.query );
    var problem_id = queryObj.id;*/

    var problem_id = req.params.id;

    Questions.load(problem_id, function(error, problem){
        if (error){
            res.send(404);
        } else {
            res.json(200, problem);
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

    if (typeof(pageNo) == 'undefined') {
        pageNo = 0;
    }

    Questions.listNProblem(n, pageNo*n, function(error, problem){
        console.log("Vinod ",n);
        console.log("Vinod -",pageNo)
        console.log(parseInt(n,0)*parseInt(pageNo, 0));
        var n_converted = +n;
        var pageNo_converted = +pageNo;

        if (error) {
            res.send(404);
        } else {
            console.log(typeof(n_converted), typeof(pageNo_converted));
            start= n_converted*pageNo_converted;
            console.log("start - ",start);
            console.log(DataMassager.addNumericIdentifier(problem, pageNo*n));
            return res.json(200, DataMassager.addNumericIdentifier(problem, pageNo*n));
        }
    });
}

/*
// method to get all problems

exports.get_problems = function(req, res) {
    Questions.list('', function(error, problems){
        if (error) {
            res.send(404);
        } else {
            var pageNo = 0;
            res.json( 200, DataMassager.addNumericIdentifier(problems, pageNo));
        }
    });
}*/

exports.get_problem = function (req, res) {
    randomNo = randomFromInterval(0,3);
    console.log("random No - "+randomNo);
    Questions.randomProblem(randomNo, function(error, problem){
        if (error) {
            res.send(404);
        } else {
            return res.json(200, problem[0]);
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
            res.send(200, 200);
        }
    });
}

var randomFromInterval  = function(from,to) {
    return Math.floor(Math.random()*(to-from+1)+from);
}