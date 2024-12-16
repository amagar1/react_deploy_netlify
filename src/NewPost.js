import React from 'react'
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom'
import { useStoreState, useStoreActions } from 'easy-peasy';

const NewPost = () => {
  const posts = useStoreState((state) => state.posts);
  const postTitle = useStoreState((state) => state.postTitle);
  const postBody = useStoreState((state) => state.postBody);
  const navigate = useNavigate();

  const savePost = useStoreActions((actions) => actions.savePost);
  const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
  const setPostBody = useStoreActions((actions) => actions.setPostBody);
  
  const handleSubmit =  (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length -1].id + 1 : 1
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const body = postBody
    const title = postTitle
    const newPost = {
      id, title, datetime, body  
    }
    savePost(newPost)
    navigate('/');

  }

  return (
    <main className='NewPost'>
      <h2>New Post: </h2>
      <form className='newPostForm' onSubmit={handleSubmit}>
        <label htmlFor='postTitle'>Title: </label>
        <input
          id='postTitle'
          type='text'
          required
          autoFocus
          value={postTitle}
          placeholder='Set the Post Title'
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor='postBody'>Post: </label>
        <textarea
          id='postBody'
          required
          value={postBody}
          placeholder='Add a post here'
          onChange={(e) => setPostBody(e.target.value)}
        >
        </textarea>
        <button type='submit'>Submit</button> 
      </form>
    </main>
  )
}

export default NewPost
