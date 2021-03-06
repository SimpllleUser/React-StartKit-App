import React, {useEffect, useState} from "react";
import moment from "moment";
import {useDispatch} from "react-redux";
import {createTask} from "../../store/tasks/actions";
import {saveEditableTask} from "../../store/tasks/actions";
import SelectorForm from "../SelectorForm";
import SelectorUserForm from "../SelectorUserForm"

const TaskForm = (props) => {
    const dispatch = useDispatch();
    const [taskForm, setTaskForm] = useState({
        id: props.id || "",
        title: props.title || "",
        description: props.description || "",
        estimate: props.estimate || "",
        priority: props.priority || "Low",
        status: props.status || "Open",
        type: props.type || "Feature",
        responsible_User: props.responsible_User || 'none'
    });

    const submitHandler = () => {
        // event.preventDefault();
        const {title, description, estimate, status, priority, type, responsible_User} = taskForm; // this.state;

        if (!title && !description) {
            return;
        }

        const Task = {
            id: taskForm.id,
            title,
            description,
            estimate,
            status,
            priority,
            type,
            responsible_User,
            date: moment().format("DD-MM-YYYY"),
        };
        const user_id = JSON.parse(localStorage.getItem("user")).userId;
        taskForm.id
            ? dispatch(saveEditableTask({task: Task}))
            : dispatch(createTask({id: props.global_task_id, task: Task, user_id}));
        setTaskForm({
            id: "",
            title: "",
            description: "",
            estimate: "",
            priority: "Low",
            status: "Open",
            type: "Feature",
            responsible_User: {}
        });

    };
    const changeInputHandler = (event) => {
        setTaskForm({...taskForm, [event.target.name]: event.target.value});
    };
    const updateDataStatus = (data) => {
        if (taskForm.status != data) {
            setTaskForm({...taskForm, status: data});
        }
    };
    const updateDataPriority = (data) => {
        if (taskForm.priority != data) {
            setTaskForm({...taskForm, priority: data});
        }
    };

    const updateDataType = (data) => {
        if (taskForm.type != data) {
            setTaskForm({...taskForm, type: data});
        }
    };

    const updateDataUser = (data) => {
        if (taskForm.responsible_User != data) {
            setTaskForm({...taskForm, responsible_User: data});
        }
    }

    return (
        <form className="task-form">
            <div className="inputs-text">
                <div className="form-group">
                    <label htmlFor="title" className='badge badge-light'> Title </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={taskForm.title || ""}
                        onChange={changeInputHandler}
                    />
                    <label htmlFor="description pt-2" className='badge badge-light'> Description </label>
                    <textarea
                        className="form-control "
                        onChange={changeInputHandler}
                        name="description"
                        id="description"
                        cols="30"
                        rows="10"
                        value={taskForm.description || ""}
                    ></textarea>
                    <label htmlFor="estimate" className='badge badge-light'> Estimate </label>
                    <input
                        type="number"
                        className="form-control"
                        id="estimate"
                        name="estimate"
                        value={taskForm.estimate || ""}
                        onChange={changeInputHandler}
                    />
                </div>
                <button className="btn btn-success ml-2" onClick={() => {
                    submitHandler()
                }} data-dismiss="modal" aria-label="Close">

                    {taskForm.id ? "Save" : "Create"}
                </button>
            </div>
            <div className="selectors-options">

                {taskForm.id && taskForm.status && (
                    <SelectorForm
                        updateData={updateDataStatus}
                        data={"status"}
                        value={taskForm.status}
                    />
                )}
                <SelectorForm
                    className="mt-2"
                    updateData={updateDataType}
                    data={"type"}
                    value={taskForm.type}
                />
                <SelectorForm
                    updateData={updateDataPriority}
                    data={"priority"}
                    value={taskForm.priority}
                />
                <SelectorUserForm
                    projectID={props.projectID}
                    updateData={updateDataUser}
                    value={taskForm.responsible_User?.id}
                />
            </div>
        </form>
    );
};

export default TaskForm;
