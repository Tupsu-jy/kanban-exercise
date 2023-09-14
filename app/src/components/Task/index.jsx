import React from "react";
import PropTypes from "prop-types";
import ShadowButton from "../shared/ShadowButton";
import AssignedUsersContainer from "../../containers/AssignedUsersContainer";
import "./TaskStyles.css";

/**
 * Task Component
 *
 * Displays a single task with its name, description, assigned users, and importance.
 * Additionally, it provides an edit button to trigger the task editing mode.
 */
function Task({ taskData, onEditClick }) {
  return (
    <div className="task">
      <div className="task-header">
        <span className="task-name">{taskData.name}</span>
        <ShadowButton onClick={onEditClick}>Edit</ShadowButton>
      </div>
      <p className="task-description">{taskData.description}</p>
      <div className="task-users">
        <div className="avatars-container">
          <AssignedUsersContainer assigned={taskData.assigned} />{" "}
        </div>
        <div
          className={`importance-indicator importance-${taskData.importance}`}
          title={`Importance: ${
            ["Low", "Medium", "High"][taskData.importance]
          }`}
        ></div>
      </div>
    </div>
  );
}

Task.propTypes = {
  taskData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    assigned: PropTypes.arrayOf(PropTypes.number.isRequired),
    importance: PropTypes.number.isRequired,
  }).isRequired,
  onEditClick: PropTypes.func.isRequired,
};

export default Task;
