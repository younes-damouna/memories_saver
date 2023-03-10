import { FETCH_ALL, FETCH_BY_SEARCH,COMMENT,FETCH_POST, CREATE, UPDATE, LIKE, DELETE, START_LOADING,END_LOADING } from '../constants/actionTypes';
import * as api from '../api';
// import Post from '../components/Posts/Post/Post';
//Actions Creators
export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({type:START_LOADING})
        const { data } = await api.fetchPosts(page)
        console.log(data)
        dispatch({ type: FETCH_ALL, payload: data });
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error.message)
    }

}
export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type:START_LOADING})
        const { data } = await api.fetchPost(id)
        console.log(data)
        dispatch({ type: FETCH_POST, payload: data });
        dispatch({type:END_LOADING})
    } catch (error) {
        console.log(error.message)
    }

}
export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type:START_LOADING})

        const {data:{data}}= await api.fetchPostsBySearch(searchQuery)
        dispatch({ type: FETCH_BY_SEARCH, payload: data });
        dispatch({type:END_LOADING})

        // console.log(data)
    } catch (error) {
        console.log(error.message)

    }

}

export const createPost = (post,navigate) => async (dispatch) => {
    try {
        dispatch({type:START_LOADING})

        const { data } = await api.createPost(post)
        dispatch({ type: CREATE, payload: data })
        navigate(`/posts/${data._id}`)
        dispatch({type:END_LOADING})

    } catch (error) {
        console.log(error)
    }
}
export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: UPDATE, payload: data })
    } catch (error) {
        console.log(error)
    }

}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE, payload: id })
    } catch (error) {
        console.log(error)
    }

}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: LIKE, payload: data })
    } catch (error) {
        console.log(error)
    }

}
export const commentPost = (value ,id) => async (dispatch) => {
    try {

      const {data}= await api.comment(value,id);
    //   console.log(data)

         dispatch({ type: COMMENT, payload: data })
        return data.comments
    } catch (error) {
        console.log(error)
    }

}