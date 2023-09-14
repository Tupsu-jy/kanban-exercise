import { useContext, useState } from "react";
import { BoardContext } from "../contexts/boardContext";
import { moveTaskInsideColumn, moveTaskBetweenColumns } from "../api/column";
import { ConfirmationContext } from "../contexts/confirmationContext";
import _ from "lodash";

// Hook that provides drag-and-drop functionality for tasks.
const useDragAndDrop = () => {
  const { columns, setColumns } = useContext(BoardContext);
  const [isLoading, setIsLoading] = useState(false);
  const confirm = useContext(ConfirmationContext);

  // Handles drag end event to update the board's state.
  const handleDragEnd = (result) => {
    console.log("Handling drag end", result);

    // TODO: This is a temporary fix to prevent multiple API calls from being made.
    // Ensure that any ongoing API call is complete before handling another drag event.
    if (isLoading) {
      console.log(
        "Currently loading, returning without processing drag. Its not a bug, its a feature."
      );
      confirm(
        "Currently loading, returning without processing drag. Its not a bug, its a feature."
      );
      return;
    }

    const { source, destination, draggableId } = result;

    // If no drop destination exists, exit the function.
    if (!destination) {
      console.log("No destination provided, returning.");
      return;
    }

    // If the item was dropped in the same place, exit the function.
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      console.log("Source and destination are the same, returning.");
      return;
    }

    const startColumn = columns.find((col) => col.id === source.droppableId);
    const finishColumn = columns.find(
      (col) => col.id === destination.droppableId
    );

    setIsLoading(true);

    // Determine if task is being moved within the same column or to a different column.
    if (startColumn === finishColumn) {
      reorderTasksWithinSameColumn(
        startColumn,
        source,
        destination,
        draggableId
      );
    } else {
      moveTasksAcrossColumns(
        startColumn,
        finishColumn,
        source,
        destination,
        draggableId
      );
    }
  };

  // Updates the order of tasks within the same column.
  const reorderTasksWithinSameColumn = (
    column,
    source,
    destination,
    draggableId
  ) => {
    const originalColumns = _.cloneDeep(columns);
    const newTaskIds = Array.from(column.task_ids);

    // Error handling in case of any discrepancies.
    if (newTaskIds[source.index] !== draggableId) {
      console.error(
        "Mismatch between draggableId and task ID at source index. Aborting."
      );
      setIsLoading(false);
      return;
    }

    // Update the order of task ids based on drag result.
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const payload = {
      task_id: draggableId,
      column_id: column.id,
      from_index: source.index,
      to_index: destination.index,
    };

    // Update local state with new order.
    setColumns((prev) =>
      prev.map((col) =>
        col.id === column.id ? { ...column, task_ids: newTaskIds } : col
      )
    );

    // Make API call to update the order in the backend.
    moveTaskInsideColumn(payload)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        // In case of API error, revert local changes.
        console.error("API call failed:", error);
        setColumns(originalColumns);
        setIsLoading(false);
        confirm("Failed to reorder tasks. Please try again.");
      });
  };

  // Moves task to a different column.
  const moveTasksAcrossColumns = (
    startColumn,
    finishColumn,
    source,
    destination,
    draggableId
  ) => {
    const originalColumns = _.cloneDeep(columns);
    const startTaskIds = Array.from(startColumn.task_ids);

    // Error handling in case of discrepancies.
    if (startTaskIds[source.index] !== draggableId) {
      console.error(
        "Mismatch between draggableId and task ID at source index. Aborting."
      );
      setIsLoading(false);
      return;
    }

    // Update the task ids for source and destination columns.
    startTaskIds.splice(source.index, 1);
    const finishTaskIds = Array.from(finishColumn.task_ids);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const payload = {
      task_id: draggableId,
      column1_id: startColumn.id,
      column1_from_index: source.index,
      column2_id: finishColumn.id,
      column2_to_index: destination.index,
    };

    // Update local state with new order.
    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === startColumn.id)
          return { ...startColumn, task_ids: startTaskIds };
        if (col.id === finishColumn.id)
          return { ...finishColumn, task_ids: finishTaskIds };
        return col;
      })
    );

    // Make API call to update the order in the backend.
    moveTaskBetweenColumns(payload)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        // In case of API error, revert local changes.
        console.error("API call failed:", error);
        setColumns(originalColumns);
        setIsLoading(false);
        confirm("Failed to move task to another column. Please try again.");
      });
  };

  return handleDragEnd;
};

export default useDragAndDrop;
