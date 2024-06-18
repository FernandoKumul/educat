import { IEditUnit } from "../interfaces/IEditCourse";

const units: IEditUnit[] = [
  {
    pkUnit: 1,
    fkCourse: 101,
    order: 1,
    title: "Introduction to Programming",
    lessons: [
      {
        pkLesson: 1,
        fkunit: 1,
        title: "What is Programming?",
        type: "video",
        videoUrl: "https://example.com/video1.mp4",
        text: null,
        timeDuration: 300,
        order: 1,
        cretionDate: "2024-06-13T12:00:00Z"
      },
      {
        pkLesson: 2,
        fkunit: 1,
        title: "Basic Concepts",
        type: "text",
        videoUrl: null,
        text: "Programming is the process of creating a set of instructions that tell a computer how to perform a task.",
        timeDuration: 5,
        order: 2,
        cretionDate: "2024-06-14T12:00:00Z"
      }
    ]
  },
  {
    pkUnit: 2,
    fkCourse: 101,
    order: 2,
    title: "Advanced Programming",
    lessons: [
      {
        pkLesson: 3,
        fkunit: 2,
        title: "Object-Oriented Programming",
        type: "video",
        videoUrl: "https://example.com/video2.mp4",
        text: null,
        timeDuration: 600,
        order: 1,
        cretionDate: "2024-06-15T12:00:00Z"
      },
      {
        pkLesson: 4,
        fkunit: 2,
        title: "Data Structures",
        type: "text",
        videoUrl: null,
        text: "Data structures are ways of organizing and storing data so that they can be accessed and modified efficiently.",
        timeDuration: 5,
        order: 2,
        cretionDate: "2024-06-16T12:00:00Z"
      }
    ]
  }
];

export default units;
