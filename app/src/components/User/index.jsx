import React from "react";
import PropTypes from "prop-types";
import "./UserAvatarStyles.css";

/**
 * This component displays a user's avatar.
 *
 * Props:
 * - name: The name of the user. Used to display the initial.
 * - onClick: A function that will be triggered when the avatar is clicked. Opens infocard modal.
 * - color: The background color of the avatar.
 */

function UserAvatar({ name, onClick, color }) {
  return (
    <div
      className="avatar"
      style={{ backgroundColor: color }}
      title={name}
      onClick={onClick}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

UserAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  color: PropTypes.string,
};

export default UserAvatar;
