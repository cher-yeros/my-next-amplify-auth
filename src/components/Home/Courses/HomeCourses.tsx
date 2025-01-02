"use client";
import { CourseCardSkeleton } from "@/components/Courses/Courses";
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
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function HomeCourses() {
  const { data, loading } = useQuery(GET_PUBLISHED_COURSES);

  return (
    <>
      <div
        id="courses"
        className="courses-area section-padding40 fix section  light-background"
      >
        <div className="container section-title" data-aos="fade-up">
          <h2>Featured Courses</h2>
          <p>
            Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
            consectetur velit
          </p>
        </div>
        <div className="container">
          <Grid2 container spacing={2}>
            {loading ? (
              <Box
                height={"100%"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Grid2 container spacing={2}>
                  {[...Array(4).keys()].map((n) => (
                    <Grid2 key={n} size={{ xs: 12, sm: 12, md: 6, lg: 4 }}>
                      <CourseCardSkeleton />
                    </Grid2>
                  ))}
                </Grid2>
              </Box>
            ) : (
              data?.getPublishedCourses?.map((course: any, i: number) => (
                <Grid2
                  data-aos="fade-up"
                  data-aos-delay={100 * i}
                  key={course?.id}
                  size={{ xs: 12, sm: 12, md: 6, lg: 4 }}
                >
                  <CourseCard course={course} isBestSeller={true} />
                </Grid2>
              ))
            )}
          </Grid2>
        </div>
      </div>
    </>
  );
}

interface Course {
  id: number;
  title: string;
  thumbnail_image: string;
  instructor_full_name: string;
  number_of_lessons: number;
  duration: number;
  level: string;
  language: string;
  rating: number;
  price: number;
}

interface CourseCardProps {
  course: Course;
  // formatCourseDuration: (duration: number) => string;
  isBestSeller?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isBestSeller = false,
}) => {
  return (
    <Box
      mt={2}
      sx={{
        background: "white",
        boxShadow: "0px 6px 6px 0px rgba(2, 25, 65, 0.08)",
        borderRadius: 2,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {isBestSeller && (
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
      )}

      <Box sx={{ "& img": { height: "auto", width: "100%" } }}>
        <img src={course.thumbnail_image} alt={course.title} />
      </Box>

      <Box px={2} py={1} pb={2}>
        <Typography
          sx={{
            fontWeight: "bold",
            // color: "#324594",
            color: "black",
            fontSize: "1.2rem",
          }}
        >
          {course.title}
        </Typography>
        <Typography sx={{ fontSize: ".75rem", color: "GrayText" }}>
          Instructor:{" "}
          <Typography
            sx={{ fontSize: ".75rem", fontWeight: "bold", display: "inline" }}
          >
            {course.instructor_full_name}
          </Typography>
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {[
            {
              label: "Lessons",
              icon: (
                <PlayCircleOutlineOutlined
                  sx={{ fontSize: ".9rem", color: "GrayText" }}
                />
              ),
              value: course.number_of_lessons,
            },
            {
              label: "Duration",
              icon: (
                <AccessTime sx={{ fontSize: ".9rem", color: "GrayText" }} />
              ),
              value: formatCourseDuration(course.duration),
            },
            {
              label: "Skill Level",
              icon: (
                <LocalLibraryOutlined
                  sx={{ fontSize: ".9rem", color: "GrayText" }}
                />
              ),
              value: course.level,
            },
            {
              label: "Language",
              icon: (
                <LanguageOutlined
                  sx={{ fontSize: ".9rem", color: "GrayText" }}
                />
              ),
              value: course.language,
            },
          ].map(({ label, icon, value }, index) => (
            <Box key={index} sx={{ flex: 1, border: 0 }}>
              <Typography sx={{ color: "GrayText", fontSize: ".7rem" }}>
                {label}
              </Typography>
              <Stack direction="row" alignItems="center" spacing={0.3} mt={0.2}>
                {icon}
                <Typography sx={{ fontWeight: "bold", fontSize: ".7rem" }}>
                  {value}
                </Typography>
              </Stack>
            </Box>
          ))}
        </Stack>

        <Divider sx={{ my: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack>
            <Rating
              value={course.rating || 1}
              readOnly
              size="small"
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "#015FEA",
                },
              }}
            />
            <Typography sx={{ color: "GrayText", fontSize: ".9rem" }}>
              ({course.rating || "1.0"}) Ratings
            </Typography>
          </Stack>

          <Stack alignItems="flex-end" spacing={0}>
            <Typography
              sx={{
                fontSize: "1.3rem",
                fontWeight: "bold",
                lineHeight: 1,
                // color: "#4255a4",
                color: "#015FEA",
              }}
            >
              {course.price} ETB
            </Typography>
            <Typography
              sx={{
                color: "GrayText",
                textDecoration: "line-through",
                fontSize: ".9rem",
              }}
            >
              {/* Add original price here if available */}
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ my: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={1}
        >
          <Link
            href={{
              pathname: `/courses/${course.title
                .toLowerCase()
                .replace(/ /g, "-")}`,
              query: { q: course.id },
            }}
            style={{ flex: 1 }}
          >
            <Stack direction="row">
              <Button
                variant="contained"
                sx={{ flex: 1, backgroundColor: "#0d6efd" }}
              >
                Buy Course
              </Button>
            </Stack>
          </Link>
        </Stack>
      </Box>
    </Box>
  );
};
