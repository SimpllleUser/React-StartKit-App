import React, { useState } from "react";
import moment from "moment";

const today = moment;



const Calendar = () => {
  let [selectYear, setYear] = useState(moment().format("YYYY"));
  let [selectMonth, setMonth] = useState(moment().format("M"));

  const initMonth = () => {
    const MonthYear = today().format("MM-YYYY");
    let month = [];
    let max_day = today(`${selectMonth}-${selectMonth}`, "YYYY-MM").daysInMonth();
    for (let i = 0; i < max_day; i++) {
      let num = i + 1;
      let name = today(`${num}-${MonthYear}`, "DD-MM-YYYY").format("dddd");
      let data_day = { num, name };
      month.push(data_day);
    }
    return month;
  };
  
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thus", "Fri", "Sut", "Sun"];
  
  const setBorder = (name) =>{
    let border = name === 'Sunday' ? 'danger' : 'primary'
    return `border border-${border}`
  }

  const listDay = initMonth().map((day) => (
    <div className={'day ' + setBorder(day.name)} key={day.num}>
      <div className="dayNum">{day.num}</div>
    </div>
  ));
  
  const listWeek = daysOfWeek.map((day) => (
    <div className="week" key={day}>
      {day}
    </div>
  ));

  const nextMonth = () => {
   if(selectMonth >= 12){
     selectMonth = 0
     setYear(+selectYear + 1)
   }
    setMonth(+selectMonth + 1);
  };
  const prevMonth = () => {
    if(selectMonth <= 1){
      selectMonth = 13
      setYear(+selectYear - 1)
    }
    setMonth(+selectMonth - 1);
  };

  const nextYear = () => {
    setYear(+selectYear + 1);
  };
  const prevYear = () => {
    setYear = +selectYear <= 1 ? setYear(2020) : setYear(+selectYear - 1)
  };

  const nameMonth = () => {
    return today(`${selectMonth}`).format('MMMM')
  }

  return (
    <div>
      <h1> Calendar</h1>
      <div className="navigation-calendar year-header">
        <div className="prev year"onClick={prevYear}>-</div>
        <div className="name-year">{selectYear}</div>
        <div className="next year" onClick={nextYear}>+</div>
      </div>
      <div className="navigation-calendar month-header">
        <div className="prev month" onClick={prevMonth}>-</div>
        <div className="name-month">{nameMonth()}</div>
        <div className="next month" onClick={nextMonth}>+</div>
      </div>
      <div className="month">
        {listWeek}
        {listDay}
      </div>

      {console.log(initMonth())}
    </div>
  );
};

export default Calendar;
