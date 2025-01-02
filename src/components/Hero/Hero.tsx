import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function Hero() {
  return (
    <section id="hero" className="hero section">
      <div className="container">
        <div className="row gy-4">
          <Box
            className="col-lg-6 order-lg-last"
            sx={{ "& img": { width: "100%", height: "auto" } }}
          >
            <Image
              src="/assets/img/hero-img2.png"
              className="img-fluid"
              alt=""
              width={100}
              height={100}
              quality={100}
              layout="responsive"
            />
          </Box>
          <div className="col-lg-6 d-flex flex-column justify-content-center">
            <h1>Empowering Minds, Step By Step with Lela Hub.</h1>
            <p>
              Transform your future with knowledge and skills from the experts
              at Lela Hub.
            </p>
            <p></p>
            <ul>
              <li>
                <i className="bi bi-check2"></i>{" "}
                <b>Learn from Industry Experts:</b>
                Gain insights and skills from top professionals and educators on
                Lela Hub.
              </li>
              <li>
                <i className="bi bi-check2"></i> <b>Flexible Learning:</b>{" "}
                Access courses on Lela Hub anytime, anywhere, and at your own
                pace.
              </li>
              <li>
                <i className="bi bi-check2"></i> <b>Interactive Content:</b>{" "}
                Engage with interactive lessons, quizzes, and hands-on projects
                on Lela Hub.
              </li>
            </ul>
            <p></p>
            <div className="d-flex">
              <a href="#about" className="btn-get-started">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
