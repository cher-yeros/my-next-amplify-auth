"use client";

import {
  BUY_COURSE,
  GET_COURSE_BASICS_FOR_PUBLIC,
  GET_COURSE_INSTRUCTOR_FOR_PUBLIC,
  GET_COURSE_OVERVIEW1_FOR_PUBLIC,
  GET_COURSE_OVERVIEW_FOR_PUBLIC,
} from "@/graphql/course/course";
import { useAppSelector } from "@/redux/store";
import { formatCourseDuration } from "@/utils/helpers";
import { useMutation, useQuery } from "@apollo/client";
import {
  AccessTime,
  ArticleOutlined,
  Circle,
  CodeOutlined,
  CollectionsBookmarkOutlined,
  EmojiEventsOutlined,
  ExpandMore,
  Favorite,
  Language,
  LocalLibraryOutlined,
  MenuBookOutlined,
  MoreVert,
  PeopleOutlineOutlined,
  Person2Outlined,
  PlayCircleOutlineOutlined,
  QuizOutlined,
  SchoolOutlined,
  Share,
  Stairs,
  StarOutlineOutlined,
  SupportOutlined,
  TranslateOutlined,
  VerifiedOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid2,
  IconButton,
  Rating,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactNode } from "react";

export default function CourseOverview() {
  const router = useRouter();

  const { currentUser }: { currentUser: any } = useAppSelector(
    (state) => state.auth
  );

  const searchParams = useSearchParams();

  const course_id = searchParams.get("q")!;

  const { data: basicsData, loading: basicsLoading } = useQuery(
    GET_COURSE_BASICS_FOR_PUBLIC,
    {
      variables: { id: parseInt(course_id) },
    }
  );

  const { data: overviewData, loading: overviewLoading } = useQuery(
    GET_COURSE_OVERVIEW_FOR_PUBLIC,
    {
      variables: { id: parseInt(course_id) },
    }
  );

  const { data: overview1Data, loading: overview1Loading } = useQuery(
    GET_COURSE_OVERVIEW1_FOR_PUBLIC,
    {
      variables: { id: parseInt(course_id) },
    }
  );

  const { data: instructorData, loading: instructorLoading } = useQuery(
    GET_COURSE_INSTRUCTOR_FOR_PUBLIC,
    {
      variables: { id: parseInt(course_id) },
    }
  );

  const [buyCourseMut, { loading: buyLoading }] = useMutation(BUY_COURSE);

  const buyCourse = async () => {
    if (currentUser?.id) {
      try {
        const data1 = await buyCourseMut({
          variables: {
            input: {
              course_id: parseInt(course_id),
              student_id: currentUser?.id,
            },
          },
        });

        console.log(data1);
        // router.push(data1?.buyCourse?.data?.checkout_url);
        window.open(data1?.data?.buyCourse?.data?.checkout_url, "_blank");
      } catch (error) {
        // toast.erorr(error?.message)
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <Box px={5} py={3} height={"100%"} style={{ marginTop: "80px" }}>
      {false ? (
        <Box
          height={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid2 container spacing={4}>
          <Grid2 size={{ xs: 12, md: 8 }}>
            {basicsLoading ? (
              <CourseVideoSkeleton />
            ) : (
              <Box>
                <Typography
                  sx={{ fontWeight: "bold", fontSize: "2.5rem", mb: 2 }}
                >
                  {basicsData?.getCourseBasicsForPublic?.title}
                </Typography>
                <Box
                  sx={{
                    width: "100%",
                    borderRadius: 3,
                    overflow: "hidden",
                    "& video": {
                      width: "100%",
                      height: "auto",
                    },
                  }}
                >
                  <video controls>
                    <source
                      src={basicsData?.getCourseBasicsForPublic?.trailer}
                    />
                  </video>
                  {/* <img
                alt="Course Thumbnail"
                src={
                  "https://img.freepik.com/free-photo/young-girl-with-backpack-her-shoulders-created-with-generative-ai-technology_185193-161972.jpg?t=st=1726949309~exp=1726952909~hmac=97dc0a3c0c3b8c22b80774a775037534e71a665010ebd1bb3e1b01068bbcb601&w=1480"
                }
                width={100}
                height={100}
                quality={100}
                priority
              /> */}
                </Box>
              </Box>
            )}

            {overview1Loading ? (
              <CourseOverview2Skeleton />
            ) : (
              <Box>
                <Stack
                  mt={2}
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    <Avatar sx={{ width: "3.5rem", height: "3.5rem" }}>
                      <img
                        src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
                        alt="instructor avatar"
                        width={"auto"}
                        height={"100%"}
                      />
                    </Avatar>

                    <Stack>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {
                          overview1Data?.getCourseOverview1ForPublic
                            ?.instructor_full_name
                        }
                      </Typography>
                      <Typography sx={{ color: "GrayText" }}>
                        Instructructor
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    <Stack
                      direction={"row"}
                      spacing={0.5}
                      alignItems={"center"}
                    >
                      <IconButton size="small" color="error">
                        <Favorite />
                      </IconButton>

                      <Typography fontWeight={"bold"} fontSize={".85rem"}>
                        0
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      spacing={0.5}
                      alignItems={"center"}
                    >
                      <IconButton size="small" color="primary">
                        <Share />
                      </IconButton>

                      <Typography fontWeight={"bold"} fontSize={".85rem"}>
                        Share
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      spacing={0.5}
                      alignItems={"center"}
                    >
                      <IconButton size="small" color="secondary">
                        <MoreVert />
                      </IconButton>

                      {/* <Typography fontWeight={"bold"} fontSize={'1.52rem'} fontSize={'.58rem'}>Share</Typography> */}
                    </Stack>
                  </Stack>
                </Stack>
                <Box mt={3}>
                  <Typography fontWeight={"bold"} fontSize={"1.25rem"}>
                    Course Detail
                  </Typography>{" "}
                  <Stack direction={"row"} mt={1} spacing={2}>
                    <CourseDetailInfoCard
                      title="Chapters"
                      icon={
                        <PlayCircleOutlineOutlined
                          sx={{ fontSize: "1.35rem" }}
                        />
                      }
                      value={
                        overview1Data?.getCourseOverview1ForPublic
                          ?.number_of_chapters
                      }
                    />
                    <CourseDetailInfoCard
                      title="Lessons"
                      icon={
                        <PlayCircleOutlineOutlined
                          sx={{ fontSize: "1.35rem" }}
                        />
                      }
                      value={
                        overview1Data?.getCourseOverview1ForPublic
                          ?.number_of_lessons
                      }
                    />
                    <CourseDetailInfoCard
                      title="Duration"
                      icon={<AccessTime sx={{ fontSize: "1.35rem" }} />}
                      value={
                        overview1Data?.getCourseOverview1ForPublic?.duration
                      }
                    />
                    <CourseDetailInfoCard
                      title="Skill Level"
                      icon={<Stairs sx={{ fontSize: "1.35rem" }} />}
                      value={overview1Data?.getCourseOverview1ForPublic?.level}
                    />
                    <CourseDetailInfoCard
                      title="Language"
                      icon={<Language sx={{ fontSize: "1.35rem" }} />}
                      value={
                        overview1Data?.getCourseOverview1ForPublic?.language
                      }
                    />
                  </Stack>
                </Box>{" "}
                <Box mt={3}>
                  <Typography fontWeight={"bold"} fontSize={"1.25rem"}>
                    Description
                  </Typography>

                  <Typography sx={{ color: "GrayText" }}>
                    {/* <pre> */}
                    {overview1Data?.getCourseOverview1ForPublic?.description}
                    {/* </pre> */}
                  </Typography>
                  <a href="#">Read More</a>
                </Box>
                <Box mt={3}>
                  <Typography fontWeight={"bold"} fontSize={"1.25rem"}>
                    Course Requirements
                  </Typography>

                  <Stack mt={1} pl={3} spacing={0.5}>
                    {overview1Data?.getCourseOverview1ForPublic?.requirements.map(
                      (req: any) => (
                        <Stack
                          key={req.description}
                          direction={"row"}
                          alignItems={"center"}
                          spacing={1}
                        >
                          <Circle
                            sx={{ fontSize: ".7rem", color: "GrayText" }}
                          />
                          <Typography sx={{ color: "GrayText" }}>
                            {req.description}
                          </Typography>
                        </Stack>
                      )
                    )}
                  </Stack>
                </Box>
                <Box mt={3}>
                  <Typography fontWeight={"bold"} fontSize={"1.25rem"}>
                    Course Outline
                  </Typography>

                  <Box
                    mt={1}
                    border={1}
                    borderRadius={2}
                    borderColor={"divider"}
                    sx={{
                      overflow: "hidden",
                      "& .MuiAccordionDetails-root": {
                        p: 0,
                      },
                      "& .MuiPaper-root": {
                        margin: 0,
                        "& .MuiAccordionSummary-root.Mui-expanded": {
                          backgroundColor: "#e8eef9",
                        },
                        //   "& .MuiAccordionSummary-content.Mui-expanded": {
                        //     backgroundColor: "none",
                        //   },
                      },
                    }}
                  >
                    {overview1Data?.getCourseOverview1ForPublic.chapters.map(
                      (chapter: any, i: number) => (
                        <Accordion
                          key={chapter.id}
                          sx={{
                            mb: 2,
                            boxShadow: "none",
                            // border: 1,
                            // borderRadius: 1,
                            // borderColor: "divider",
                          }}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            sx={{ fontWeight: "bold", color: "#052f6b" }}
                          >
                            Chapter {chapter?.order} : {chapter?.title}
                          </AccordionSummary>
                          <AccordionDetails>
                            {chapter.lessons.map((lesson: any) => {
                              return (
                                <Stack
                                  direction={"row"}
                                  key={lesson.id}
                                  spacing={1.5}
                                  borderTop={1}
                                  borderColor={"divider"}
                                  py={1.5}
                                  pl={2}
                                >
                                  <Box
                                    sx={{
                                      height: "2.5rem",
                                      width: "2.5rem",
                                      background:
                                        lesson.content_type === "Quiz"
                                          ? "#b3030317"
                                          : lesson?.content_type === "Article"
                                          ? "#03b36217"
                                          : "#034cb317",
                                      borderRadius: 1,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    {lesson?.content_type === "Quiz" ? (
                                      <QuizOutlined
                                        sx={{
                                          fontSize: "1.5rem",
                                          color: "GrayText",
                                        }}
                                      />
                                    ) : lesson?.content_type === "Article" ? (
                                      <ArticleOutlined
                                        sx={{
                                          fontSize: "1.5rem",
                                          color: "GrayText",
                                        }}
                                      />
                                    ) : (
                                      <PlayCircleOutlineOutlined
                                        sx={{
                                          fontSize: "1.5rem",
                                          color: "GrayText",
                                        }}
                                      />
                                    )}
                                  </Box>

                                  <Stack spacing={0}>
                                    <Typography>
                                      Lesson {lesson.order} : {lesson.title}
                                    </Typography>
                                    <Typography variant="caption">
                                      {lesson.type === "Quiz"
                                        ? "Quiz"
                                        : lesson?.type === "Article"
                                        ? "Article"
                                        : "Video"}
                                      {" : "}
                                      {lesson.duration || 0}
                                    </Typography>
                                  </Stack>
                                  {/* <Typography variant="body1">
              {lesson.content}
            </Typography> */}
                                </Stack>
                              );
                            })}
                          </AccordionDetails>
                        </Accordion>
                      )
                    )}
                  </Box>
                </Box>
              </Box>
            )}
          </Grid2>

          <Grid2 size={{ xs: 12, md: 4 }}>
            {overviewLoading ? (
              <CourseDetailSkeleton />
            ) : (
              <Box
                sx={{
                  background: "white",
                  boxShadow: "0px 2px 20px rgba(1, 41, 112, 0.1)",
                  px: 2,
                  py: 1,
                  border: 0,
                  borderColor: "divider",
                  borderRadius: 3,
                  flex: 1,
                }}
              >
                <Typography sx={{ fontSize: ".8rem", color: "GrayText" }}>
                  Full Course
                </Typography>

                <Stack
                  direction={"row"}
                  mt={".25rem"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <Typography sx={{ fontSize: "2rem", fontWeight: "bold" }}>
                      {overviewData?.getCourseOverviewForPublic?.price} ETB
                    </Typography>
                    <Typography
                      sx={{ color: "GrayText", textDecoration: "line-through" }}
                    >
                      {/* 2,500 ETB */}
                    </Typography>
                  </Stack>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    spacing={1}
                    sx={{
                      backgroundColor: "#e1dcff",
                      px: 0.5,
                      borderRadius: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#6850ff",
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                      }}
                    >
                      60%
                    </Typography>
                    <Typography sx={{ color: "#6850ff" }}>OFF</Typography>
                  </Stack>
                </Stack>

                <Divider sx={{ my: 0.5 }} />
                <Box mt={1}>
                  <Typography fontWeight={"bold"} fontSize={"1.25rem"}>
                    Course Includes
                  </Typography>

                  <Stack mt={1} spacing={0.5}>
                    {courseDetails(
                      overviewData?.getCourseOverviewForPublic
                    )?.map((detail) => (
                      <CourseDetailInfoCard2
                        key={detail.title}
                        icon={detail.icon}
                        value={
                          detail.title + (detail.value && " : " + detail.value)
                        }
                      />
                    ))}
                  </Stack>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Stack direction={"row"} spacing={1}>
                  <Button
                    // className="btn btn-primary rounded-pill py-2 px-4 ms-3 flex-shrink-0"
                    variant="outlined"
                    sx={{ flex: 1 }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    sx={{ flex: 1 }}
                    // className="btn btn-primary rounded-pill py-2 px-4 ms-3 flex-shrink-0"
                    variant="outlined"
                  >
                    Bookmark
                  </Button>{" "}
                  {/* <Button
                  sx={{ flex: 1 }}
                  // className="btn btn-primary rounded-pill py-2 px-4 ms-3 flex-shrink-0"
                  variant="contained"
                >
                  Buy Now
                </Button> */}
                </Stack>

                <Stack direction={"row"} spacing={1} mt={1}>
                  <Button
                    // className="btn btn-primary rounded-pill py-2 px-4 ms-3 flex-shrink-0"
                    variant="contained"
                    style={{ flex: 1 }}
                    onClick={buyCourse}
                  >
                    {buyLoading ? "Loading..." : " Buy Now"}
                  </Button>
                </Stack>

                <Typography
                  sx={{ mt: 2, fontSize: ".8rem", color: "GrayText" }}
                >
                  30 day money back guarantee
                </Typography>
              </Box>
            )}

            {overviewLoading ? (
              <CourseRatingSkeleton />
            ) : (
              <Box
                mt={2}
                sx={{
                  background: "white",
                  boxShadow: "0px 2px 20px rgba(1, 41, 112, 0.1)",
                  px: 2,
                  py: 1,
                  border: 0,
                  borderColor: "divider",
                  borderRadius: 3,
                  flex: 1,
                }}
              >
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    <Box
                      sx={{
                        width: "3.5rem",
                        height: "3.5rem",
                        fontSize: "3.25rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      🤩
                    </Box>

                    <Stack>
                      <Typography sx={{ fontWeight: "bold" }}>
                        Rating
                      </Typography>
                      <Typography sx={{ color: "GrayText" }}>
                        0 Students
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    <Stack>
                      <Rating
                        value={
                          overviewData?.getCourseOverviewForPublic?.rating | 0
                        }
                        readOnly
                      />

                      <Typography sx={{ color: "GrayText" }}>
                        {overviewData?.getCourseOverviewForPublic?.rating ||
                          0.0 + " "}
                        ( 0 ratings)
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Box>
            )}

            {instructorLoading ? (
              <InstructorSkeleton />
            ) : (
              <Box
                mt={2}
                sx={{
                  background: "white",
                  boxShadow: "0px 2px 20px rgba(1, 41, 112, 0.1)",
                  px: 2,
                  py: 1,
                  border: 0,
                  borderColor: "divider",
                  borderRadius: 3,
                  flex: 1,
                }}
              >
                <Typography sx={{ fontSize: ".8rem", color: "GrayText" }}>
                  About Instructor
                </Typography>

                <Stack
                  direction={"row"}
                  spacing={2}
                  alignItems={"center"}
                  mt={1}
                >
                  <Avatar sx={{ width: "3.5rem", height: "3.5rem" }}>
                    <img
                      src="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg"
                      alt="instructor avatar"
                      width={"auto"}
                      height={"100%"}
                    />
                  </Avatar>

                  <Stack>
                    <Typography sx={{ fontWeight: "bold" }}>
                      {instructorData?.getCourseInstructorForPublic?.name}
                    </Typography>
                    <Typography sx={{ color: "GrayText" }}>
                      Instructructor
                    </Typography>
                  </Stack>
                </Stack>

                <Box mt={1}>
                  <Typography fontWeight={"bold"} fontSize={"1.25rem"}>
                    About
                  </Typography>
                  <Typography sx={{ color: "GrayText" }}>
                    {instructorData?.getCourseInstructorForPublic?.bio?.substring(
                      0,
                      300
                    )}
                    <Button>Read More</Button>
                  </Typography>
                </Box>

                <Divider sx={{ my: 0.5 }} />
                <Box mt={1}>
                  <Typography fontWeight={"bold"} fontSize={"1.25rem"}>
                    Instructor Informations
                  </Typography>

                  <Stack mt={1} spacing={0.5}>
                    {instructorDetails(
                      instructorData?.getCourseInstructorForPublic
                    ).map((detail) => (
                      <CourseDetailInfoCard2
                        key={detail.title}
                        icon={detail.icon}
                        value={
                          detail.title + (detail.value && " : " + detail.value)
                        }
                      />
                    ))}
                  </Stack>
                </Box>
              </Box>
            )}
          </Grid2>
        </Grid2>
      )}
    </Box>
  );
}

const MyCard = () => {
  return <Box></Box>;
};

export const CourseDetailInfoCard = ({
  title,
  icon,
  value,
}: {
  title: string;
  icon: ReactNode;
  value: string;
}) => {
  return (
    <Box
      sx={{
        background: "white",
        boxShadow: "0px 2px 20px rgba(1, 41, 112, 0.1)",
        px: 2,
        py: 1,
        border: 0,
        borderColor: "divider",
        borderRadius: 1,
        flex: 1,
      }}
    >
      <Typography sx={{ color: "GrayText" }}>{title}</Typography>
      <Stack direction={"row"} alignItems={"center"} spacing={1} mt={0.35}>
        {icon}
        {/* <PlayCircleOutlineOutlined sx={{ fontSize: "1.35rem" }} /> */}
        <Typography sx={{ fontWeight: "bold" }}>{value}</Typography>
      </Stack>
    </Box>
  );
};

export const CourseDetailInfoCard2 = ({
  icon,
  value,
}: {
  icon: ReactNode;
  value: string;
}) => (
  <Stack direction={"row"} alignItems={"center"} spacing={1} mt={0.35}>
    {icon}
    <Typography sx={{}}>{value}</Typography>
  </Stack>
);

export const courseDetails = (course: any) => [
  {
    attributes: "Chapters",
    value: course?.number_of_chapters,
    icon: (
      <PlayCircleOutlineOutlined
        sx={{ color: "GrayText", fontSize: "1.25rem" }}
      />
    ),
    title: "Chapters",
  },
  {
    attributes: "Lessons",
    value: course?.number_of_lessons,
    icon: (
      <PlayCircleOutlineOutlined
        sx={{ color: "GrayText", fontSize: "1.25rem" }}
      />
    ),
    title: "Lessons",
  },
  {
    attributes: "Duration",
    value: formatCourseDuration(course?.duration) || 0,
    icon: <AccessTime sx={{ color: "GrayText", fontSize: "1.3rem" }} />,
    title: "Duration",
  },

  {
    attributes: "Level",
    value: course?.level,
    icon: (
      <LocalLibraryOutlined sx={{ color: "GrayText", fontSize: "1.3rem" }} />
    ),
    title: "Level",
  },
  {
    attributes: "Language",
    value: course?.language,
    icon: <Language sx={{ color: "GrayText", fontSize: "1.3rem" }} />,
    title: "Language",
  },
  //   {
  //     attributes: "Lesson Note",
  //     value: "አማርኛ",
  //     icon: <Description sx={{ color: "GrayText", fontSize: "1.3rem" }} />,
  //     title: "Lesson Note",
  //   },

  {
    attributes: "Articles",
    value: "1",
    icon: (
      <CollectionsBookmarkOutlined
        sx={{ color: "GrayText", fontSize: "1.3rem" }}
      />
    ),
    title: "Articles",
  },
  {
    attributes: "Quiz",
    value: "2",
    icon: <QuizOutlined sx={{ color: "GrayText", fontSize: "1.3rem" }} />,
    title: "Quiz",
  },
  //   {
  //     attributes: "Access on",
  //     value: "Mobile, Desktop, TV",
  //     icon: <Devices sx={{ color: "GrayText", fontSize: "1.3rem" }} />,
  //     title: "Access on Devices",
  //   },
  {
    attributes: "Community Access",
    value: "",
    icon: (
      <PeopleOutlineOutlined sx={{ color: "GrayText", fontSize: "1.3rem" }} />
    ),
    title: "Lifetime Access",
  },
  {
    attributes: "Certificate",
    value: "",
    icon: (
      <EmojiEventsOutlined sx={{ color: "GrayText", fontSize: "1.3rem" }} />
    ),
    title: "Certificate of Completion",
  },
];

export const instructorDetails = (instructor: any) => [
  {
    attributes: "Name",
    value: instructor?.name,
    icon: <Person2Outlined sx={{ color: "GrayText", fontSize: "1.3rem" }} />,
    title: "Instructor Name",
  },
  {
    attributes: "Experience",
    value: instructor?.experience_years,
    icon: (
      <WorkOutlineOutlined sx={{ color: "GrayText", fontSize: "1.3rem" }} />
    ),
    title: "Experience",
  },
  {
    attributes: "Expertise",
    value: instructor?.expertise,
    icon: <CodeOutlined sx={{ color: "GrayText", fontSize: "1.3rem" }} />,
    title: "Expertise",
  },
  {
    attributes: "Languages",
    value: instructor?.languages_spoken,
    icon: <TranslateOutlined sx={{ color: "GrayText", fontSize: "1.3rem" }} />,
    title: "Languages Spoken",
  },
  {
    attributes: "Teaching Style",
    value: instructor?.teaching_style,
    icon: <SchoolOutlined sx={{ color: "GrayText", fontSize: "1.3rem" }} />,
    title: "Teaching Style",
  },
  {
    attributes: "Courses Taught",
    value: instructor?.courses_taught,
    icon: <MenuBookOutlined sx={{ color: "GrayText", fontSize: "1.3rem" }} />,
    title: "Courses Taught",
  },
  {
    attributes: "Rating",
    value: instructor?.rating,
    icon: (
      <StarOutlineOutlined sx={{ color: "GrayText", fontSize: "1.3rem" }} />
    ),
    title: "Instructor Rating",
  },
  {
    attributes: "Support",
    value: instructor?.expertise,
    icon: <SupportOutlined sx={{ color: "GrayText", fontSize: "1.3rem" }} />,
    title: "Support",
  },
  {
    attributes: "Certifications",
    value: instructor?.certifications,
    icon: <VerifiedOutlined sx={{ color: "GrayText", fontSize: "1.3rem" }} />,
    title: "Certifications",
  },
  {
    attributes: "Achievements",
    value: instructor?.achievements,
    icon: (
      <EmojiEventsOutlined sx={{ color: "GrayText", fontSize: "1.3rem" }} />
    ),
    title: "Achievements",
  },
];

const CourseDetailSkeleton = () => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: 2,
        border: "1px solid #ddd",
        borderRadius: 3,
        // boxShadow: "0 2px 8px rgba(0,0,0,0.1)",

        background: "white",
        boxShadow: "0px 2px 20px rgba(1, 41, 112, 0.1)",
        // px: 2,
        // py: 1,
        // border: 0,
        // borderColor: "divider",
        // borderRadius: 3,
        flex: 1,
      }}
    >
      {/* Price Section */}
      <Skeleton variant="text" width="40%" height={40} />

      {/* Discount Section */}
      <Skeleton
        variant="text"
        width="30%"
        height={25}
        sx={{ float: "right" }}
      />

      {/* Course Includes Title */}
      <Skeleton variant="text" width="60%" height={32} />

      {/* Course Includes Items */}
      <Box sx={{ marginTop: 2 }}>
        {[...Array(8)].map((_, index) => (
          <Skeleton
            key={index}
            variant="text"
            width="90%"
            height={24}
            sx={{ marginBottom: 1 }}
          />
        ))}
      </Box>

      {/* Button Section */}
      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}
      >
        <Skeleton variant="rectangular" width="48%" height={40} />
        <Skeleton variant="rectangular" width="48%" height={40} />
      </Box>

      {/* Buy Now Button */}
      <Box sx={{ marginTop: 2 }}>
        <Skeleton variant="rectangular" width="100%" height={50} />
      </Box>

      {/* Guarantee Text */}
      <Box sx={{ marginTop: 1 }}>
        <Skeleton variant="text" width="90%" height={24} />
      </Box>
    </Box>
  );
};

const CourseRatingSkeleton = () => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: 2,
        mt: 2,
        border: "1px solid #ddd",
        borderRadius: 3,
        // boxShadow: "0 2px 8px rgba(0,0,0,0.1)",

        background: "white",
        boxShadow: "0px 2px 20px rgba(1, 41, 112, 0.1)",
        // px: 2,
        // py: 1,
        // border: 0,
        // borderColor: "divider",
        // borderRadius: 3,
        flex: 1,
      }}
    >
      {/* Rating Section */}
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Skeleton variant="text" width="40%" height={24} />
        <Skeleton variant="text" width="30%" height={24} />
      </Box>
    </Box>
  );
};

