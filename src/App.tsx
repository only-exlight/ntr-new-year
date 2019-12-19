import React, { useEffect, useState, useMemo } from "react";
import ntrlab from "./assets/ntr.png";
import "./App.css";
import moment from "moment";
const Snow = require("react-snow-effect");

const DAY = 24;
const MINUT = 60;
const S = 1000;

const App: React.FC = () => {
  const NEW_YEAR = useMemo(() => moment("01.01.2020"), []);
  const [now, setNow] = useState(moment());
  const [time, setTime] = useState<[number, number, number, number]>([
    0,
    0,
    0,
    0
  ]);
  const [isNewYear, setIsNewYear] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setNow(moment());
      const NOW = moment();
      const d = NEW_YEAR.diff(NOW, "days");
      const h = NEW_YEAR.diff(NOW, "hours") - d * DAY;
      const m = NEW_YEAR.diff(NOW, "minutes") - d * DAY * MINUT - h * MINUT;
      const s =
        NEW_YEAR.diff(NOW, "seconds") - NEW_YEAR.diff(NOW, "minutes") * 60;
      setTime([d, h, m, s]);
      if (NEW_YEAR.diff(NOW, "seconds") < 0) {
        setIsNewYear(true);
      }
    }, S);
  }, [NEW_YEAR]);

  const dayStr = useMemo(() => {
    if (time[0] === 1) {
      return "день";
    } else if (time[0] === 2 || time[0] === 3 || time[0] === 4) {
      return "дня";
    } else if (time[0] === 0 || time[0] >= 5) {
      return "дней";
    }
  }, [time]);

  const hourStr = useMemo(() => {
    if (time[1] === 1 || time[1] === 21) {
      return "час";
    } else if ((time[1] >= 2 && time[1] <= 4) || time[1] > 22) {
      return "часа";
    } else if (time[1] === 0 || time[1] > 5) {
      return "часов";
    }
  }, [time]);

  const minutStr = useMemo(() => {
    if (
      time[2] === 1 ||
      time[2] === 21 ||
      time[2] === 31 ||
      time[2] === 41 ||
      time[2] === 51
    ) {
      return "минута";
    } else if ((time[2] >= 2 && time[2] <= 4) || time[2] > 22) {
      return "минуты";
    } else if (time[2] === 0 || time[2] >= 5) {
      return "минут";
    } else {
      return "минут";
    }
  }, [time]);

  const secondStr = useMemo(() => {
    if (
      time[3] === 1 ||
      time[3] === 21 ||
      time[3] === 31 ||
      time[3] === 41 ||
      time[3] === 51
    ) {
      return "секунда";
    } else if (time[3] === 0) {
      return "секунд";
    } else if (
      (Number(time[3].toString()[1]) >= 2 &&
        Number(time[3].toString()[1]) <= 4) ||
      (time[3] >= 2 && time[3] <= 4)
    ) {
      return "секунды";
    } else {
      return "секунд";
    }
  }, [time]);

  return (
    <div className="App">
      <Snow />
      <div className="content">
        <img src={ntrlab} alt="" />
        {isNewYear ? (
          <>
            <h1>С Новым 2020 годом!</h1>
          </>
        ) : (
          <>
            <h1>С наступающим Новым годом!</h1>
            <div className="now">Сегодня: {now.format("DD/MM/YYYY")}</div>
            <div className="left">До Нового года осталось:</div>
            <div className="left-days">
              {time[0]} {dayStr}, {time[1]} {hourStr}, {time[2]} {minutStr},{" "}
              {time[3]} {secondStr}
            </div>
          </>
        )}
      </div>
      <div className="exlight">https://github.com/only-exlight</div>
    </div>
  );
};

export default App;
