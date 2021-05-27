import React, { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, addVote] = useState(new Array(anecdotes.length).fill(0));
  return (
    <div>
      <h1>Anectode of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>
        has {votes[selected]}{" "}
        votes
      </p>
      <button
        onClick={() => {
          const newVotes = [...votes];
          (newVotes[selected] += 1)
          addVote(newVotes)
        }}
      >
        vote
      </button>
      <button
        onClick={() => {
          console.log(Math.max(...votes))
          setSelected(Math.floor(Math.random() * anecdotes.length));
        }}
      >
        next anectode
      </button>
      <h1>Anectode with most votes</h1>
      <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
    </div>
  );
};

export default App;
