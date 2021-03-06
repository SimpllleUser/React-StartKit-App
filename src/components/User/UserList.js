import React, {useState} from "react";
import UserCard from "./UserCard";
import {useDispatch} from "react-redux";
import {addUser} from "../../store/users/actions";


const UserList = ({users, project_id}) => {
    const [user_id, setUserId] = useState("");
    const dispatch = useDispatch();

    const myId = JSON.parse(localStorage.getItem("user")).userId || "";

    const changeInputHandler = (event) => {
        setUserId(event.target.value);
    };

    const submitHundler = (event) => {
        event.preventDefault();
        if (user_id.trim()) {
            dispatch(addUser({project_id, user_id}))
        }
        setUserId("");
    };
    return (
        <div>
            <h2 className="mb-2 pb-1 text-dark border-bottom border-dark"><span className="ml-4 pl-1">Списко пользователей</span>
            </h2>
            <form onSubmit={submitHundler}>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="User ID"
                        value={user_id}
                        onChange={changeInputHandler}
                    />
                    <div className="input-group-prepend">
                        <button className="btn btn-warning">Add</button>
                    </div>
                </div>
            </form>
            <div className="list-group">
                {users &&
                users.map(
                    (user) =>
                        user.id !== myId && (
                            <div className="list-group-item list-group-item">
                                <UserCard project_id={project_id} id={user.id} name={user.name} email={user.email}/>
                            </div>
                        )
                )}
            </div>
        </div>
    );
};

export default UserList;
