import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import EventCalendar from "./pages/EventCalendar";
import TaskDetail from "./Task/TaskDeatail";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ProjectsList from "./Project/ProjectList";
import ProjectDetail from "./Project/ProjectDeatail"
import GlobalTaskDetail from "./GlobalTask/GlobalTaskDeatail";
import GlobalTaskList from "./GlobalTask/GlobalTaskList"
import MainTaskList from "./pages/MainTaskList"
export const useRoutes = (isAuthUser) => {
  if (isAuthUser) {
    return (

      <Switch>
        <Route exact path="/">
          <MainTaskList />
        </Route>
        <Route exact path="/detail-task/:id">
          <TaskDetail />
        </Route>
        <Route exact path="/projects-list">
          <ProjectsList />
        </Route>
        <Route exact path="/detail-project/:id">
          <ProjectDetail />
        </Route>
        <Route exact path="/detail-global_task/:id">
          <GlobalTaskDetail/>
        </Route>
        <Route exact path="/global_task-list">
          <GlobalTaskList/>
        </Route>
        {/* <Route exact path="/event-calendar">
          <EventCalendar/>
        </Route> */}
        <Redirect to="/"/>
      </Switch>
    );
  }

  return <Switch>
       <Route path="/SignIn" exact>
          <SignIn />
        </Route>
        <Route path="/SignUp" exact>
          <SignUp />
        </Route>
        <Redirect to="/SignIn"/>
  </Switch>;
};
