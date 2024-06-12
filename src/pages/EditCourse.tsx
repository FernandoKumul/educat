import { useParams } from "react-router-dom";

const EditCourse = () => {
  const { courseId } = useParams()

  return (
    <div className="min-h-screen">
      <h1>{courseId}</h1>
    </div>
  );
}

export default EditCourse;