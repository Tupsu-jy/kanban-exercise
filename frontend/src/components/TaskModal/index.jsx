import React, { useContext } from "react";
import ShadowButton from "../shared/ShadowButton";
import TextareaAutosize from "react-textarea-autosize";
import AssignedUsersContainer from "../../containers/AssignedUsersContainer";
import { BoardContext } from "../../contexts/boardContext";
import { Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import PropTypes from "prop-types";
import "./TaskModalStyles.css";
import useStyles from "./MultiSelectStyles";

/**
 * TaskModal Component
 *
 * Displays a modal for creating or editing a task. It captures input for the task's name,
 * description, assigned users, and importance. Additionally, it provides options for
 * user interaction through various buttons.
 */
function TaskModal({
  handleInputChange,
  taskData,
  buttons,
  isChangeAssignedOpen,
  toggleChangeAssigned,
  handleAssignedUsersChange,
}) {
  const importanceColors = ["green", "yellow", "red"];
  const { users } = useContext(BoardContext);
  const classes = useStyles();

  // Handle change for multi select dropdown (assigned users)
  const handleMultiSelectChange = (event) => {
    handleAssignedUsersChange(event.target.value);
  };

  return (
    <div className="task-modal">
      <div className="task-modal-name">
        <input
          name="name"
          value={taskData.name}
          placeholder="Type here..."
          onChange={handleInputChange}
          maxLength={20}
        />
      </div>

      <div className="task-modal-description task-modal-section">
        <label>Description</label>
        <TextareaAutosize
          name="description"
          minRows={3}
          maxRows={12}
          maxLength={193}
          className="custom-textarea"
          placeholder="Type here..."
          value={taskData.description}
          onChange={handleInputChange}
        />
      </div>

      <div className="task-modal-assigned task-modal-section">
        <label>Assigned</label>
        <div className="avatars">
          <AssignedUsersContainer assigned={taskData.assigned} />
          <ShadowButton
            className="change-assigned-button"
            onClick={toggleChangeAssigned}
          >
            Change Assigned
          </ShadowButton>

          {isChangeAssignedOpen && (
            <FormControl style={{ minWidth: 240 }}>
              <InputLabel id="demo-mutiple-name-label">Name</InputLabel>
              <Select
                className={classes.select}
                labelId="demo-mutiple-name-label"
                multiple
                value={taskData.assigned}
                onChange={handleMultiSelectChange}
                renderValue={(selected) =>
                  selected
                    .map(
                      (id) => users.find((user) => user.id === id)?.name || ""
                    )
                    .join(", ")
                }
                MenuProps={{
                  disablePortal: true,
                  getContentAnchorEl: null,
                  PaperProps: {
                    style: {
                      maxHeight: 48 * 4.5 + 8,
                      width: 250,
                    },
                  },
                }}
              >
                {users.map((user) => (
                  <MenuItem
                    key={user.id}
                    value={user.id}
                    className={classes.menuItem}
                  >
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </div>
      </div>

      <div className="task-modal-section">
        <label>Importance</label>
        <div className="task-modal-importance">
          {importanceColors.map((color, index) => (
            <div
              key={color}
              className={`colored-balls ${color} ${
                taskData.importance === index ? "selected" : ""
              }`}
              onClick={() =>
                handleInputChange({
                  target: { name: "importance", value: index },
                })
              }
            ></div>
          ))}
          <span>
            {taskData.importance === 0
              ? "Low"
              : taskData.importance === 1
              ? "Medium"
              : "High"}
          </span>
        </div>
      </div>

      <div className="task-modal-buttons">
        {buttons.map((button) => (
          <ShadowButton
            key={button.label}
            className={button.className}
            onClick={button.onClick}
          >
            {button.label}
          </ShadowButton>
        ))}
      </div>
    </div>
  );
}

TaskModal.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  taskData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    assigned: PropTypes.arrayOf(PropTypes.string.isRequired),
    importance: PropTypes.number.isRequired,
  }).isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
      className: PropTypes.string.isRequired,
    })
  ).isRequired,
  isChangeAssignedOpen: PropTypes.bool.isRequired,
  toggleChangeAssigned: PropTypes.func.isRequired,
  handleAssignedUsersChange: PropTypes.func.isRequired,
};

export default TaskModal;
