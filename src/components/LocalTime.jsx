import { useEffect, useState } from "react";
import { getTimezone } from "../api/timezone";

const LocalTime = ({ start, edit, eventData }) => {
  const [timezone, setTimezone] = useState({});
  const [timezoneStart, setTimezoneStart] = useState();
  const [timezoneUser, setTimezoneUser] = useState();

  useEffect(() => {
    getTimezone(eventData.location.lat, eventData.location.lng, setTimezone);
    if (start instanceof Date) {
      const newDate = new Date(eventData.date.start);
      newDate.setSeconds(newDate.getSeconds() + timezone.offset_DST_seconds);
      setTimezoneStart(newDate);
    }
    const today = new Date();
    const timezoneOffset = today.getTimezoneOffset() * -60;
    setTimezoneUser(timezoneOffset);
  }, [start]);

  useEffect(() => {
    console.log(timezoneUser);
    console.log(timezone);
  }, [timezoneUser]);
  return (
    <>
      {!edit ? (
        <p>
          {start instanceof Date ? (
            <>
              {start.getHours()}:
              {start.getMinutes().toString().padStart(2, "0")}
              {!eventData.location.lat ? null : timezoneUser ===
                timezone.offset_STD_seconds ? null : Object.keys(timezone)
                  .length > 0 ? (
                <>
                  {" | "}
                  <span>
                    {timezone.offset_STD[0] === "+"
                      ? (Number(
                          eventData.date.start.split("T")[1].split(":")[0]
                        ) +
                          Number(
                            timezone.offset_STD.split("+")[1].split(":")[0]
                          )) %
                        24
                      : (Number(
                          eventData.date.start.split("T")[1].split(":")[0]
                        ) -
                          Number(
                            timezone.offset_STD.split("-")[1].split(":")[0]
                          ) +
                          24) %
                        24}
                  </span>
                  :{start.getMinutes().toString().padStart(2, "0")}{" "}
                  <span className="local">(local time)</span>
                </>
              ) : null}
            </>
          ) : null}
        </p>
      ) : (
        <input
          type="time"
          value={`${("0" + newStart.getHours()).slice(-2)}:${(
            "0" + newStart.getMinutes()
          ).slice(-2)}`}
          onChange={handleDateChange}
        />
      )}
    </>
  );
};

export default LocalTime;
