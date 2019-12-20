import React, { useEffect, useState, useMemo } from "react";
import ntrlab from "./assets/ntr.png";
import "./App.css";
import moment from "moment";

const DAY = 24;
const MINUT = 60;
const S = 1000;

const App: React.FC = () => {
  const NEW_YEAR = useMemo(() => moment("01/01/2020"), []);
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

  function str(count: number, one: string, two: string, five: string) {
    return count % 10 === 1 && count % 100 !== 11
      ? one
      : count % 10 >= 2 &&
        count % 10 <= 4 &&
        (count % 100 < 10 || count % 100 >= 20)
      ? two
      : five;
  }

  return (
    <div className="App">
      <div className="content">
        <img src={ntrlab} alt="" />
        {isNewYear ? (
          <>
            <h1>С Новым 2020 годом!</h1>
          </>
        ) : (
          <>
            <h1>С наступающим Новым годом!</h1>
            <div className="now">Сегодня: {now.format("DD/MM/YYYY")}.</div>
            <div className="left">До Нового года осталось:</div>
            <div className="left-days">
              {time[0]} {str(time[0], "день", "дня", "дней")}, {time[1]}{" "}
              {str(time[1], "час", "часа", "часов")}, {time[2]}{" "}
              {str(time[2], "минута", "минуты", "минут")}, {time[3]}{" "}
              {str(time[3], "секунда", "секунды", "секунд")}
            </div>
          </>
        )}
      </div>
      <div className="exlight">https://github.com/only-exlight</div>
    </div>
  );
};

export default App;
