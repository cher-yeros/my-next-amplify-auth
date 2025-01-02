"use client";

import { CourseCardSkeleton } from "@/components/Courses/Courses";
import { GET_MY_COURSES, GET_PUBLISHED_COURSES } from "@/graphql/course/course";
import { useAppSelector } from "@/redux/store";
import { useQuery } from "@apollo/client";
import {
  AccessTime,
  LanguageOutlined,
  LocalLibraryOutlined,
  PlayCircleOutlineOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid2,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

export default function WishList() {
  const { currentUser }: { currentUser: any } = useAppSelector(
    (state) => state.auth
  );

  const { data, loading } = useQuery(GET_MY_COURSES, {
    variables: {
      student_id: currentUser?.id,
    },
  });

  return (
    <>
      <div
        id="courses"
        className="courses-area section-padding40 fix section  light-background"
      >
        <div className="container section-title" data-aos="fade-up">
          <h2> My Wish List</h2>
          <p></p>
        </div>
        <div className="container">
          {loading ? (
            <Box
              height={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <Grid2 container spacing={2}>
                {[...Array(8).keys()].map((n) => (
                  <Grid2 key={n} size={{ xs: 12, sm: 12, md: 6, lg: 3 }}>
                    <CourseCardSkeleton />
                  </Grid2>
                ))}
              </Grid2>
            </Box>
          ) : (
            <Grid2 container spacing={2}>
              {data?.myCourses?.map((enrollment: any) => (
                <Grid2
                  key={enrollment?.id}
                  size={{ xs: 12, sm: 12, md: 6, lg: 3 }}
                >
                  <Box
                    mt={2}
                    sx={{
                      background: "white",
                      boxShadow: "0px 6px 6px 0px rgba(2, 25, 65, 0.08)",

                      border: 0,
                      borderColor: "divider",
                      borderRadius: 2,
                      flex: 1,
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: "15px",
                        left: "-40px",
                        backgroundColor: "#ff1744",
                        color: "#fff",
                        width: "150px",
                        height: "30px",
                        textAlign: "center",
                        transform: "rotate(-45deg)",
                        zIndex: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="body2">Best Seller</Typography>
                    </Box>

                    <Box
                      sx={{
                        height: "12rem",
                        // border: 1,
                        "& img": {
                          height: "100%",
                          width: "100%",
                        },
                      }}
                    >
                      <img src={enrollment?.course?.thumbnail_image} alt="" />
                    </Box>

                    <Box px={2} py={1} pb={2}>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          color: "#324594",
                          fontSize: "1.2rem",
                        }}
                      >
                        {enrollment?.course?.title}
                      </Typography>
                      <Typography sx={{ fontSize: ".7rem", color: "GrayText" }}>
                        Instructor : {enrollment?.course?.instructor_full_name}
                      </Typography>

                      <Divider sx={{ my: 1 }} />

                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Box
                          sx={{
                            flex: 0.77,
                            border: 0,
                          }}
                        >
                          <Typography
                            sx={{ color: "GrayText", fontSize: ".7rem" }}
                          >
                            {"Lessons"}
                          </Typography>
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            spacing={0.3}
                            mt={0.2}
                          >
                            {/* {icon} */}
                            <PlayCircleOutlineOutlined
                              sx={{ fontSize: ".9rem", color: "GrayText" }}
                            />
                            <Typography
                              sx={{ fontWeight: "bold", fontSize: ".7rem" }}
                            >
                              {enrollment?.course?.number_of_lessons}
                            </Typography>
                          </Stack>
                        </Box>

                        <Box
                          sx={{
                            flex: 1.2,
                            border: 0,
                          }}
                        >
                          <Typography
                            sx={{ color: "GrayText", fontSize: ".7rem" }}
                          >
                            {"Duration"}
                          </Typography>
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            spacing={0.3}
                            mt={0.2}
                          >
                            {/* {icon} */}
                            <AccessTime
                              sx={{
                                fontSize: ".9rem",
                                color: "GrayText",
                              }}
                            />
                            <Typography
                              sx={{ fontWeight: "bold", fontSize: ".7rem" }}
                            >
                              {/* {"56h 28m"} */}

                              {enrollment?.course?.number_of_lessons}
                            </Typography>
                          </Stack>
                        </Box>

                        <Box
                          sx={{
                            flex: 1.1,
                            border: 0,
                          }}
                        >
                          <Typography
                            sx={{ color: "GrayText", fontSize: ".7rem" }}
                          >
                            {"Skill Level"}
                          </Typography>
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            spacing={0.3}
                            mt={0.2}
                          >
                            {/* {icon} */}
                            <LocalLibraryOutlined
                              sx={{ fontSize: ".9rem", color: "GrayText" }}
                            />
                            <Typography
                              sx={{ fontWeight: "bold", fontSize: ".7rem" }}
                            >
                              {enrollment?.course?.level}
                            </Typography>
                          </Stack>
                        </Box>
                        <Box
                          sx={{
                            flex: 1,
                            border: 0,
                          }}
                        >
                          <Typography
                            sx={{ color: "GrayText", fontSize: ".7rem" }}
                          >
                            {"Language"}
                          </Typography>
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            spacing={0.3}
                            mt={0.2}
                          >
                            {/* {icon} */}
                            <LanguageOutlined
                              sx={{ fontSize: ".9rem", color: "GrayText" }}
                            />
                            <Typography
                              sx={{ fontWeight: "bold", fontSize: ".7rem" }}
                            >
                              {enrollment?.course?.language}
                            </Typography>
                          </Stack>
                        </Box>
                      </Stack>

                      <Divider sx={{ my: 1 }} />

                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                      >
                        <Stack>
                          <Rating value={4} readOnly size="small" />
                          <Typography
                            sx={{
                              color: "GrayText",
                              fontSize: ".9rem",
                            }}
                            //  color="textSecondary" fontSize={".9rem"}
                          >
                            ({enrollment?.course?.rating || "1.0"}) 0 Ratings
                          </Typography>
                        </Stack>

                        <Stack alignItems={"flex-end"} spacing={0}>
                          <Typography
                            sx={{
                              fontSize: "1.3rem",
                              fontWeight: "bold",
                              lineHeight: 1,
                              color: "#4255a4",
                            }}
                          >
                            {enrollment?.course?.price} ETB
                          </Typography>
                          <Typography
                            sx={{
                              color: "GrayText",
                              textDecoration: "line-through",
                              fontSize: ".9rem",
                            }}
                          >
                            {/* 2,500 ETB */}
                          </Typography>
                        </Stack>
                      </Stack>

                      <Divider sx={{ my: 1 }} />

                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        justifyContent={"space-between"}
                        mb={1}
                      >
                        <Link
                          href={{
                            pathname:
                              "/play/" +
                              // enrollment?.course?.id +
                              // "/" +
                              enrollment?.course?.title
                                ?.toLowerCase()
                                .replaceAll(" ", "-"),

                            query: {
                              q: enrollment?.course?.id,
                            },
                          }}
                          style={{ flex: 1 }}
                        >
                          <Stack direction={"row"}>
                            <Button
                              variant="contained"
                              sx={{ flex: 1, backgroundColor: "#0d6efd" }}
                            >
                              Continue Watching
                            </Button>
                          </Stack>
                        </Link>
                      </Stack>
                    </Box>
                  </Box>
                </Grid2>
              ))}
            </Grid2>
          )}
        </div>
      </div>
    </>
  );
}
