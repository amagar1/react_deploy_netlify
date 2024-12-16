import { useParams, Link, useNavigate } from 'react-router-dom'
import { useStoreState, useStoreActions } from 'easy-peasy';

const PostPage = () => {

  const { id } = useParams();
  const navigate = useNavigate()
  const deletePost = useStoreActions((actions) => actions.deletePost)
  const getPostById = useStoreState((state)=> state.getPostById)
  const post = getPostById(id);
  const  handleDelete = (id) => {
    deletePost(id)
    navigate('/')
}

  return (
    <main className='PostPage'>
      <article className='post'>
        {post &&
          <>
            <h2 className='post'>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>
            <Link to={`/edit/${id}`}><button className='editButton'> Edit Post</button></Link>
            <button className='deleteButton' onClick={() => handleDelete(post.id)}>
              Delete Post
            </button>
          </>
        }
        {!post &&
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing.</p>
            <Link to='/'>Visit Our Homepage</Link>
          </>
        }
      </article>
    </main>
  )
}

export default PostPage
