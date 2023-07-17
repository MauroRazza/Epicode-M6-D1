const isValidPost = (req, res, next) => {
	const errors = [];

	const allowedImages = [".jpg", ".png"];
	const { title, content, img, author, rate } = req.body;

	if (typeof title !== "string") {
		errors.push("Post title must be a string");
	}

	if (typeof content !== "string" && content.length < 10) {
		errors.push(
			"Post content must be at least 11 characters and must be a string."
		);
	}

	if (
		typeof img !== "string" &&
		allowedImages.some((ext) => img.endsWith(ext))
	) {
		errors.push("Image must be png or jps and must be a url string");
	}

	if (typeof rate !== "number") {
		errors.push("Rate must be a number");
	}

	if (errors.length > 0) {
		res.status(400).json({ errors });
	} else {
		next();
	}
};

module.exports = isValidPost;