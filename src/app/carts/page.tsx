"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function MyCarts() {
  const [courses, setCourses] = useState([1, 2, 3, 4]);

  return (
    <div className="courses-area section-padding40 fix .section  light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>My Cart List</h2>
        <p>
          Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
          consectetur velit
        </p>
      </div>
      <div className="container">
        <div className="courses-actives">
          {courses.map((course) => (
            <div key={course} className="properties pb-20">
              <div className="properties__card">
                <div className="properties__img overlay1">
                  <a href="#">
                    <img
                      src="/assets/img/courses/img-school-1-min.jpg"
                      alt=""
                    />
                  </a>
                </div>
                <div className="properties__caption">
                  {/* <p>User Experience</p> */}
                  <h3>
                    <a href="#">Fundamental of UX for Application design</a>
                  </h3>
                  {/* <p>
                    The automated process all your website tasks. Discover tools
                    and techniques to engage effectively with vulnerable
                    children and young people.
                  </p> */}
                  {/* <div className="properties__footer d-flex justify-content-between align-items-center">
                    <div className="restaurant-name">
                      <div className="rating">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half"></i>
                      </div>
                      <p>
                        <span>(4.5)</span> based on 120
                      </p>
                    </div>
                    <div className="price">
                      <span>$135</span>
                    </div> 
                  </div>*/}
                  <Link
                    href="/courses/fundamental-of-ux-for-application-design"
                    className="border-btn border-btn2"
                  >
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
