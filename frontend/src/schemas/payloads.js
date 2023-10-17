import * as yup from "yup";

export const insideMoveSchema = yup.object().shape({
  task_id: yup.string().required(),
  column_id: yup.string().required(),
  from_index: yup.number().required(),
  to_index: yup.number().required(),
});

export const crossMoveSchema = yup.object().shape({
  task_id: yup.string().required(),
  column1_id: yup.string().required(),
  column1_from_index: yup.number().required(),
  column2_id: yup.string().required(),
  column2_to_index: yup.number().required(),
});

export const createInsideMovePayload = ({
  taskId,
  columnId,
  fromIndex,
  toIndex,
}) => {
  return {
    task_id: taskId,
    column_id: columnId,
    from_index: fromIndex,
    to_index: toIndex,
  };
};

export const createCrossMovePayload = ({
  taskId,
  column1Id,
  column1FromIndex,
  column2Id,
  column2ToIndex,
}) => {
  return {
    task_id: taskId,
    column1_id: column1Id,
    column1_from_index: column1FromIndex,
    column2_id: column2Id,
    column2_to_index: column2ToIndex,
  };
};
