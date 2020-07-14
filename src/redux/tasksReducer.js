import { CREATE_TASK, FECTH_TASKS, DELETE_TASK, EDIT_TASK } from "./types";

const initialState = {
    tasks: [],
    fetchedTasks: [],
    selectEditableTask: {}
};

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TASK:
            return {
                ...state,
                tasks: state.tasks.concat([action.payload])
            };
        case FECTH_TASKS:
            return {...state, fetchedTasks: action.payload };
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(p => p.id !== action.id)
            };
        case EDIT_TASK:
            let task = action.task
            return {
                ...state,
                tasks: state.tasks.map(p => p.id == task.id ? task : p)
            }

        default:
            return state;
    }
};