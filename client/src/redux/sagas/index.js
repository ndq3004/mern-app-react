import { call, takeLatest, put } from "redux-saga/effects"
import * as actions from '../actions'
import * as api from '../../api'

function* fetchPostSaga(action){
    try {
        const posts = yield call(api.fetchPosts);
        // console.log('[posts]', posts)
        yield put(actions.getPosts.getPostSuccess(posts.data))
    } catch (error) {
        yield put(actions.getPosts.getpostFailure(error))
    }
}

function* createPostSaga(action){
    try {
        const post = yield call(api.createPost, action.payload);
        yield put(actions.createPost.createPostSuccess(post.data))
    } catch (error) {
        yield put(actions.createPost.createPostFailure(error))
    }
}

function* mySaga(){
    yield takeLatest(actions.getPosts.getPostsRequest, fetchPostSaga);
    yield takeLatest(actions.createPost.createPostRequest, createPostSaga);
}

//generator function

export default mySaga;