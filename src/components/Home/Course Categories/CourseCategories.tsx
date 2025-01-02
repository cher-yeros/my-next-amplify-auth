import React from "react";

export default function CourseCategories() {
  return (
    <section id="features" className="features section  light-background">
      {/* <!-- Section Title --> */}

      <div className="container section-title" data-aos="fade-up">
        <h2>Course Categories</h2>
        <p>
          Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
          consectetur velit
        </p>
      </div>

      {/* <!-- End Section Title --> */}

      <div className="container">
        <div className="row gy-4">
          {courseCategories4.map((category) => (
            <div
              key={category.label}
              className="col-lg-3 col-md-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="features-item">
                <i className={category.bsIcon} style={{ color: "#0d4fb1" }}></i>
                <h3>
                  <a href="" className="stretched-link">
                    {category.label}
                  </a>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const courseCategories4 = [
  {
    icon: "fas fa-laptop-code",
    bsIcon: "bi bi-laptop",
    label: "Web Development",
    color: "#ffbb2c",
  },
  {
    icon: "fas fa-chart-line",
    bsIcon: "bi bi-graph-up",
    label: "Data Science",
    color: "#5578ff",
  },
  {
    icon: "fas fa-language",
    bsIcon: "bi bi-translate",
    label: "Languages",
    color: "#e80368",
  },
  {
    icon: "fas fa-palette",
    bsIcon: "bi bi-palette",
    label: "Design",
    color: "#e361ff",
  },
  {
    icon: "fas fa-music",
    bsIcon: "bi bi-music-note",
    label: "Music",
    color: "#47aeff",
  },
  {
    icon: "fas fa-business-time",
    bsIcon: "bi bi-briefcase",
    label: "Business",
    color: "#11dbcf",
  },
  {
    icon: "fas fa-heartbeat",
    bsIcon: "bi bi-heart",
    label: "Health & Fitness",
    color: "#4233ff",
  },
  {
    icon: "fas fa-film",
    bsIcon: "bi bi-camera-reels",
    label: "Photography",
    color: "#ff5828",
  },
  {
    icon: "fas fa-book",
    bsIcon: "bi bi-book",
    label: "Literature",
    color: "#b2904f",
  },
  {
    icon: "fas fa-robot",
    bsIcon: "bi bi-robot",
    label: "AI & Machine Learning",
    color: "#b20969",
  },
  {
    icon: "fas fa-money-check-alt",
    bsIcon: "bi bi-cash-stack",
    label: "Finance",
    color: "#29cc61",
  },
  {
    icon: "fas fa-chalkboard-teacher",
    bsIcon: "bi bi-easel",
    label: "Teaching",
    color: "#ffbb2c",
  },
];
