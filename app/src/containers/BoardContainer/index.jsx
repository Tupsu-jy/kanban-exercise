import React, { useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import { BoardContext } from "../../contexts/boardContext";
import ColumnContainer from "../ColumnContainer";
import "./BoardContainerStyles.css";

function BoardContainer() {
  const { columns } = useContext(BoardContext);

  const COLUMN_ORDER = ["Backlog", "In progress", "In testing", "Done"];
  const orderedColumns = columns.sort(
    (a, b) => COLUMN_ORDER.indexOf(a.name) - COLUMN_ORDER.indexOf(b.name)
  );

  const handleDragEnd = useDragAndDrop();

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="board-container">
        {orderedColumns.map((column) => (
          <ColumnContainer key={column.id} columnData={column} />
        ))}
      </div>
    </DragDropContext>
  );
}

export default BoardContainer;
