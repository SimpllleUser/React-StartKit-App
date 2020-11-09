import axios from "axios";
import {
    CREATE_TASK,
    DELETE_TASK,
    EDIT_TASK,
<<<<<<< HEAD
=======
    SET_WORKLOG,
>>>>>>> 5d960c47a8849178212615e6de2d457d372cd4c7
    SET_ALLTASKS,
    SET_TASKS,
    SET_TASK
} from "./types";
import { showLoader, hideLoader } from "../loader/actions";
import { showError } from "../error/actions";
const author = JSON.parse(localStorage.getItem("user")).userId;
const URL_API = "http://localhost:8080/api";

export const createTask = ({ id, task, user_id }) => async(dispatch) => {

    try {
        dispatch(showLoader());
        const response = await axios.post(URL_API + "/tasks", {
            globalTaskID: id,
            newTask: task,
            authorID: user_id,
        });
        dispatch({ type: CREATE_TASK, task: response.data });
        dispatch(hideLoader());
    } catch (err) {
        dispatch(hideLoader());
        dispatch(showError(err));
    }
};

export const deleteTaskInGlobal_task = ({ id, taskId }) => async(dispatch) => {
    console.log("id, taskId", id, taskId)
    try {
        const author_UserID = JSON.parse(
            JSON.stringify(localStorage.getItem("user").userId)
        );
        dispatch(showLoader());
        await axios.delete(URL_API + "/tasks/delete/in_global-task", {
            data: {
                id,
                author_UserID,
                taskId,
            },
        });
        dispatch({ type: DELETE_TASK, id: taskId });
    } catch (err) {
        dispatch(hideLoader());
        dispatch(showError(err));
    }
    dispatch(hideLoader());
};
export const updateOptionTask = ({ task_id, option }) => async(dispatch) => {
    try {
        dispatch(showLoader());
        const res = await axios.put(URL_API + "/tasks/option/" + task_id, {
            option,
            author,
        });
        dispatch({ type: SET_TASK, task: res.data });
        dispatch(hideLoader());
    } catch (err) {
        dispatch(hideLoader());
        dispatch(showError(err));
    }
};
export const saveEditableTask = (task) => async(dispatch) => {
    try {
        dispatch(showLoader());
        await axios.put(URL_API + "/tasks/" + task.id, {
            title: task.title,
            description: task.description,
            priority: task.priority,
            status: task.status,
            type: task.type,
        });
        dispatch({ type: EDIT_TASK, task });
        dispatch(hideLoader());
    } catch (err) {
        dispatch(hideLoader());
        dispatch(showError(err));
    }
};


export const setWorkLogToTask = ({ workLog, task_id }) => async(dispatch) => {
    try {
        dispatch(showLoader());
<<<<<<< HEAD
        const res =  await axios.put(URL_API + "/tasks/work-log/" + task_id, { workLog, author });
        console.log('Worklog', res.data)
=======
       const res =  await axios.put(URL_API + "/tasks/work-log/" + task_id, { workLog, author });
       console.log('Worklog', res.data)
>>>>>>> 5d960c47a8849178212615e6de2d457d372cd4c7
        dispatch({ type: SET_TASK, task: res.data });
        dispatch(hideLoader());
    } catch (err) {
        dispatch(hideLoader());
        dispatch(showError(err));
    }
};
export const setCommentToTask = () => {

}

export const setTasks = (tasks) => ({
    type: SET_TASKS,
    tasks,
});

export const setTask = (task) => ({
    type: SET_TASK,
    task,
});

export const setAllTasks = (tasks) => ({
    type: SET_ALLTASKS,
    tasks,
});