const CourseVideoSkeleton = () => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: 2,
        // borderRadius: 4,
        // backgroundColor: "#f5f5f5",

        // width: "100%",
        // padding: 2,
        border: "1px solid #ddd",
        borderRadius: 3,
        // boxShadow: "0 2px 8px rgba(0,0,0,0.1)",

        background: "white",
        boxShadow: "0px 2px 20px rgba(1, 41, 112, 0.1)",
        // px: 2,
        // py: 1,
        // border: 0,
        // borderColor: "divider",
        // borderRadius: 3,
        flex: 1,
      }}
    >
      {/* Course Title */}
      <Skeleton variant="text" width="40%" height={60} />

      {/* Video Player Placeholder */}
      <Box sx={{ marginTop: 2 }}>
        <Skeleton variant="rectangular" width="100%" height={500} />
      </Box>
    </Box>
  );
};

const InstructorSkeleton = () => {
  return (
    <Box
      mt={2}
      sx={{
        background: "white",
        boxShadow: "0px 2px 20px rgba(1, 41, 112, 0.1)",
        px: 2,
        py: 1,
        border: 0,
        borderColor: "divider",
        borderRadius: 3,
        flex: 1,
        width: "100%",
      }}
      // sx={{ padding: 2, maxWidth: 400 }}
    >
      {/* Image and Name */}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <Skeleton variant="circular" width={60} height={60} />
        <Box sx={{ marginLeft: 2 }}>
          <Skeleton width={140} height={20} />
          <Skeleton width={100} height={20} />
        </Box>
      </Box>

      {/* About section */}
      <Box marginBottom={2}>
        <Typography variant="h6">
          <Skeleton width={100} />
        </Typography>
        <Skeleton width="100%" height={30} />
        <Skeleton width="100%" height={30} />
        <Skeleton width="100%" height={30} />
        <Skeleton width="100%" height={30} />
        <Skeleton width="100%" height={30} />
        <Skeleton width="60%" />
      </Box>

      {/* Instructor Information */}
      <Typography variant="h6">
        <Skeleton width={180} />
      </Typography>
      <Box>
        {Array.from(new Array(8)).map((_, index) => (
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
            key={index}
          >
            <Skeleton
              variant="rectangular"
              width={20}
              height={20}
              sx={{ marginRight: 1 }}
            />
            <Skeleton width={250} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

const CourseOverview2Skeleton = () => {
  return (
    <Box sx={{ padding: 4 }}>
      {/* Instructor Information Skeleton */}
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
        <Skeleton
          variant="circular"
          width={56}
          height={56}
          sx={{ marginRight: 2 }}
        />
        <Box sx={{ flex: 1 }}>
          <Skeleton width="50%" height={30} />
          <Skeleton width="30%" height={20} />
        </Box>
        <Box sx={{ marginLeft: "auto", display: "flex", gap: 1 }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
      </Box>

      {/* Course Detail Section Skeleton */}
      <Grid2 container spacing={2} sx={{ marginBottom: 3 }}>
        {[1, 2, 3, 4].map((item) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={item}>
            <Skeleton
              variant="rectangular"
              width="100%"
              height={80}
              sx={{ borderRadius: 2 }}
            />
          </Grid2>
        ))}
      </Grid2>

      {/* Course Description Skeleton */}
      <Box sx={{ marginBottom: 3 }}>
        <Skeleton width="30%" height={30} />
        <Skeleton width="100%" height={20} />
        <Skeleton width="95%" height={20} />
        <Skeleton width="90%" height={20} />
        <Skeleton width="80%" height={20} />
        <Skeleton width="90%" height={20} />
        <Skeleton width="95%" height={20} />
        <Skeleton width="90%" height={20} />
        <Skeleton width="80%" height={20} />
      </Box>

      {/* Course Requirements Skeleton */}
      <Box sx={{ marginBottom: 3 }}>
        <Skeleton width="30%" height={30} />
        {[1, 2, 3, 4].map((item) => (
          <Skeleton key={item} width="80%" height={20} sx={{ marginY: 1 }} />
        ))}
      </Box>

      {/* Course Outline Skeleton */}
      <Skeleton width="30%" height={30} sx={{ marginBottom: 2 }} />
      <Skeleton
        variant="rectangular"
        width="100%"
        height={40}
        sx={{ marginBottom: 2 }}
      />
      <Skeleton variant="rectangular" width="100%" height={40} />
    </Box>
  );
};
