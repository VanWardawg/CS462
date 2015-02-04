function users (app) {
	'use strict';
	return function (req, res) {
		res.send({headers: req.headers, queryParams: req.query, body: req.body});
	}
}

module.exports = users;