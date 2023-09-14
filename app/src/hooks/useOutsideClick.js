import { useEffect } from "react";

/**
 * Hook that alerts if clicked outside of the provided ref.
 *
 * @param {React.MutableRefObject} ref - Ref attached to the target DOM element.
 * @param {Function} callback - Function to be executed after the outside click is detected.
 */
function useOutsideClick(ref, callback) {
  useEffect(() => {
    /**
     * Handle the click event.
     * @param {Event} event - The captured click event.
     */
    const handleOutsideClick = (event) => {
      // Check if ref.current is valid and the click was outside the ref
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    // Attach the click event listener to the document
    document.addEventListener("mousedown", handleOutsideClick);

    // Cleanup function to remove the event listener from the document when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref, callback]); // Only re-run the effect if `ref` or `callback` changes
}

export default useOutsideClick;
