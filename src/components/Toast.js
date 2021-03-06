import React from "react";
import {hideErr} from "../store/error/actions"
import { useSelector,useDispatch } from "react-redux";

const Toast = () => {
    const dispatch = useDispatch()
  const err = useSelector((state) => state.err.err);
  if(!err.title){
      return ""
  }
  return (
    <div
    className="alert alert-primary alert-dismissible fade show"
      id="err_block"
      role="alert"
    >
      <strong>{err.title}</strong>
      <br />
      {err.body}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={()=>{dispatch(hideErr())}}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};
export default Toast;
