import { call, takeLatest, put } from "redux-saga/effects"
import * as actions from '../actions'
import * as api from '../../api'

function* updatePostSaga(action){
    try {
        const post = yield call(api.updatePost, action.payload);
        yield put(actions.updatePost.updatePostSuccess(post.data))
    } catch (error) {
        yield put(actions.updatePost.updatePostFailure(error))
    }
}

function* myPostSaga(){
    yield takeLatest(actions.updatePost.updatePostRequest, updatePostSaga);
}

//generator function

export default myPostSaga;