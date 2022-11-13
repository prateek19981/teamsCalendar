import React, { useState } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./AddEventForm.module.css";
const customStyles = {
  content: {
    position: "sticky",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -30%)",
    height: "600px",
    backgroundColor: "#5f98ed",
    display: "flex",
    alignItems: "space-between",
    justifyContent: "center",
    textAlign: "center",
    width: "50%",
  },
  overlay: { zIndex: 1000 },
};

function AddEventForm({
  openModal,
  setIsOpen,
  modalIsOpen,
  newEvent,
  setNewEvent,
  handleEditEvent,
  handleRemoveEvent,
}) {
  const [editEvent, setEditEvent] = useState(newEvent);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      style={customStyles}
    >
      <div className="form-contain">
        <div className="header">
          <h1>Edit Event</h1>
        </div>

        <input
          value={editEvent.title}
          type="text"
          placeholder="Add title"
          onChange={(e) => {
            setEditEvent((p) => {
              return {
                ...p,
                id: new Date().getMilliseconds(),
                title: e.target.value,
              };
            });
          }}
        />
        <DatePicker
          placeholderText="Start date daal"
          selected={editEvent.start}
          onChange={(start) => {
            setEditEvent((p) => {
              return { ...p, start };
            });
          }}
          popperClassName={styles.custom}
          popperModifiers={[
            {
              name: "arrow",
              options: {
                padding: 80,
              },
            },
          ]}
          allowSameDay={false}
        />
        <DatePicker
          placeholderText="End date"
          selected={editEvent.end}
          onChange={(end) => {
            let dt = new Date(end);
            dt.setDate(dt.getDate() + 1);
            setEditEvent((p) => {
              return { ...p, end };
            });
          }}
          popperClassName={styles.custom2}
          popperModifiers={[
            {
              name: "arrow",
              options: {
                padding: 90,
              },
            },
          ]}
          allowSameDay={true}
        />

        <button
          disabled={editEvent.title === ""}
          onClick={(e) => {
            setIsOpen(false);
            handleEditEvent(editEvent);
          }}
        >
          Edit Event
        </button>
        <button
          disabled={editEvent.title === ""}
          onClick={(e) => {
            setIsOpen(false);
            handleRemoveEvent(editEvent);
          }}
        >
          Remove this Event
        </button>
      </div>
    </Modal>
  );
}

export default AddEventForm;
