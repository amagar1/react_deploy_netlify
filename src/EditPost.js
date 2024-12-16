import React from 'react'
import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { format } from 'date-fns';
import { useStoreState, useStoreActions } from 'easy-peasy';

const EditPost = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const editTitle = useStoreState((state) => state.editTitle)
    const editBody = useStoreState((state) => state.editBody)
    const editPost = useStoreActions((actions) => actions.editPost)
    const setEditTitle = useStoreActions((actions) => actions.setEditTitle)
    const setEditBody = useStoreActions((actions) => actions.setEditBody)

    const getPostById = useStoreState((state) => state.getPostById)
    const post = getPostById(id)

    

    useEffect(() => {
        if(post){
            setEditBody(post.body)
            setEditTitle(post.title)
        }
    },[post, setEditBody, setEditTitle])

    const handleEdit = (id) => {
        const datetime = format(new Date(), 'MMMM dd, yyyy pp');
        const body = editBody
        const title = editTitle
        const updatedPost = {
          id, title, datetime, body  
        }
        editPost(updatedPost)
        navigate(`/post/${id}`)

      } 

  return (
    <main className='NewPost'>
        {editTitle &&
            <>
                <h2>Edit Post: </h2>
                <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor='ediTitle'>Title: </label>
                    <input
                    id='editTitle'
                    type='text'
                    required
                    autoFocus
                    value={editTitle}
                    placeholder='Set the Post Title'
                    onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <label htmlFor='editBody'>Edit Post: </label>
                    <textarea
                    id='editBody'
                    required
                    value={editBody}
                    placeholder='Add a post here'
                    onChange={(e) => setEditBody(e.target.value)}
                    >
                    </textarea>
                    <button type='button' onClick={() => handleEdit(id)}>Submit</button> 
                </form>  
        </> 
        }
        {!editTitle && 
        <>
            <h2>POST NOT FOUND</h2>
            <p>Well, that's disappointing.</p>
            <p>
                <Link to='/'>Visit our Homepage</Link>
            </p>
        </>
        }   
    </main>
  )
}

export default EditPost
