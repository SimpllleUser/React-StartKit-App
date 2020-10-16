import React, { useState, useEffect } from "react";
import TaskList from "../Task/TaskList";
// import _TaskList from "../components/_TaskList";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../hooks/http.hook";
import { initTasks } from "../store/tasks/actions";
const MainTaskList = () => {
  const dispatch = useDispatch();
  const id = JSON.parse(localStorage.getItem("project") || '{}').id;
  const userId = JSON.parse(localStorage.getItem("user")).userId;
  const { request, loading } = useHttp();
  useEffect(() => {
    const getAllData = async () => {
      // ! ADD TRY CATCH AND SHOW TOAST
       // ! * schema.find( { '_id' : { $in: [1,2,3]} }, function(err,data){});
      const tasks = await request(
        "http://localhost:8080/api/tasks/all_tasks/" + id
      );
      dispatch(initTasks(tasks));
    };
    getAllData();
  }, [id, request]);
  const tasks = useSelector((state) => state.tasks.tasks);
  return (
    <div id="main-task-list">
        {/* <Options items={
            [<h3 onClick={() => alert()} >Test</h3>]
        } /> */}
      {tasks ? <TaskList tasks={tasks} /> : "No tasks"}
    </div>
  );
};

export default MainTaskList;
