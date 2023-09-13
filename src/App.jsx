import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import NewBlogForm from './components/newBlogForm';
import Togglable from './components/togglable';
import LoginForm from './components/loginForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [successNotification, setSuccessNotification] = useState(null);
  const [errorNotification, setErrorNotification] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInValue');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleSubmit = async (object) => {
    const credentials = { ...object };
    console.log('Logging in with ', credentials.username, credentials.password);
    try {
      const user = await loginService.login(credentials);
      blogService.setToken(user.token);
      setUser(user);
      window.localStorage.setItem('loggedInValue', JSON.stringify(user));
    } catch (error) {
      errorMessage('wrong username or password');
    }
  };

  const handleLogout = () => {
    console.log('logging out ', user.name);
    window.localStorage.clear();
    setUser(null);
  };

  const handleCreate = async (object) => {
    await blogService.create({ ...object });
    const newBlogs = await blogService.getAll();
    setBlogs(newBlogs);
    successMessage(`a new blog ${object.title} added`);
  };

  const successMessage = (message) => {
    setSuccessNotification(message);
    setTimeout(() => {
      setSuccessNotification(null);
    }, 5000);
  };

  const errorMessage = (message) => {
    setErrorNotification(message);
    setTimeout(() => {
      setErrorNotification(null);
    }, 5000);
  };

  const BlogForm = () => {
    return (
      <Togglable label="Create new Blog">
        <NewBlogForm handleCreate={handleCreate} />
      </Togglable>
    );
  };

  const LoginFormFunction = () => {
    return <LoginForm handleSubmit={handleSubmit} />;
  };

  const updateBlog = async (blog) => {
    try {
      const response = await blogService.update(blog);
      const newBlogs = await blogService.getAll();
      setBlogs(newBlogs);
    } catch (error) {
      console.log('error', error.response.data.error);
    }
  };

  const handleRemove = async (blog) => {
    try {
      const response = await blogService.remove(blog);
      const newBlogs = await blogService.getAll();
      setBlogs(newBlogs);
    } catch (error) {
      console.log('error', error.response.data.error);
    }
  };

  if (user === null) {
    return (
      <div>
        <h1>Login to Application</h1>
        {errorNotification && <h2 className="error">{errorNotification}</h2>}
        {LoginFormFunction()}
      </div>
    );
  }

  const sortedblogs = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>blogs</h2>
      {successNotification && (
        <h2 className="success">{successNotification}</h2>
      )}
      <h2>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </h2>
      {BlogForm()}
      {sortedblogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          remove={handleRemove}
          user={user.username}
        />
      ))}
    </div>
  );
};

export default App;
