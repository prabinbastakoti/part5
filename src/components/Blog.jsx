import { useState } from 'react';

const Blog = ({ blog, updateBlog, remove, user }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    width: '50%',
  };

  const showWhenVisible = { display: showDetails ? '' : 'none' };

  const increaseLike = () => {
    const newBlog = { ...blog, likes: blog.likes + 1 };
    updateBlog(newBlog);
  };

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      remove(blog);
    }
  };

  const buttonStyle = {
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'hide' : 'show'}
      </button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>
          {blog.likes}
          <button onClick={increaseLike}>like</button>
        </div>
        <div>{blog.author}</div>
        {user === blog.user.username && (
          <button style={buttonStyle} onClick={removeBlog}>
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
