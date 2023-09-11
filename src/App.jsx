import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Logging in with ', username, password);
    const credentials = {
      username,
      password,
    };
    try {
      const user = await loginService.login(credentials);
      blogService.setToken(user.token);
      setUser(user);
      window.localStorage.setItem('loggedInValue', JSON.stringify(user));
      setUsername('');
      setPassword('');
    } catch (error) {
      errorMessage('wrong username or password');
    }
  };

  const handleLogout = () => {
    console.log('logging out ', user.name);
    window.localStorage.clear();
    setUser(null);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    const response = await blogService.create(newBlog);

    setBlogs(blogs.concat(response));
    successMessage(`a new blog ${newBlog.title} added`);
    setTitle('');
    setAuthor('');
    setURL('');
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

  if (user === null) {
    return (
      <div>
        <h1>Login to Application</h1>
        {errorNotification && <h2 className="error">{errorNotification}</h2>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }
  return (
    <div>
      <h2>blogs</h2>
      {successNotification && (
        <h2 className="success">{successNotification}</h2>
      )}
      <h2>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </h2>

      <h1>Create new</h1>
      <form onSubmit={handleCreate}>
        <div>
          <label htmlFor="title">title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input
            type="text"
            id="url"
            value={url}
            onChange={({ target }) => setURL(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
