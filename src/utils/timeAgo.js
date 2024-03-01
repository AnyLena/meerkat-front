export const timeAgo = (date) => {
  const currentDate = new Date();
  const messageDate = new Date(date);
  const timeDifference = currentDate - messageDate;
  const seconds = timeDifference / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const months = days / 30;
  const years = days / 365;

  const formatTime = (value, unit) =>
    `${Math.floor(value)} ${unit}${Math.floor(value) > 1 ? "s" : ""} ago`;

  switch (true) {
    case seconds < 60:
      return "Just now";
    case minutes < 60:
      return formatTime(minutes, "minute");
    case hours < 24:
      return formatTime(hours, "hour");
    case days < 7:
      return formatTime(days, "day");
    case weeks < 4:
      return formatTime(weeks, "week");
    case months < 12:
      return formatTime(months, "month");
    default:
      return formatTime(years, "year");
  }
};
