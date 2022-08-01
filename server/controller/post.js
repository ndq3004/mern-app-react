import { PostModel } from "../models/postModels.js"
export const getPosts = async function (req, res) {
    try {
        const posts = await PostModel.find();
        console.log('post', posts)
        res.send(posts)
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

export const createPost = function (req, res) {
    try {
        const post = req.body;

        const postToSave = new PostModel(post)
        postToSave.save().then(() => {
            res.status(200).json(postToSave)
        }).catch(err => {
            res.status(500).json({ error: err })
        })

    } catch (err) {
        res.status(500).json({ error: err })
    }
}

export const updatePost = async function (req, res) {
    try {
        const updatePost = req.body

        const post = await PostModel.findOneAndUpdate(
            { _id: updatePost._id }, 
            updatePost, 
            { new: true }
        )

        res.status(200).json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json({ "error": err })
    }
}