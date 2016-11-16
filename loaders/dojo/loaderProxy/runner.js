module.exports = function(loader, name) {
	var result, resultSet, req = __webpack_require__.dj.c();
	loader.load(name,  req, function(data) {
		result = data;
		resultSet = true;
	}, {isBuild:true});

	if (!resultSet) {
		throw new Error(name + ' unavailable');
	}
	return result;
};
