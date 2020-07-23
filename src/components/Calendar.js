import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { ArrowLeft, ArrowRight, PlusCircle } from "react-feather";
import { getAllEvents } from "../redux/actions";
import EventList from "./EventList"

import Modal from "./Modal";

//** * !Реализовать получение выбраной даты в календаре через props function !!! */
class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment().format("DD-MM-YYYY"),
      daysOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      selectMonth: moment().format("M"),
      selectYear: moment().format("YYYY"),
      prevMonthDay: (lenthDays) => {
        let days = [];
        let lenthMonth = moment(
          `${this.state.selectYear}-${this.state.selectMonth}`,
          "YYYY-MM"
        ).daysInMonth();
        for (let i = 0; i < lenthDays; i++) {
          const num = lenthMonth - i;
          days.push({ num, name: "prevMonth" });
        }
        days = days.reverse();
        return lenthDays > 0 ? days : "";
      },
      month: () => {
        let month = [];
        let max_day = moment(
          `${this.state.selectYear}-${this.state.selectMonth}`,
          "YYYY-MM"
        ).daysInMonth();
        for (let i = 0; i < max_day; i++) {
          let num = i + 1;
          let name = moment(
            `${this.state.selectYear}-${this.state.selectMonth}-${num}`
          ).format("dddd");
          let data_day = { num, name };
          month.push(data_day);
        }
        let firstElem = month[0].name;
        let lenthEmptDay = this.state.daysOfWeek.findIndex(
          (m) => m === firstElem
        );
        let prevMonthDay = this.state.prevMonthDay(lenthEmptDay);
        return prevMonthDay ? [...prevMonthDay, ...month] : month;
      },
      selectDay: +moment().format('D'),
    };
  }

  componentWillMount(){
    this.props.getAllEvents()
  }
  

  selectDate = (day) => {
    const date = moment(
      `${this.state.selectMonth}-${day}-${this.state.selectYear}`
    ).format("DD-MM-YYYY");
    this.setState({ date });
  };

  selectDay = (day) => {
    this.setState({ selectDay: day.num });
    this.selectDate(day.num);
  };

  setBorder = (name) => {
    let border = name === "Sunday" ? "danger" : "primary";
    return `border border-${border}`;
  };

  formatClassName = (day) => {
    const border = this.setBorder(day.name);
    const selectDay =
      this.state.selectDay === day.num && day.name !== "prevMonth"
        ? "select-day"
        : "";
    return `day ${border} ${selectDay}`;
  };

  nextMonth = () => {
    let selectMonth = +this.state.selectMonth;
    let selectYear = +this.state.selectYear;
    if (selectMonth >= 12) {
      selectMonth = 0;
      selectYear++;
    }
    selectMonth++;
    this.setState({ selectMonth, selectYear });
  };
  prevMonth = () => {
    let selectMonth = +this.state.selectMonth;
    let selectYear = +this.state.selectYear;
    if (selectMonth <= 1) {
      selectMonth = 13;
      selectYear--;
    }
    selectMonth--;
    this.setState({ selectMonth, selectYear });
  };

  nextYear = () => {
    let selectYear = +this.state.selectYear;
    selectYear++;
    this.setState({ selectYear });
  };
  prevYear = () => {
    let selectYear = +this.state.selectYear;
    selectYear--;
    if (selectYear <= 1) {
      selectYear = 2020;
    }
    this.setState({ selectYear });
  };

  nameMonth = (day) => {
    return moment(`${this.state.selectMonth}`).format("MMMM");
  };

  setDateEvent(day) {
    // Делать проверку на повторения дат событий
    //Справа выводить список событий

    let month = this.state.selectMonth;
    let year = this.state.selectYear;
    let date = moment(`${month}-${day}-${year}`).format("DD-MM-YYYY");
    let eventDatet = this.props.events.find((e) => date === e.date);
    if (eventDatet !== undefined) {
      return { title: eventDatet.title, description: eventDatet.description };
    }
  }

  render() {
    const size = 48;
    const listWeek = this.state.daysOfWeek.map((day) => (
      <div className="week" key={day}>
        {day}
      </div>
    ));

    const listDay = this.state.month().map((day) => (
      <div
        className={`${day.name} + ${this.formatClassName(day)}`}
        key={day.num + day.name}
        onClick={() => {
          this.selectDay(day);
        }}
      >
          {/*<Modal event={this.setDateEvent(day.num)} day={day.num + day.name} />*/}
          <div
            className="dayNum"
            data-toggle="modal"
            data-target={"#date-" + day.num + day.name}
          >
          </div>
        {day.num}
      </div>
    ));

    // const eventsList = this.props.events.map((event, index) => (<div className="event-item" key={index}>
    //    {event.date === this.state.date ?
    //     <div className="event-card card">
    //       <div className="card-body">
    //       <h3 className="card-title">Title: {event.title}</h3>
    //       <p className="card-text" >Description: {event.description}</p>
    //       <span className="date alert alert-secondary">{event.date}</span>
    //       </div>
    //     </div>: ''}
    //   </div>))


    return (
      <div className="calendar-block">
        <div className="calnedar">
        <div className="navigation-calendar border-bottom">
          <div className="month-navigation">
            <div className="prev month" onClick={this.prevMonth}>
              <ArrowLeft size={size} />
            </div>
            <div className="name-month"> {this.nameMonth()} </div>
            <div className="name-year"> {this.state.selectYear} </div>
            <div className="next month" onClick={this.nextMonth}>
              <ArrowRight size={size} />
            </div>
          </div>

          <div
            className="dayNum"
            data-toggle="modal"
            data-target={"#date-" + this.state.selectDay}
          >
            <Modal date={this.state.date}/>
            <PlusCircle size="36" data-toggle="modal" data-target=".bd-example-modal-lg"/>
          </div>
        </div>
        <div className="month">
          {listWeek} {listDay}
        </div>
        </div>
        <div className="event-list">
        <EventList select_date={this.state.date} />

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    events:  state.calendar.events.concat(state.tasks.tasks)
  };
};
const mapDispatchToProps = {
  getAllEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
