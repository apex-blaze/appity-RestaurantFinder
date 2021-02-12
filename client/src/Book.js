import React from "react";

function Book(props) {
  const { img, title, author } = props;
  function clickHandler() {
    alert("hello");
  }
  function complexHandler(author) {
    console.log(author);
  }
  return (
    <article className="book">
      <img src={img} alt="" />
      <h1>{title}</h1>
      <h4>{author}</h4>
      <button type="button" onClick={clickHandler}>
        HIT ME
      </button>
      <button type="button" onClick={() => complexHandler(author)}>
        Come On
      </button>
    </article>
  );
}

export default Book;
