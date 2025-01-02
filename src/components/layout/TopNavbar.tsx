import React from "react";

export default function TopNavbar() {
  return (
    <div className="container-fluid topbar px-0 px-lg-4 bg-light py-2 d-none d-lg-block">
      <div className="container">
        <div className="row gx-0 align-items-center">
          <div className="col-lg-8 text-center text-lg-start mb-lg-0">
            <div className="d-flex flex-wrap">
              <div className="border-end border-primary pe-3">
                <a href="#" className="text-muted small">
                  <i
                    className="fas fa-map-marker-alt text-primary me-2"
                    style={{ fontFamily: '"Font Awesome 5 Free"!important' }}
                  ></i>
                  Find A Location
                </a>
              </div>
              <div className="ps-3">
                <a href="mailto:example@gmail.com" className="text-muted small">
                  <i
                    className="fas fa-envelope text-primary me-2"
                    style={{ fontFamily: '"Font Awesome 5 Free"!important' }}
                  ></i>
                  info@lelahub.com
                </a>

                <a
                  href="tel:0900000000"
                  className="text-muted small"
                  style={{ paddingLeft: "2rem" }}
                >
                  <i
                    className="fas fa-phone text-primary me-2"
                    style={{ fontFamily: '"Font Awesome 5 Free"!important' }}
                  ></i>
                  + 251 456 789 01
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 text-center text-lg-end">
            <div className="d-flex justify-content-end">
              <div className="d-flex border-end border-primary pe-3">
                <a className="btn p-0 text-primary me-3" href="#">
                  <i
                    className="fab fa-facebook-f"
                    style={{ fontFamily: '"Font Awesome 5 Brands"!important' }}
                  ></i>
                </a>
                <a className="btn p-0 text-primary me-3" href="#">
                  <i
                    className="fab fa-twitter"
                    style={{ fontFamily: '"Font Awesome 5 Brands"!important' }}
                  ></i>
                </a>
                <a className="btn p-0 text-primary me-3" href="#">
                  <i
                    className="fab fa-instagram"
                    style={{ fontFamily: '"Font Awesome 5 Brands"!important' }}
                  ></i>
                </a>
                <a className="btn p-0 text-primary me-0" href="#">
                  <i
                    className="fab fa-linkedin-in"
                    style={{ fontFamily: '"Font Awesome 5 Brands"!important' }}
                  ></i>
                </a>
              </div>
              <div className="dropdown ms-3">
                <a
                  href="#"
                  className="dropdown-toggle text-dark"
                  data-bs-toggle="dropdown"
                >
                  <small>
                    <i
                      className="fas fa-globe-europe text-primary me-2"
                      style={{
                        fontFamily: '"Font Awesome 5 free"!important',
                      }}
                    ></i>
                    English
                  </small>
                </a>
                <div className="dropdown-menu rounded">
                  <a href="#" className="dropdown-item">
                    English
                  </a>
                  <a href="#" className="dropdown-item">
                    አማርኛ
                  </a>
                  <a href="#" className="dropdown-item">
                    Afan Oromoo
                  </a>
                  <a href="#" className="dropdown-item">
                    ትግሪኛ
                  </a>
                  <a href="#" className="dropdown-item">
                    Somali
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
