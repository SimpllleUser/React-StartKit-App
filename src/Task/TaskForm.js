import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createTask } from "../redux/actions";

class TaskForm extends React.Component {
  constructor(props) {
    super(props);
    this.titleInput = React.createRef();
    this.descriptionInput = React.createRef();
    this.estimateInput = React.createRef();
    

    this.state = {
      redirect: false,
      title: "",
      description: "",
      estimate: 0,
      prioritySelect: "1",
      statusSelect: "1",
      typeSelect: "1",
      priorities: [
        { name: "Low", value: 1, class: "success" },
        { name: "Normal", value: 2, class: "warning" },
        { name: "Highly", value: 3, class: "danger" },
      ],
      statuses: [
        { name: "Open", value: 1, class: "primary" },
        { name: "Inprogress", value: 2, class: "warning" },
        { name: "Done", value: 3, class: "info" },
      ],
      types: [
        { name: "Feature", value: 1, class: "primary" },
        { name: "Bug", value: 2, class: "warning" },
        { name: "Story", value: 3, class: "info" },
      ]
    };
  }

  submitHandler = (event) => {
    event.preventDefault();
    // INIT STATES
    const {
      title,
      description,
      estimate,
      statuses,
      statusSelect,
      prioritySelect,
      priorities,
      typeSelect,
      types
    } = this.state;
    // VALIDATE INPUTS
    if (!title && !description) {
      return;
    }
    // CREATE POST
    const newTask = {
      id: Date.now().toString(),
      title,
      description,
      estimate,
      status: statuses.find((status) => status.value == statusSelect).name,
      priority: priorities.find((priority) => priority.value == prioritySelect).name,
      type: types.find((type) => type.value == typeSelect).name,
      date: moment().format("DD-MM-YYYY"),
    };
    // SEND DATA ON REDUX
    this.props.createTask(newTask);
    console.log('STATE',this.state)
    console.log('newTask ', newTask)
    // CLEAN INPUTS
    this.titleInput.current.value = "";
    this.descriptionInput.current.value = "";
    this.estimateInput.current.value = "";
    this.setState({ title: "", description: "", estimate: "",redirect: true });
  };

  changeInputHandler = (event) => {
    event.persist();
    this.setState((prev) => ({
      ...prev,
      ...{
        [event.target.name]: event.target.value,
      },
    }));
  };
  prioritySelectorHandler = (event) => {
    this.setState({ prioritySelect: event.target.value });
  };
  statusSelectorHandler = (event) => {
    this.setState({ statusSelect: event.target.value });
  };
  typeSelectorHandler = (event) => {
    this.setState({ typeSelect: event.target.value });
  };

  render() {
    const PrioritySelector = this.state.priorities.map((priority) => (
      <option key={priority.value} value={priority.value}>
        {priority.name}
      </option>
    ));
    const StatusSelector = this.state.statuses.map((status) => (
      <option key={status.value} value={status.value}>
        {status.name}
      </option>
    ));

    const TypeSelector = this.state.types.map((type) => (
        <option key={type.value} value={type.value}>
          {type.name}
        </option>
    ));
      /*//REDIRECT ROUTE IF CREATE POST*/
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    return (
      <form className="task-form" onSubmit={this.submitHandler}>
        <div className="inputs-text">
          <div className="form-group">
            <label htmlFor="title"> Название </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              ref={this.titleInput}
              value={this.title}
              onChange={this.changeInputHandler}
            />
            <label htmlFor="description pt-2"> Описание </label>
            <textarea
              className="form-control"
              onChange={this.changeInputHandler}
              ref={this.descriptionInput}
              name="description"
              id="description"
              cols="30"
              rows="10"
            ></textarea>
            <label htmlFor="estimate"> Часов </label>
            <input
              type="number"
              className="form-control"
              id="estimate"
              name="estimate"
              ref={this.estimateInput}
              value={this.estimate}
              onChange={this.changeInputHandler}
            />
          </div>
        </div>
        <div className="selectors-options">
          <label className="my-1 mr-2" htmlFor="priority">
            Приоритет
          </label>
          <select
            className="custom-select my-1 mr-sm-1"
            id="priority"
            value={this.state.prioritySelect}
            onChange={this.prioritySelectorHandler}
          >
            {PrioritySelector}
          </select>
          <label className="my-1 mr-2" htmlFor="status">
            Статус
          </label>
          <select
            className="custom-select my-1 mr-sm-1"
            id="status"
            value={this.state.statusSelect}
            onChange={this.statusSelectorHandler}
          >
            {StatusSelector}
          </select>
          <label className="my-1 mr-2" htmlFor="type">
            Тип
          </label>
          <select
              className="custom-select my-1 mr-sm-1"
              id="type"
              value={this.state.typeSelect}
              onChange={this.typeSelectorHandler}
          >
            {TypeSelector}
          </select>
        </div>
        <button className="btn btn-success send-task" type="submit">
          Создать
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = {
  createTask,
};

export default connect(null, mapDispatchToProps)(TaskForm);