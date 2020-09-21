import axios from "axios"
import { CREATE_PROJECT, GET_PROJECTS, DELETE_PROJECT, EDIT_PROJECT } from "./types";
const URL_API = 'http://localhost:8080/api'


export function getAllProjects() {

    return async(dispatch, stateEvent) => {
        try {
            const response = await axios.get(URL_API + '/project')

            dispatch({ type: GET_PROJECTS, projects: response.data })
        } catch (err) {
            console.log("ERR", err.message)
        }
    }
}


export function createProject(project) {
    const { title, description } = project
    return async(dispatch, stateTask) => {
        try {
            const response = await axios.post(URL_API + '/project', {
                title,
                description
            })
            dispatch({ type: CREATE_PROJECT, project: response })
        } catch (err) {
            console.log("ERR", err.message)
        }

    }
}

export function deleteProject(id) {
    return async(dispatch, stateTask) => {
        await axios.delete(URL_API + '/project/' + id)
        dispatch({ type: DELETE_PROJECT, id })
    }
}

export function editProject(project) {
    const { id, title, description } = project
    return async(dispatch, stateTask) => {
        await axios.put(URL_API + '/project/' + id, {
            title,
            description,
        })
        dispatch({ type: EDIT_PROJECT, project })
    }
}