import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState(null);
  const [aa, setAA] = useState([]);
  useEffect(() => {
    fetch(
      "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo"
    )
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);

  useEffect(() => {
    if (data) {
      const newData = Object.keys(data["Time Series (5min)"]);
      const array = [];
      newData.forEach((item) => {
        const obj = {};
        const another = data["Time Series (5min)"];
        const lop = another[item];
        obj["date"] = item;
        obj["open"] = lop["1. open"];
        obj["high"] = lop["2. high"];
        obj["low"] = lop["3. low"];
        obj["closed"] = lop["4. close"];
        obj["volume"] = lop["5. volume"];
        array.push(obj);
      });
      setAA(array);
    }
  }, [data]);

  return (
    <div className="App">
      <h1>Fetched Data</h1>
      <table className="table" border="2px solid black">
        <thead>
          <tr >
            <th>DateTime</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
            <th>Volume</th>
          </tr>
        </thead>
        {aa?.map((item) => (
          <tbody>
            <tr>
              <td>{item.date}</td>
              <td>{item["open"]}</td>
              <td>{item["high"]}</td>
              <td>{item["low"]}</td>
              <td>{item["closed"]}</td>
              <td>{item["volume"]}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
