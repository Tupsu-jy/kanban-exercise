import React from "react";
import PropTypes from "prop-types";
import ShadowButton from "../shared/ShadowButton";
import TaskContainer from "../../containers/TaskContainer";
import "./ColumnStyles.css";

/**
 * Column Component
 *
 * Represents a column within a board. Displays the column title, tasks within
 * the column, and provides an option to add a new task to the column.
 */
function Column({ columnData, onAddClick, columnTasks, placeholder }) {
  return (
    <div className="column">
      <h2 className="column-title">{columnData.name}</h2>
      {/*TODO: Droppaple should be moved here to exclude column-title and button. 
      Currently there is jankiness in empty list*/}
      {columnTasks.map((task, index) => (
        <TaskContainer key={task.id} taskData={task} index={index} />
      ))}
      {placeholder}
      <ShadowButton onClick={onAddClick} className="add-task-btn">
        Add Task
      </ShadowButton>
    </div>
  );
}

Column.propTypes = {
  columnData: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  onAddClick: PropTypes.func.isRequired,
  renderTask: PropTypes.func.isRequired,
  columnTasks: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
    })
  ).isRequired,
  placeholder: PropTypes.node,
  isDraggingOver: PropTypes.bool,
};

export default Column;
