/**
 * Created by vsubramaney on 1/24/14.
 */
var mongoose = require('mongoose')
    , User = mongoose.model('User')

exports.getUserById= function(req, res) {
    var userId = req.params.id;
    User
        .findOne({ _id : userId })
        .exec(function (err, user) {
            if (err)
                res.send(404);
            if (!user)
                return res.send(404);

            res.send(200, user);
        })
}

exports.createUser = function (req, res) {
    var user = new User(req.body)
    user.provider = 'local'
    user.save(function (err) {
        if (err) {
            return res.send(404);
        } else {
            return res.send(200, user);
        }
    })
}

exports.authenticate = function (req, res) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({ username: username }, function (err, user) {
        if (err)
        {
            return res.send(404, "err");
        }
        if (!user) {
            return res.send(404, "User not found");
        }
        if (!user.authenticate(password)) {
            return res.send(404, "Authentication failure");
        }
        return res.send(200, "Authentication success");
    });
}