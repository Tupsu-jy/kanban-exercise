import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import Task from "../../components/Task";
import PropTypes from "prop-types";
import ModalLogicWrap from "../../components/shared/ModalLogicWrap";
import EditTaskModalContainer from "../TaskModalContainers/EditTaskModalContainer";
import "./TaskContainerStyles.css";

/**
 * TaskContainer Component
 * This component wraps the Task and provides drag-and-drop functionality.
 * It also manages the opening of modal for editing a task.
 */
function TaskContainer({ taskData, index }) {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  return (
    <>
      <Draggable draggableId={taskData.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="task-container"
          >
            <Task
              taskData={taskData}
              onEditClick={() => setEditModalOpen(true)}
            />
          </div>
        )}
      </Draggable>
      <ModalLogicWrap isOpen={isEditModalOpen} setIsOpen={setEditModalOpen}>
        <EditTaskModalContainer
          initialTaskData={taskData}
          setEditModalOpen={setEditModalOpen}
        />
      </ModalLogicWrap>
    </>
  );
}

TaskContainer.propTypes = {
  taskData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    assigned: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default TaskContainer;
