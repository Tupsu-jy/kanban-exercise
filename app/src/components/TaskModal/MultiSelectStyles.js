import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  select: {
    background: "white",
    border: "2px solid blue",
    borderRadius: theme.shape.borderRadius,
    "&:focus": {
      background: "white",
    },
  },
  menuItem: {
    background: "white",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 255, 0.08)", // light blue background on hover
    },
    "&.Mui-selected": {
      backgroundColor: "blue", // blue background for selected items
      color: "white", // white text color for better contrast with the blue background
      "&:hover": {
        backgroundColor: "darkblue", // slightly darker blue on hover over selected items
      },
    },
  },
  paper: {
    border: "2px solid blue",
    borderRadius: theme.shape.borderRadius,
  },
}));

export default useStyles;
