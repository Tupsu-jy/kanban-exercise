import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Droppable } from "react-beautiful-dnd";
import Column from "../../components/Column";
import { BoardContext } from "../../contexts/boardContext";
import AddTaskModalContainer from "../TaskModalContainers/AddTaskModalContainer";
import ModalLogicWrap from "../../components/shared/ModalLogicWrap";
import TaskContainer from "../../containers/TaskContainer";
import "./ColumnContainerStyles.css";

/**
 * ColumnContainer represents a column on the board.
 * It contains tasks that can be dragged and dropped.
 */
function ColumnContainer({ columnData }) {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const { tasks } = useContext(BoardContext);

  // We use .map in order to maintain the order of items that exist in task_ids array for tasks.
  // This is important, because this is used to maintain order of tasks in our app
  const columnTasks = columnData.task_ids
    .map((taskId) => tasks.find((task) => task.id === taskId))
    .filter(Boolean);

  return (
    <>
      <Column columnData={columnData} onAddClick={() => setAddModalOpen(true)}>
        <Droppable key={columnData.id} droppableId={columnData.id}>
          {(provided) => (
            <div
              className="column-container"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {columnTasks.map((task, index) => (
                <TaskContainer key={task.id} taskData={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Column>
      <ModalLogicWrap isOpen={isAddModalOpen} setIsOpen={setAddModalOpen}>
        <AddTaskModalContainer
          setAddModalOpen={setAddModalOpen}
          columnId={columnData.id}
        />
      </ModalLogicWrap>
    </>
  );
}

ColumnContainer.propTypes = {
  columnData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    task_ids: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ColumnContainer;
