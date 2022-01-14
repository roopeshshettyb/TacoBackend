import express from "express";
import formidable from "express-formidable";
const router = express.Router();
//mws
import { requireSignin, canEditDeletePost, isAdmin } from "../middlewares";
//controllers
import { createPost, deletePost } from "../controllers/post";
import {
  uploadImage,
  postsByUser,
  updatePost,
  userPost,
  likePost,
  unlikePost,
  addComment,
  removeComment,
  totalPosts,
  newsFeed,
  posts,
  getPost,
} from "../controllers/post";

router.post("/create-post", requireSignin, createPost);
router.post(
  "/upload-image",
  requireSignin,
  formidable({ maxFileSize: 5 * 1024 * 1024 }),
  uploadImage
);
router.get("/user-posts", requireSignin, postsByUser);
router.get("/user-post/:_id", requireSignin, userPost);
router.put("/update-post/:_id", requireSignin, canEditDeletePost, updatePost);
router.delete(
  "/delete-post/:_id",
  requireSignin,
  canEditDeletePost,
  deletePost
);
router.get("/user-posts/:page", requireSignin, newsFeed);

router.put("/like-post", requireSignin, likePost);
router.put("/unlike-post", requireSignin, unlikePost);
router.put("/add-comment", requireSignin, addComment);
router.put("/remove-comment", requireSignin, removeComment);
router.get("/total-posts", totalPosts);
router.get("/posts", posts);
router.get("/post/:_id", getPost);

router.delete("/admin/delete-post/:_id", requireSignin, isAdmin, deletePost);

module.exports = router;
