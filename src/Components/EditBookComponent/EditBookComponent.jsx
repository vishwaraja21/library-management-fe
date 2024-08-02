import axios from "axios";
import React, { useState } from "react";

const EditBookComponent = () => {
  const [isbn, setISBN] = useState("");
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [genre, setgenre] = useState("");

  const ISBNHandler = (event) => {
    setISBN(event.target.value);
  };

  const bookNameHandler = (event) => {
    setBookName(event.target.value);
  };

  const authorNameHandler = (event) => {
    setAuthorName(event.target.value);
  };

  const genreHandler = (event) => {
    setgenre(event.target.value);
  };

  const validateHandler = (event) => {
    event.preventDefault()

    axios
      .post(`http://localhost:3500/api/v1/book/validate`,{isbn, bookName, authorName, genre})
      .then((response) => {
          setISBN(response.data.isbn),
          setBookName(response.data.bookName)
          setAuthorName(response.data.authorName)
          setgenre(response.data.genre)
      })
      .catch((error) => console.log(error.message))
  }

  const editBookHandler = (event) => {
    event.preventDefault()

    axios 
      .patch(`http://localhost:3500/api/v1/book/edit`,{isbn, bookName, authorName, genre})
      .then((response) => {
        alert(`Book Data of ISBN ${response.data.isbn} updated successfully`)
        window.location.href = '/'
      })
      .catch((error) => console.log(error))
  }

  return (
    <React.Fragment>
      <div>
        <form action="POST">
          <div className="isbn">
            <label htmlFor="isbn">ISBN : </label>
            <input
              type="text"
              placeholder="Enter the ISBN..."
              value={isbn}
              onChange={ISBNHandler}
              required
            />
          </div>
          <div className="validate">
            <button className="validate" onClick={validateHandler}>Validate</button>
          </div>
          <div className="title">
            <label htmlFor="title">Book Name : </label>
            <input
              type="text"
              placeholder="Enter the book name..."
              value={bookName}
              onChange={bookNameHandler}
              required
            />
          </div>
          <div className="author">
            <label htmlFor="author">Author Name : </label>
            <input
              type="text"
              placeholder="Enter the author name..."
              value={authorName}
              onChange={authorNameHandler}
              required
            />
          </div>
          <div className="genre">
            <label htmlFor="genre">Genre : </label>
            <input
              type="text"
              placeholder="Enter the genre..."
              value={genre}
              onChange={genreHandler}
              required
            />
          </div>
          <div className="editBook">
            <button className="editBook" onClick={editBookHandler}>
              Update
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default EditBookComponent;
