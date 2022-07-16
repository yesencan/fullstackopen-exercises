const Course = ({ course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
      <ul>
        {course.parts.map((part) => <li key={part.id}>{part.name} {part.exercises}</li>)}
      </ul>
      <p><strong>total of {course.parts.reduce((total, cur) => total + cur.exercises, 0)} exercises</strong></p>
    </div>

  );
};

export default Course