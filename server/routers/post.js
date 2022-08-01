import express from "express";
import { getPosts, createPost, updatePost } from "../controller/post.js ";

const router = express.Router()

router.get('/', getPosts)

router.post('/', createPost)

router.put('/', updatePost)

export default router;