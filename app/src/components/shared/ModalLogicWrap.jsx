import React, { useRef } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import PropTypes from "prop-types";
import "./ModalLogicWrapStyles.css";

/**
 * ModalLogicWrap Component
 *
 * A higher-order component that wraps other components to provide modal behavior.
 * It displays the wrapped content inside a modal if 'isOpen' prop is true.
 * The modal can be closed by clicking outside of its content.
 * It also provides s darkening effect to the background outside modal.
 */
function ModalLogicWrap({ children, isOpen, setIsOpen }) {
  // Reference to the modal's content, used for detecting outside clicks.
  const modalRef = useRef(null);

  // Hook to handle clicks outside the modal's content, closing it if it's currently open.
  useOutsideClick(modalRef, () => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  // If modal isn't open, don't render anything.
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div ref={modalRef} className="modal-content">
        {children}
      </div>
    </div>
  );
}

ModalLogicWrap.propTypes = {
  children: PropTypes.node.isRequired, // The content to display inside the modal.
  isOpen: PropTypes.bool.isRequired, // Indicates if the modal should be displayed.
  setIsOpen: PropTypes.func.isRequired, // Function to set the modal's open state.
};

export default ModalLogicWrap;
