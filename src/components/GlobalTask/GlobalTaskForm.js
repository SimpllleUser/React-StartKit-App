import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createGlobalTask } from "../../store/global_task/actions";
import { editGlobalTask } from "../../store/global_task/actions";

const GlobalTaskForm = (props) => {
  const dispatch = useDispatch();

  const [global_taskForm, setGlobal_taskForm] = useState({
    id: props.id || "",
    title: props.title || "",
    description: props.description || "",
    // status
  });
  const changeInputHandler = (event) => {
    setGlobal_taskForm({ ...global_taskForm, [event.target.name]: event.target.value });
  };

  const submitHandler = () => {
    const { id, title, description } = global_taskForm;

    if (title.trim() && description.trim()) {
      const GlobalTask = {
        id,
        title,
        description,
        project_id:props.project_id
      };
      if(id){
        dispatch(editGlobalTask(GlobalTask));
      }
      else{
        dispatch(createGlobalTask({global_task:GlobalTask}))
        setGlobal_taskForm({});
      }

    }
  };

  return (
    <div className="global_task-create">
      <form >
        <div className="project_create_title form-group">
          <label htmlFor="title" className='badge badge-light'>Title</label>
          <input
            className="form-control"
            type="text"
            name="title"
            id="title"
            value={global_taskForm.title || ''}
            onChange={changeInputHandler}
          ></input>
        </div>

        <div className="project_create_description form-group">
          <label htmlFor="description" className='badge badge-light'>Description</label>
          <textarea
            className="form-control"
            name="description"
            id="description"
            value={global_taskForm.description || ''}
            onChange={changeInputHandler}
          ></textarea>
        </div>
        <button className="btn btn-success m-2" onClick={() => {submitHandler()}} data-dismiss="modal" aria-label="Close">
          {props.id ? "Save" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default GlobalTaskForm;
