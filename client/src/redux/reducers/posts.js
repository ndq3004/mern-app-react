import { INIT_STATE } from "../../constants";
import { getPosts, createPost, getType, updatePost } from "../actions";

export default function postsReducers(state = INIT_STATE.posts, action) {
  switch (action.type) {
    case getType(getPosts.getPostsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getPosts.getPostSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getPosts.getPostFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(createPost.createPostRequest):
      return {
        ...state
      };
    case getType(createPost.createPostSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case getType(createPost.createPostFailure):
      return {
        ...state
      };
    case getType(updatePost.updatePostRequest):
      return {
        ...state,
      };
    case getType(updatePost.updatePostSuccess):
      return {
        ...state,
        data: state.data.map(post => post._id === action.payload._id ? action.payload : post),
      };
    default:
      return state;
  }
}
