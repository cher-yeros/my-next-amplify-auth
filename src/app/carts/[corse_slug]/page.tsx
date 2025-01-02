import Courses from "@/components/Courses/Courses";

// export async function generateStaticParams() {
//   // Replace with real data fetch, e.g., from an API or database
//   const courses = [
//     { course_id: "1", course_slug: "nextjs-course" },
//     { course_id: "2", course_slug: "react-course" },
//     // Add more course details as needed
//   ];

//   // Return the array of course ID and slug combinations
//   return courses.map((course) => ({
//     course_id: course.course_id,
//     course_slug: course.course_slug,
//   }));
// }

export default function page({ params }: { params: any }) {
  return <Courses />;
}
