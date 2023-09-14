import React, { useContext } from "react";
import { BoardContext } from "../../contexts/boardContext";
import UserAvatarContainer from "./UserAvatarContainer";
import PropTypes from "prop-types";

/**
 * AssignedUsersContainer Component
 *
 * This component displays a list of user avatars based on the assigned user IDs provided.
 *
 * It first retrieves the full user objects from the BoardContext using the given IDs.
 * The user avatars are then rendered using the UserAvatarContainer component.
 *
 * Props:
 * - assigned: An array of user IDs indicating which users have been assigned.
 */
function AssignedUsersContainer({ assigned }) {
  const { users } = useContext(BoardContext);

  return (
    <>
      {assigned
        ?.map((userId) => users.find((user) => user.id === userId))
        .filter(Boolean)
        .map((user) => (
          <UserAvatarContainer key={user.id} user={user} />
        ))}
    </>
  );
}

AssignedUsersContainer.propTypes = {
  assigned: PropTypes.arrayOf(PropTypes.string),
};

export default AssignedUsersContainer;
