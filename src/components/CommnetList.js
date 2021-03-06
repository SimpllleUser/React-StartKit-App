import React, { useState } from "react";
import Comment from "./Comment";
import { useDispatch } from "react-redux";
import { setCommentToTask } from "../store/tasks/actions";

const CommnetList = ({ task_id, comments }) => {
  const dispatch = useDispatch();
  const [commentInput, setCommentInput] = useState("");
  const comnetsList = comments
    ? comments.map((comment, index) => (
        <li
          className="list-group-item ml-2 mt-3 border border-secondary rounded"
          key={index}
        >
          <Comment
            author={comment.author}
            text={comment.text}
            date={comment.date}
          />
        </li>
      ))
    : "Comments none";
  const changeInputHandler = (event) => {
    setCommentInput(event.target.value);
  };
  const setCommnet = () => {
    dispatch(setCommentToTask({ task_id, comment: commentInput }));
    setCommentInput("");
  };
  return (
    <div className="mt-5 comment-block">
      <div className="form-group d-flex flex-wrap">
        <label for="comment-form">Comment</label>
        <textarea
          className="form-control"
          id="comment-form"
          value={commentInput}
          onChange={changeInputHandler}
          name="commentInput"
          rows="3"
        ></textarea>
        <button
          className={`btn btn-success ${
            !commentInput.length && "disabled"
          } mt-3 ml-auto `}
          onClick={() => {
            setCommnet();
          }}
        >
          Add
        </button>
      </div>
      <ul className="list-group">{comnetsList || ""}</ul>
    </div>
  );
};

export default CommnetList;
