const NewBlogForm = ({
  handleCreate,
  title,
  author,
  url,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
}) => {
  return (
    <>
      <h1>Create new</h1>

      <form onSubmit={handleCreate}>
        <div>
          <label htmlFor="title">title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input type="text" id="url" value={url} onChange={handleUrlChange} />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default NewBlogForm;
