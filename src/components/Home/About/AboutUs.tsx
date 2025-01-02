import React from "react";

export default function AboutUs() {
  return (
    <section
      className="about-area3 fix .section"
      // style={{ overflow: "hidden" }}
    >
      <div className="container section-title" data-aos="fade-up">
        <h2>About Us</h2>
        <p>
          Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
          consectetur velit
        </p>
      </div>
      <div className="support-wrapper align-items-center">
        <div className="right-content3" data-aos="fade-up" data-aos-delay="100">
          {/* <!-- img --> */}
          <div className="right-img">
            <img src="assets/img/about3.png" alt="" />
          </div>
        </div>
        <div className="left-content3" data-aos="fade-up" data-aos-delay="150">
          {/* <!-- section ti ttle --> */}
          <div className="section-tittle section-tittle2 mb-20">
            <div className="front-text">
              <h2 className="">Learner outcomes on courses you will take</h2>
            </div>
          </div>
          <div className="single-features">
            <div className="features-icon">
              <img src="assets/img/icon/right-icon.svg" alt="" />
            </div>
            <div className="features-caption">
              <p>
                Techniques to engage effectively with vulnerable children and
                young people.
              </p>
            </div>
          </div>
          <div className="single-features">
            <div className="features-icon">
              <img src="assets/img/icon/right-icon.svg" alt="" />
            </div>
            <div className="features-caption">
              <p>
                Join millions of people from around the world learning together.
              </p>
            </div>
          </div>
          <div className="single-features">
            <div className="features-icon">
              <img src="assets/img/icon/right-icon.svg" alt="" />
            </div>
            <div className="features-caption">
              <p>
                Join millions of people from around the world learning together.
                Online learning is as easy and natural.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
