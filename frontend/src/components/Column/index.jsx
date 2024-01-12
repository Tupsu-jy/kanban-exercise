import React from "react";
import PropTypes from "prop-types";
import ShadowButton from "../shared/ShadowButton";
import "./ColumnStyles.css";

/**
 * Column Component
 *
 * Represents a column within a board. Displays the column title, tasks within
 * the column, and provides an option to add a new task to the column.
 */
function Column({ columnData, onAddClick, children }) {
  return (
    <div className="column">
      <h2 className="column-title">{columnData.name}</h2>
      {children}
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
  children: PropTypes.node,
};

export default Column;
