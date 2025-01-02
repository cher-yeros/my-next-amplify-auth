import { Box } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Hero1() {
  return (
    <div
      id="hero"
      className="hero section"
      style={{
        // background: "white",
        // background:
        //   "linear-gradient(106.38deg, #00BEFA -1.49%, #015FEA 57.14%), #015FEA",
        // background: linear-gradient(106.38deg, #00BEFA -1.49%, #015FEA 57.14%), #015FEA;

        background: "url(/assets/img/hero-img4.png)",
        backgroundRepeat: "no-repeat",
        width: "100%",
        // left: 0,
        // border: "2px solid blue",
        backgroundSize: "cover",
        backgroundPosition: "center",
        // right: "-10rem",

        position: "relative",
        minHeight: "100vh",
      }}
    >
      <div className="container" style={{ height: "100%" }}>
        <div className="row gy-4" style={{ height: "100%" }}>
          <Box
            className="col-lg-7 order-lg-last"
            sx={{
              left: 0,

              "& img": {
                position: "absolute",
                top: 0,
                // top: "50%",
                right: "-10rem",
                // transform: "translateY(-50%)",
                height: "100%!important",
                width: "auto!important",
                // border: 5,
                // borderColor: "green",
              },
            }}
          >
            {/* <Image
              src={"/assets/img/hero-img4.png"}
              className="img-fluid"
              alt=""
              width={100}
              height={100}
              quality={100}
              layout="responsive"
            /> */}
          </Box>
          <div
            className="col-lg-5 col-md-12 d-flex flex-column justify-content-center"
            style={{ position: "relative" }}
          >
            <div
              style={{
                position: "absolute",
                // width: "570px",
                // height: "213px",
                // left: "167px",
                // top: "386px",
                zIndex: 100,
              }}
            >
              <h1
                data-aos="fade-down"
                style={{
                  textTransform: "uppercase",
                  fontStyle: "normal",
                  fontWeight: 900,
                  fontSize: "4rem",
                  lineHeight: "60px",
                  color: "#000",
                }}
              >
                Empowering Minds, Step By Step with Lela Hub.
              </h1>
              <p
                data-aos="fade-up"
                style={{
                  marginTop: "1rem",
                  fontWeight: 500,
                  fontSize: "22.3375px",
                  lineHeight: "23px",
                  // color: "#E1E1E1",
                  color: "#5F5F5F",
                }}
              >
                Transform your future with knowledge and skills from the experts
                at Lela Hub.
              </p>

              <div className="d-flex btn-wrapper">
                <Link
                  data-aos="fade-up"
                  data-aos-delay="200"
                  href="/login"
                  className="btn-get-started"
                  style={{
                    marginTop: "2rem",

                    color: "#FFFFFF",
                    borderRadius: "29px",
                    fontWeight: 500,
                    fontSize: "20px",
                    lineHeight: "18px",
                    textAlign: "center",
                    background: "#0D6EFC",
                    padding: "15px 28px 16px 28px",
                  }}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}
