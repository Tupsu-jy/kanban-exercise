import React, { useState, useContext } from "react";
import useManageTasks from "../../hooks/useManageTasks";
import TaskModal from "../../components/TaskModal";
import { ConfirmationContext } from "../../contexts/confirmationContext";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

function AddTaskModalContainer({ setAddModalOpen, columnId }) {
  const initialState = {
    id: uuidv4(),
    name: "",
    description: "",
    assigned: [],
    importance: 0,
  };
  const [isChangeAssignedOpen, setIsChangeAssignedOpen] = useState(false);
  const [task, setTask] = useState(initialState);
  const confirm = useContext(ConfirmationContext);

  const { addTask } = useManageTasks();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleChangeAssigned = () => {
    setIsChangeAssignedOpen(!isChangeAssignedOpen);
  };

  const handleAssignedUsersChange = (selectedOptions) => {
    // Update the task's assigned users with the selected user IDs
    setTask((prev) => ({
      ...prev,
      assigned: selectedOptions,
    }));
  };

  const handleAddTask = async () => {
    const isConfirmed = await confirm(
      "Are you sure you want to add this task?"
    );
    if (isConfirmed) {
      // Call the addTask hook
      addTask(task, columnId);
      // Close the modal
      setAddModalOpen(false);
    }
  };

  // Define buttons
  const buttons = [
    {
      label: "Add Task",
      onClick: handleAddTask,
      className: "add-task-button",
    },
  ];

  return (
    <TaskModal
      taskData={task}
      handleInputChange={handleInputChange}
      buttons={buttons}
      isChangeAssignedOpen={isChangeAssignedOpen}
      toggleChangeAssigned={toggleChangeAssigned}
      handleAssignedUsersChange={handleAssignedUsersChange}
    />
  );
}

AddTaskModalContainer.propTypes = {
  setAddModalOpen: PropTypes.func.isRequired,
  columnId: PropTypes.string.isRequired,
};

export default AddTaskModalContainer;
