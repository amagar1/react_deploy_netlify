import { createStore, action, thunk, computed  } from "easy-peasy";
import apiInstance from "./api/posts";

export default createStore({
    posts: [],
    setPosts: action((state, payload) => {
        state.posts = payload;
         
    }),
    postTitle: '',
    setPostTitle: action((state, payload) => {
        state.postTitle = payload;
    }),
    postBody: '',
    setPostBody: action((state, payload) =>{
        state.postBody = payload;
    }),
    editTitle: '',
    setEditTitle: action((state, payload) => {
        state.editTitle = payload;
    }),
    editBody: '',
    setEditBody: action((state, payload) =>{
        state.editBody = payload;
    }),
    search: '',
    setSearch: action((state, payload) => {
        state.search = payload;
    }),
    searchResults: [],
    setSearchResults: action((state, payload) => {
        state.searchResults = payload;
    }),
    postCount: computed((state) => state.posts.length),
    getPostById: computed((state) => {
        return (id) => state.posts.find(post => (post.id).toString() === id);
    }),
    savePost: thunk( async (actions, newPost, helpers) => {
         const { posts }  =  helpers.getState();
         try{
            const response = await apiInstance.post('/posts', newPost)
            actions.setPosts([...posts, response.data]);
            actions.setPostTitle('');
            actions.setPostBody('');
         } catch(err) {
            if(err.response) {
                console.log(err.message.status);
                console.log(err.message.headers);
                console.log(err.message.data);
            } else {
                console.log(err.message);
            } 
         }
    }),
    deletePost: thunk( async (actions, id, helpers) => {
        const { posts }  =  helpers.getState();
        try{
            await apiInstance.delete(`/posts/${id}`)
            actions.setPosts(posts.filter(post => (post.id).toString() !== id))
        } catch(err) {
            if (err.response) {
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else {
                console.log(`Error: ${err.message}`)
            }
        }
    }),
    editPost: thunk(async (actions, updatedPost, helpers) => {
        const { posts } = helpers.getState();
        const { id } = updatedPost;
        try {
            const response = await apiInstance.put(`posts/${id}`,updatedPost)
            actions.setPosts(posts.map(post =>
                post.id === id ? { ...response.data } : post
            ));
            actions.setEditBody('')
            actions.setEditTitle('')

        } catch(err) {
            if (err.response) {
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else {
                console.log(`Error: ${err.message}`)
            }
        }
    })
});