import React, { useState, useContext } from "react";
import TaskModal from "../../components/TaskModal";
import useManageTasks from "../../hooks/useManageTasks";
import PropTypes from "prop-types";
import { ConfirmationContext } from "../../contexts/confirmationContext";

function EditTaskModalContainer({ initialTaskData, setEditModalOpen }) {
  const [editedTask, setEditedTask] = useState(initialTaskData);
  const [isChangeAssignedOpen, setIsChangeAssignedOpen] = useState(false);
  const { updateTask, removeTask } = useManageTasks();
  const confirm = useContext(ConfirmationContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleChangeAssigned = () => {
    setIsChangeAssignedOpen(!isChangeAssignedOpen);
  };

  // Handler to update the assigned users
  const handleAssignedUsersChange = (selectedUserIds) => {
    setEditedTask((prev) => ({
      ...prev,
      assigned: selectedUserIds,
    }));
  };

  const handleSaveChanges = async (editedTask) => {
    const isConfirmed = await confirm(
      "Are you sure you want to save the changes?"
    );
    if (isConfirmed) {
      // Call the addTask hook
      updateTask(editedTask);
      // Close the modal
      setEditModalOpen(false);
    }
  };

  const handleDelete = async () => {
    const isConfirmed = await confirm(
      "Are you sure you want to delete the task?"
    );
    if (isConfirmed) {
      // Call the addTask hook
      removeTask(editedTask.id);
      // Close the modal
      setEditModalOpen(false);
    }
  };

  // Define buttons
  const buttons = [
    {
      label: "Delete Task",
      onClick: handleDelete,
      className: "delete-button",
    },
    {
      label: "Save Changes",
      onClick: () => handleSaveChanges(editedTask),
      className: "save-changes-button",
    },
  ];

  return (
    <TaskModal
      taskData={editedTask}
      handleInputChange={handleInputChange}
      buttons={buttons}
      isChangeAssignedOpen={isChangeAssignedOpen}
      toggleChangeAssigned={toggleChangeAssigned}
      handleAssignedUsersChange={handleAssignedUsersChange}
    />
  );
}

EditTaskModalContainer.propTypes = {
  initialTaskData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    assigned: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  setEditModalOpen: PropTypes.func.isRequired,
};

export default EditTaskModalContainer;
