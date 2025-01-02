"use client";

import { GET_PUBLISHED_COURSES } from "@/graphql/course/course";
import { formatCourseDuration } from "@/utils/helpers";
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
  Divider,
  Grid2,
  List,
  ListItem,
  ListItemText,
  Rating,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import { CourseCard } from "../Home/Courses/HomeCourses";

export default function Courses() {
  const { data, loading } = useQuery(GET_PUBLISHED_COURSES);
  const [selectedCategory, setSelectedCategory] = useState("Data science");

  const categories = [
    "Website development",
    "Data science",
    "Literature",
    "Languages",
    "Health & Fitness",
    "AI & Machine Learning",
    "Design",
    "Photography",
    "Finance",
    "Teaching",
    "Music",
  ];
  return (
    <>
      <div
        id="courses"
        className="courses-area section-padding40 fix section  light-background"
        // style={{ marginTop: "40px" }}
      >
        <div className="container section-title" data-aos="fade-up">
          {/* <h2> Courses For you</h2> */}
          <p>
            {/* Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
            consectetur velit */}
          </p>
        </div>
        <div className="container">
          <Box display="flex" sx={{ bgcolor: "#f5f5f5", height: "75vh" }}>
            {/* Sidebar */}
            <Box
              sx={{
                width: "250px",
                bgcolor: "#e0e0e0",
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                overflow: "auto",
              }}
            >
              <List>
                {categories.map((category) => (
                  <ListItem
                    key={category}
                    // button
                    onClick={() => setSelectedCategory(category)}
                    sx={{
                      bgcolor:
                        selectedCategory === category ? "#ffffff" : "inherit",
                      color: selectedCategory === category ? "#2962ff" : "#000",
                      borderRadius: "8px",
                      mb: 1,
                      "&:hover": {
                        bgcolor: "#d6d6d6",
                      },
                    }}
                  >
                    <ListItemText primary={category} />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Content Area */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                // flexDirection: "column",
                // justifyContent: "center",
                // alignItems: "center",
                bgcolor: "#ffffff",
                p: 1,

                height: "100%",
                overflow: "auto",
              }}
            >
              {loading ? (
                <Box
                  height={"100%"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Grid2 container spacing={2}>
                    {[...Array(8).keys()].map((n) => (
                      <Grid2 key={n} size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                        <CourseCardSkeleton />
                      </Grid2>
                    ))}
                  </Grid2>
                </Box>
              ) : (
                <Grid2 container spacing={2}>
                  {data?.getPublishedCourses?.map((course: any) => (
                    <Grid2
                      key={course?.id}
                      size={{ xs: 12, sm: 12, md: 6, lg: 4 }}
                    >
                      <CourseCard course={course} />
                    </Grid2>
                  ))}
                </Grid2>
              )}
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
}

export const CourseCardSkeleton = () => {
  return (
    <Box
      sx={{
        mt: 2,
        width: "100%",
        padding: 2,

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
      {/* Top Image Section */}
      <Skeleton variant="rectangular" width="100%" height={180} />

      {/* Course Title */}
      <Box sx={{ marginTop: 2 }}>
        <Skeleton variant="text" width="100%" height={32} />
      </Box>

      {/* Instructor */}
      <Box sx={{ marginTop: 1 }}>
        <Skeleton variant="text" width="50%" height={24} />
      </Box>

      {/* Icons Section */}
      <Box
        sx={{ marginTop: 2, display: "flex", justifyContent: "space-between" }}
      >
        <Skeleton variant="text" width={50} height={20} />
        <Skeleton variant="text" width={50} height={20} />
        <Skeleton variant="text" width={50} height={20} />
        <Skeleton variant="text" width={50} height={20} />
      </Box>

      {/* Rating and Price */}
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Skeleton variant="text" width={50} height={20} />
        <Skeleton variant="text" width={60} height={30} />
      </Box>

      {/* Button */}
      <Box sx={{ marginTop: 2 }}>
        <Skeleton variant="rectangular" width="100%" height={40} />
      </Box>
    </Box>
  );
};
