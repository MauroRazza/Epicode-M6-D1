const express = require("express");
const author = express.Router();
const AuthorModel = require("../models/authorModel");
const PostsModel = require("../models/postModel");

author.get("/authors", async (req, res) => {
	try {
		const authors = await AuthorModel.find();
		res.status(200).send({
			statusCode: 200,
			authors,
		});
	} catch (error) {
		res.status(500).send({
			statusCode: 500,
			message: "Internal server error",
		});
	}
});

author.get("/authors/:id/posts", async (req, res) => {
	const { id } = req.params;

	const findAuthor = await AuthorModel.findById(id);
	console.log(findAuthor.name);

	const findPost = await PostsModel.find({ "author.name": findAuthor.name });

	res.status(200).send(findPost);
});

author.get("/authors/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const authorExist = await AuthorModel.findById(id);

		if (!authorExist) {
			return res.status(404).send({
				statusCode: 404,
				message: `Author with id ${id} doesn't exist!`,
			});
		}

		res.status(200).send({
			statusCode: 200,
			authorExist,
		});
	} catch (error) {
		res.status(500).send({
			statusCode: 500,
			message: "Internal server error",
		});
	}
});

author.post("/authors", async (req, res) => {
	const newAuthor = new AuthorModel({
		name: req.body.name,
		surname: req.body.surname,
		email: req.body.email,
		dob: req.body.dob,
		avatar: req.body.avatar,
	});

	try {
		const author = await newAuthor.save();

		res.status(201).send({
			statusCode: 201,
			message: "Author saved successfully",
			author,
		});
	} catch (error) {
		res.status(500).send({
			statusCode: 500,
			message: "Internal server error",
		});
	}
});

author.patch("/authors/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const authorExist = await AuthorModel.findById(id);

		if (!authorExist) {
			return res.status(404).send({
				statusCode: 404,
				message: `Author with id ${id} doesn't exist!`,
			});
		}

		const dataToUpdate = req.body;
		const options = { new: true };

		const result = await AuthorModel.findByIdAndUpdate(
			id,
			dataToUpdate,
			options
		);

		res.status(200).send({
			statusCode: 200,
			result,
		});
	} catch (error) {
		res.status(500).send({
			statusCode: 500,
			message: "Internal server error",
		});
	}
});

author.delete("/authors/:id", async (req, res) => {
	const { id } = req.params;

	try {
		const authorExist = await AuthorModel.findById(id);

		if (!authorExist) {
			return res.status(404).send({
				statusCode: 404,
				message: `Author with id ${id} doesn't exist!`,
			});
		}

		const authorToDelete = await AuthorModel.findByIdAndDelete(id);

		res.status(200).send({
			statusCode: 200,
			message: `Author with id ${id} deleted successfully`,
		});
	} catch (error) {
		res.status(500).send({
			statusCode: 500,
			message: "Internal server error",
		});
	}
});

module.exports = author;
