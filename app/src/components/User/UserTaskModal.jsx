import React from "react";
import PropTypes from "prop-types";
import "./UserTaskModalStyles.css";

/**
 * Infocard that show the user's name and a list of tasks assigned to them.
 */
function UserTaskModal({ user, tasks, color }) {
  return (
    <div className="user-task-modal">
      <div className="user-header" style={{ backgroundColor: color }}>
        <h2>{user.name}</h2>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>
    </div>
  );
}

UserTaskModal.propTypes = {
  user: PropTypes.object.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
  closeModal: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
};

export default UserTaskModal;
