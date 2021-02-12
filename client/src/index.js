import React from "react";
import ReactDom from "react-dom";
import "./index.css";

import { book } from "./books";
import Book from "./Book";

function BookList() {
  return (
    <section className="booklist">
      <Book key={book.id} {...book} />
    </section>
  );
}

ReactDom.render(<BookList />, document.getElementById("root"));
