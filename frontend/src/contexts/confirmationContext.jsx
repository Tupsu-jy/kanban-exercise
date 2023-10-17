import React, { createContext, useState } from "react";
import ConfirmationDialog from "../components/shared/ConfirmationDialog";
import PropTypes from "prop-types";

// Create a context for confirmation actions (like delete confirmations) to be used throughout the app
const ConfirmationContext = createContext();

const ConfirmationProvider = ({ children }) => {
  // State to manage the visibility of the confirmation dialog
  const [isOpen, setIsOpen] = useState(false);
  // State to hold the message to be displayed in the confirmation dialog
  const [message, setMessage] = useState("");
  // A function to resolve the promise once user action (confirm/cancel) is taken
  const [resolve, setResolve] = useState(null);

  // Function to trigger the confirmation dialog. Returns a promise that resolves to true (confirm) or false (cancel)
  const confirm = (message) => {
    setIsOpen(true);
    setMessage(message);
    return new Promise((_resolve) => {
      setResolve(() => _resolve);
    });
  };

  // Handler to confirm the action and resolve the promise with true
  const handleConfirm = () => {
    setIsOpen(false);
    resolve(true);
  };

  // Handler to cancel the action and resolve the promise with false
  const handleCancel = () => {
    setIsOpen(false);
    resolve(false);
  };

  return (
    <ConfirmationContext.Provider value={confirm}>
      {children}
      {isOpen && (
        <ConfirmationDialog
          message={message}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </ConfirmationContext.Provider>
  );
};

// Prop types validation for the ConfirmationProvider
ConfirmationProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { ConfirmationProvider, ConfirmationContext };
