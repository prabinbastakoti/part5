import { useState } from 'react';

const Blog = ({ blog }) => {
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
          <button>like</button>
        </div>
        <div>{blog.author}</div>
      </div>
    </div>
  );
};

export default Blog;
