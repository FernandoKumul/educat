import { useParams } from "react-router-dom";

const EditCourse = () => {
  const { courseId } = useParams()

  return (
    <h1>{courseId}</h1>
  );
}

export default EditCourse;