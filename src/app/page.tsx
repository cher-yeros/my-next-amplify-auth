import Hero from "@/components/Hero/Hero";
import Hero1 from "@/components/Hero/Hero1";
import AboutUs from "@/components/Home/About/AboutUs";
import CourseCategories from "@/components/Home/Course Categories/CourseCategories";
import HomeCourses from "@/components/Home/Courses/HomeCourses";
import FAQ from "@/components/Home/FAQ/FAQ";
import Footer from "@/components/Home/Footer/Footer";
import Teachers from "@/components/Home/Teachers/Teachers";

export default function Home() {
  return (
    <main className="main">
      <Hero1 />
      {/* <Hero /> */}

      <HomeCourses />

      <AboutUs />

      <CourseCategories />

      <Teachers />

      <FAQ />

      <Footer />
    </main>
  );
}
