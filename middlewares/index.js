import expressJwt from "express-jwt";
import Post from "../models/post";
import User from "../models/user";
export const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

export const canEditDeletePost = async (req, res, cb) => {
  try {
    const post = await Post.findById(req.params._id);
    // console.log("middleware", post);
    if (req.user._id != post.postedBy) {
      return res.status(400).send("Unauthorized");
    } else {
      cb();
    }
  } catch (err) {
    console.log(err);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== "Admin") {
      return res.status(400).send("Unauthorized");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
