import React, { useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import useDragAndDrop from "../../hooks/useDragAndDrop";
import { BoardContext } from "../../contexts/boardContext";
import ColumnContainer from "../ColumnContainer";
import "./BoardContainerStyles.css";

function BoardContainer() {
  const { columns } = useContext(BoardContext);

  const orderedColumns = columns.sort((a, b) => a.position - b.position);

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
