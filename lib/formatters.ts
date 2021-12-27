import formatDuration from "format-duration";

export const formatTime = (timeInSecounds = 0) => {
  return formatDuration(timeInSecounds * 1000);
};

export const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
