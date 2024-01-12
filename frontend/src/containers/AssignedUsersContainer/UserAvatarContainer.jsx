import React, { useContext, useState, useRef } from "react";
import PropTypes from "prop-types";
import UserAvatar from "../../components/User";
import UserTaskModal from "../../components/User/UserTaskModal";
import { BoardContext } from "../../contexts/boardContext";
import useOutsideClick from "../../hooks/useOutsideClick";
import "./UserAvatarContainerStyles.css";

/**
 * UserAvatarContainer Component
 * This component renders a user avatar and a info card modal showing all tasks assigned to that user.
 * Clicking outside the modal will close it.
 */
function UserAvatarContainer({ user }) {
  const [isFocused, setIsFocused] = useState(false);
  const { tasks } = useContext(BoardContext);

  // Filter tasks that are assigned to the current user
  const userTasks = tasks.filter((task) => task.assigned.includes(user.id));

  // Generate a unique color based on the user's name's first character code
  const charCode = user.name.charCodeAt(0);
  const hue = (charCode * 17) % 360;
  const color = `hsl(${hue}, 60%, 50%)`;

  const containerRef = useRef(null);

  // Set up the hook to detect clicks outside the modal and close it
  useOutsideClick(containerRef, () => {
    if (isFocused) {
      setIsFocused(false);
    }
  });

  // Handler to open the modal when the avatar is clicked
  const handleClick = () => {
    setIsFocused(true);
  };

  return (
    <div className="avatar-container" ref={containerRef}>
      {isFocused && (
        <UserTaskModal
          user={user}
          tasks={userTasks}
          closeModal={() => setIsFocused(false)}
          color={color}
        />
      )}

      <UserAvatar color={color} name={user.name} onClick={handleClick} />
    </div>
  );
}

// PropTypes for UserAvatarContainer
UserAvatarContainer.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserAvatarContainer;
