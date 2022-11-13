import "./App.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/getDay";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import AddEventForm from "./AddEventForm";

const locales = {
  "en-US": "date-fns/locale/en-US",
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function App() {
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: "",
    end: "",
    id: 1,
  });
  const [allEvents, setAllEvents] = useState(
    JSON.parse(localStorage.getItem("events")) || []
  );
  const [modalIsOpen, setIsOpen] = useState(false);

  const handleAddEvent = () => {
    setAllEvents((prev) => {
      let ev = { ...newEvent };

      let dt = new Date(ev.end);
      dt.setDate(dt.getDate() + 1);
      ev.end = dt;
      console.log("ev", ev);
      console.log("prev", newEvent);
      return [...prev, ev];
    });
    setNewEvent({
      title: "",
      start: "",
      end: "",
      id: 1,
    });
  };
  const handleEditEvent = (event) => {
    let ev = { ...event };

    let dt = new Date(ev.end);
    dt.setDate(dt.getDate() + 1);
    ev.end = dt;
    let index = allEvents.map((e) => e.id).indexOf(event.id);
    let eventsArray = [...allEvents];
    eventsArray.splice(index, 1, ev);
    setAllEvents(eventsArray);
    setNewEvent({
      title: "",
      start: "",
      end: "",
      id: 1,
    });
  };
  const handleRemoveEvent = (event) => {
    let fil = allEvents.filter((i) => {
      return i.id !== event.id;
    });
    setAllEvents(fil);
  };

  function openModal() {
    setIsOpen(true);
  }
  localStorage.setItem("events", JSON.stringify(allEvents));
  const handleSelect = (e) => {
    let ev = { ...e, start: new Date(e.start), end: new Date(e.end) };

    setNewEvent(ev);

    setIsOpen(true);
  };

  return (
    <>
      <div className="App">
        <h2>Calendar</h2>
        <h5>Add New Event</h5>
        <div className="form-contain">
          <input
            type="text"
            placeholder="Add title"
            style={{ width: "20%", marginRight: "10px " }}
            value={newEvent?.title}
            onChange={(e) => {
              setNewEvent((p) => {
                return {
                  ...p,
                  id: new Date().getMilliseconds(),
                  title: e.target.value,
                };
              });
            }}
          />
          <DatePicker
            placeholderText="Start date"
            selected={newEvent?.start}
            onChange={(start) => {
              setNewEvent((p) => {
                return { ...p, start };
              });
            }}
            style={{ marginLeft: "200px" }}
            allowSameDay={true}
          />
          <DatePicker
            placeholderText="End date"
            selected={newEvent?.end}
            onChange={(end) => {
              let dt = new Date(end);
              dt.setDate(dt.getDate() + 1);
              setNewEvent((p) => {
                return { ...p, end };
              });
            }}
            allowSameDay={true}
          />
          <button onClick={handleAddEvent} disabled={newEvent?.title === ""}>
            Add Event
          </button>
        </div>
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, margin: "50px" }}
          onSelectEvent={handleSelect}
        />
      </div>
      {modalIsOpen && (
        <AddEventForm
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          openModal={openModal}
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          handleEditEvent={handleEditEvent}
          handleRemoveEvent={handleRemoveEvent}
        />
      )}
    </>
  );
}

export default App;
