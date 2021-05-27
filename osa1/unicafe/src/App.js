import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const checkAverage = () => {
    return (good * 1 + neutral * 0 + bad * -1) / calcAll();
  };
  const calcAll = () => good + neutral + bad;
  return (
    <div className="App">
      <h1>give feedback</h1>
      <Button clickHandler={() => setGood(good + 1)} text="good" />
      <Button clickHandler={() => setNeutral(neutral + 1)} text="neutral" />
      <Button clickHandler={() => setBad(bad + 1)} text="bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        calcAll={calcAll}
        checkAverage={checkAverage}
      />
    </div>
  );
};

const Button = ({ text, clickHandler }) => (
  <button onClick={clickHandler}>{text}</button>
);
const StatisticLine = ({ text, count }) => (
  <table>
    <tbody>
  <tr>
    <td>{text}</td>
    <td>{count}</td>
  </tr>
  </tbody>
  </table>
);
const Statistics = ({ good, neutral, bad, calcAll, checkAverage }) => {
  if (calcAll() !== 0) {
    return (
      <div className="Statistics">
        <h1>statistics</h1>
        <StatisticLine text="good" count={good} />
        <StatisticLine text="neutral" count={neutral} />
        <StatisticLine text="bad" count={bad} />
        <StatisticLine text="all" count={calcAll()} />
        <StatisticLine text="average" count={checkAverage()} />
        <StatisticLine
          text="positive"
          count={(100 * good) / calcAll() + " %"}
        />
      </div>
    );
  }
  return (
    <div className="Statistics">
      <h1>statistics</h1>
      <p>No feedback given</p>
    </div>
  );
};
export default App;
