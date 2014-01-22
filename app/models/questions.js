/**
 * Created by vsubramaney on 12/25/13.
 */

/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , _ = require('underscore')



/**
 * Questions Schema
 */
var QuestionsSchema = new Schema({
    id : Number,
    question : String,
    imageId : String, //If the problem has image then it is Image id rather than image URL to render for this problem
    choiceType : String, //CB –Check box, //TB – Text box
    choiceOptions : String, // Applicable for RB & CB
    rules : String, // Used for showing time based problem, challenge with others or do it with your own time
    group : String, // ('M',11) Medium complexity and age group below 11
    correct : String, // Answer for this problem
    hintId : String, // Image URL for solving this problem
    time: String, // Time given for answering this question
    tag : String // Tag cloud, it will be expanded
})



QuestionsSchema.path('question').validate(function (question) {
    return question.length > 0
}, 'question cannot be blank')

QuestionsSchema.path('rules').validate(function (rules) {
    return rules.length > 0
}, 'rules cannot be blank')

QuestionsSchema.path('group').validate(function (group) {
    return group.length > 0
}, 'group[problem complexity] cannot be blank')

QuestionsSchema.path('correct').validate(function (correct) {
    return correct.length > 0
}, 'correct answer cannot be blank')

QuestionsSchema.path('time').validate(function (time) {
    return time.length > 0
}, 'time cannot be blank')
/**
 * Statics
 */

QuestionsSchema.statics = {


    /**
     * Find problem by id
     *
     * @param {ObjectId} id
     * @param {Function} callback
     * @api private
     */

    load: function (id, callback) {
        this.findOne({ _id : id })
            .exec(callback)
    },

    /**
     * List problems
     *
     * @param {Object} options
     * @param {Function} cb
     * @api private
     */

    list: function (options, cb) {
        var criteria = options.criteria || {}

        this.find(criteria)
            .exec(cb)
    },

    /**
     * randomly pick a problem
     *
     * @param {Function} cb
     * @api private
     */

    randomProblem: function (randomNumber, cb) {
        console.log("inside randomProblem");
        this.find()
            .limit(-1)
            .skip(randomNumber)
            .exec(cb)
    },

    listNProblem: function (N, skipPageNo, cb) {
        this.find()
            .limit(N)
            .skip(skipPageNo)
            .exec(cb)
    }
}

mongoose.model('Questions', QuestionsSchema)