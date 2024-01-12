import React from "react";
import PropTypes from "prop-types";
import "./ShadowButtonStyles.css";

/**
 * This component displays a rounded button with a shadow effect on hover
 */
function ShadowButton({ onClick, children, className = "" }) {
  return (
    <button className={`shadow-button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

ShadowButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

ShadowButton.defaultProps = {
  className: "",
};

export default ShadowButton;
