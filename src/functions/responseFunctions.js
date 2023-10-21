exports.successResponseFormat = (data) => {
	const response = {
		status: true,
		data: data,
	};
	return response;
};

exports.errorResponseFormat = (message) => {
	const response = {
		status: false,
		message: message,
	};
	return response;
};