import React from "react";

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  );
};

const Content = (props) => {
  return props.parts.map((part) => (
    <Part key={part.id} part={part.name} exercises={part.exercises} />
  ));
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  );
};

const Total = ({ parts }) => {
  return (
    <>
      <p style={{ fontWeight: "bold" }}>
        Total of{" "}
        {parts.reduce((a, c) => {
          return a + c.exercises;
        }, 0)}{" "}
        excercises
      </p>
    </>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default Course