const { body, validationResult } = require("express-validator");

const postBodyParams = [
	body("title")
		.notEmpty()
		.isString()
		.isLength({ min: 8 })
		.withMessage("Title is required and must be greater than 8 characters"),

	body("content")
		.notEmpty()
		.isString()
		.isLength({ min: 20 })
		.withMessage("Content must be a string and greater than 20 characters"),

	body("img")
		.notEmpty()
		.isString()
		.isURL()
		.withMessage("Img must be an URL string"),

	body("author").notEmpty().isString().withMessage("Author must be a string"),

	body("rate").notEmpty().isInt().withMessage("Rate must be a Number"),
];

const validatePostBody = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	next();
};

module.exports = { postBodyParams, validatePostBody };