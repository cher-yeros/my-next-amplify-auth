"use client";

import {
  CREATE_COURSE_REVIEW,
  GET_COURSE_ANNOUNCEMENTS_FOR_PLAYER,
  GET_COURSE_CARRICULUM_FOR_PLAYER,
  GET_COURSE_ENROLLMENT_FOR_PLAYER,
  GET_COURSE_NOTES_FOR_PLAYER,
  GET_COURSE_OVERVIEW_FOR_PLAYER,
  GET_COURSE_REVIEWS_FOR_PLAYER,
} from "@/graphql/course/course";
import { useAppSelector } from "@/redux/store";
import { formatCourseDuration } from "@/utils/helpers";
import { useMutation, useQuery } from "@apollo/client";
import {
  AccessTime,
  ArrowDropDown,
  Circle,
  Language,
  People,
  PlayCircleOutlineOutlined,
  Stairs,
  Star,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  CircularProgress,
  CircularProgressProps,
  Divider,
  Grid2,
  Rating,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { lazy, Suspense, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Carriculum from "./Course Overview/Carriculum/Carriculum";
import CourseAnnouncement from "./Course Overview/Course Announcement/CourseAnnouncement";
import CourseReviews from "./Course Overview/Course Reviews/CourseReviews";
import CourseNotesForPlayer from "./Course Overview/Notes/CourseNotes";
import QAForPlayer from "./Course Overview/QA/QAForPlayer";
import {
  CourseDetailInfoCard,
  CourseDetailInfoCard2,
  courseDetails,
  instructorDetails,
} from "./CourseOverview";

const CoursePlayer = lazy(() => import("../Player/CoursePlayer"));

export default function PlayCourse() {
  const { currentUser } = useAppSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState("Course Overview");
  const [rearrangeStep, setRearrangeStep] = useState(true);

  const [selectedLesson, setSelectedLesson] = useState<any>({});
  const [expandedList, setExpandedList] = useState<number[]>([]);

  // For Video Player

  const [playing, setPlaying] = useState<boolean>(true);
  const [played, setPlayed] = useState<number>(0);

  const searchParams = useSearchParams();

  const course_id = searchParams.get("q")!;

  const enrolllmentQuery = useQuery(GET_COURSE_ENROLLMENT_FOR_PLAYER, {
    variables: { course_id: parseInt(course_id) },
  });

  const { data: overviewData, loading: overviewLoading } = useQuery(
    GET_COURSE_OVERVIEW_FOR_PLAYER,
    {
      variables: { id: parseInt(course_id) },
    }
  );

  const carriculumQuery = useQuery(GET_COURSE_CARRICULUM_FOR_PLAYER, {
    variables: { id: parseInt(course_id) },
  });

  const notesQuery = useQuery(GET_COURSE_NOTES_FOR_PLAYER, {
    variables: { lesson_id: selectedLesson?.id, student_id: currentUser?.id },
  });

  const announcementQuery = useQuery(GET_COURSE_ANNOUNCEMENTS_FOR_PLAYER, {
    variables: { id: parseInt(course_id) },
  });

  const reviewsQuery = useQuery(GET_COURSE_REVIEWS_FOR_PLAYER, {
    variables: { course_id: parseInt(course_id) },
  });

  const playNext = () => {
    setRearrangeStep(false);

    carriculumQuery.refetch();
    enrolllmentQuery.refetch();

    const currentChapterIndex =
      carriculumQuery.data?.getCourseCarriculumForPlayer?.findIndex(
        (ch: any) => ch?.id === selectedLesson?.chapter_id
      );

    const currentChapter =
      carriculumQuery.data?.getCourseCarriculumForPlayer[currentChapterIndex];

    // Find the next lesson in the current chapter
    const nextLessonInChapter = currentChapter?.lessons?.find(
      (lesson: any) => lesson?.order === selectedLesson?.order + 1
    );

    if (nextLessonInChapter) {
      // If a next lesson exists in the current chapter, set it as the selected lesson
      setSelectedLesson(nextLessonInChapter);
    } else {
      // If no next lesson in the current chapter, move to the next chapter
      const nextChapter =
        carriculumQuery.data?.getCourseCarriculumForPlayer[
          currentChapterIndex + 1
        ];

      if (nextChapter && nextChapter?.lessons?.length > 0) {
        setExpandedList((oldList) => [...oldList, nextChapter?.id]);
        // Set the first lesson of the next chapter as the selected lesson
        setSelectedLesson(nextChapter.lessons[0]);
      } else {
        setExpandedList((oldList) => [
          ...oldList,
          carriculumQuery.data?.getCourseCarriculumForPlayer[0]?.id,
        ]);

        setSelectedLesson(
          carriculumQuery.data?.getCourseCarriculumForPlayer[0]?.lessons[0]
        );
        // If no more chapters or lessons, consider marking the course as completed or showing a message
        console.log("Course completed!");
        alert("Course completed !");
      }
    }
  };

  const getCurrentChapter = () => {
    const currentChapterIndex =
      carriculumQuery.data?.getCourseCarriculumForPlayer?.findIndex(
        (ch: any) => ch?.id === selectedLesson?.chapter_id
      );

    const currentChapter =
      carriculumQuery.data?.getCourseCarriculumForPlayer[currentChapterIndex];

    return currentChapter;
  };

  useEffect(() => {
    if (rearrangeStep) {
      if (enrolllmentQuery.data?.getEnrollment) {
        const ch = carriculumQuery.data?.getCourseCarriculumForPlayer?.find(
          (ch: any) =>
            ch?.id ===
            enrolllmentQuery.data?.getEnrollment?.last_accessed_chapter_id
        );

        const ls = ch?.lessons?.find(
          (l: any) =>
            l?.id ===
            enrolllmentQuery.data?.getEnrollment?.last_accessed_lesson_id
        );

        if (ls?.id) {
          setExpandedList((oldList) => [...oldList, ch?.id]);
          setSelectedLesson(ls);
        } else {
          setExpandedList((oldList) => [
            ...oldList,
            carriculumQuery.data?.getCourseCarriculumForPlayer[0]?.id,
          ]);
          setSelectedLesson(
            carriculumQuery.data?.getCourseCarriculumForPlayer[0]?.lessons[0]
          );
        }
      }
    } else {
      setRearrangeStep(true);
    }
  }, [enrolllmentQuery.data, carriculumQuery.data]);

  return (
    <Box
      sx={{
        position: "fixed",
        height: "100vh",
        width: "100%",
        overflow: "auto",
        top: 0,
        background: "white",
        zIndex: 10000000,
      }}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ height: "70px", background: "#00033f", px: 2 }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          height={"100%"}
          spacing={5}
        >
          <Box
            sx={{
              height: "70%",
              "& img": {
                height: "100%",
                width: "auto",
              },
            }}
          >
            <Link href="/" className="navbar-brand p-0">
              {/* <h1 className="text-primary mb-0">
                <i className="fab fa-slack me-2"></i> LelaHub
              </h1> */}
              <Image
                src="/assets/img/logo/lela_logo_white.png"
                alt="Logo"
                width={100}
                height={100}
              />
            </Link>
          </Box>

          <Box
            sx={{ width: "1px", height: "50%", background: "#949494" }}
          ></Box>
          <Typography
            sx={{
              color: "#e1e1e1",
              fontWeight: "bold",
              fontSize: "1.3rem",
            }}
          >
            {overviewData?.getCourseOverviewForPlayer?.title}
          </Typography>
        </Stack>

        <Stack
          direction={"row"}
          alignItems={"center"}
          height={"100%"}
          spacing={5}
        >
          <ResponsiveDialog
            course_id={parseInt(course_id)}
            my_review={overviewData?.getMyReview}
          />

          <Stack
            direction={"row"}
            alignItems={"center"}
            spacing={1}
            sx={{
              color: "white",
              cursor: "pointer",
              // border: 1,
              borderColor: "whitesmoke",
              py: 1,
              px: 1,
            }}
          >
            <CircularProgressWithLabel
              variant="determinate"
              value={enrolllmentQuery.data?.getEnrollment?.progress || 0}
              color="inherit"
            />
            <Typography>Your Progress</Typography>
            <ArrowDropDown />
          </Stack>
        </Stack>
      </Stack>

      <Box
        sx={{
          background: "whitesmoke",
          boxShadow: "0px 2px 20px rgba(1, 41, 112, 0.1)",
          border: 0,
          borderColor: "divider",
          borderRadius: 0,
          flex: 1,
          height: "calc(100% - 70px)",
          overflow: "auto",
        }}
      >
        <Grid2 container spacing={0} height={"100%"} position={"relative"}>
          <Grid2 size={{ xs: 12, md: 8.3 }} height={"100%"} pb={2} border={0}>
            <Box
              sx={{
                height: "35rem",
                background: "lightgray",
              }}
            >
              <Suspense
                fallback={
                  <Box
                    height={"100%"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <CircularProgress />
                  </Box>
                }
              >
                <CoursePlayer
                  lesson={selectedLesson}
                  enrollment={enrolllmentQuery.data?.getEnrollment}
                  playNext={playNext}
                  refetchCarriculum={carriculumQuery.refetch}
                  enrollmentRefetch={enrolllmentQuery.refetch}
                  playing={playing}
                  played={played}
                  setPlayed={setPlayed}
                  setPlaying={setPlaying}
                />
              </Suspense>
            </Box>

            <Box mt={0} px={0}>
              <Grid2 container spacing={4}>
                <Grid2 size={{ xs: 12, md: 12 }}>
                  <Box
                    pt={2}
                    mt={0}
                    sx={{
                      background: "white",
                      boxShadow: "0px 2px 20px rgba(1, 41, 112, 0.1)",
                      px: 2,
                      py: 1,
                      border: 0,
                      borderColor: "divider",
                      borderRadius: 1,
                      flex: 1,
                      minHeight: "50rem",
                    }}
                  >
                    <Stack direction={"row"} spacing={2}>
                      {tabs.map((tab) => (
                        <Button
                          key={tab.name}
                          sx={{
                            flex: 1,
                            py: 0.5,
                            fontWeight:
                              tab.name === activeTab ? "bold" : "normal",
                            //   textDecoration: tab.name === activeTab && "underline",
                            borderBottom: (tab.name === activeTab ? 2 : 0) || 0,
                            borderRadius: 0,
                          }}
                          onClick={() => setActiveTab(tab.name)}
                        >
                          {tab.name}
                        </Button>
                      ))}
                    </Stack>

                    {activeTab === tabs[0].name &&
                      (overviewLoading ? (
                        <CourseOverviewSkeleton />
                      ) : (
                        <>
                          <Box mt={3}>
                            <Typography
                              fontWeight={"bold"}
                              fontSize={"1.25rem"}
                            >
                              Course Detail
                            </Typography>{" "}
                            <Stack direction={"row"} mt={1} spacing={2}>
                              <CourseDetailInfoCard
                                title="Rating"
                                icon={<Rating sx={{ fontSize: "1.35rem" }} />}
                                value={
                                  overviewData?.getCourseOverviewForPlayer
                                    ?.rating
                                }
                              />
                              <CourseDetailInfoCard
                                title="Students"
                                icon={<People sx={{ fontSize: "1.35rem" }} />}
                                value={
                                  overviewData?.getCourseOverviewForPlayer
                                    ?.students || 0
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
                                  overviewData?.getCourseOverviewForPlayer
                                    ?.number_of_lessons || 0
                                }
                              />
                              <CourseDetailInfoCard
                                title="Duration"
                                icon={
                                  <AccessTime sx={{ fontSize: "1.35rem" }} />
                                }
                                value={formatCourseDuration(
                                  overviewData?.getCourseOverviewForPlayer
                                    ?.duration
                                )}
                              />
                              <CourseDetailInfoCard
                                title="Skill Level"
                                icon={<Stairs sx={{ fontSize: "1.35rem" }} />}
                                value={
                                  overviewData?.getCourseOverviewForPlayer
                                    ?.level
                                }
                              />
                              <CourseDetailInfoCard
                                title="Language"
                                icon={<Language sx={{ fontSize: "1.35rem" }} />}
                                value={
                                  overviewData?.getCourseOverviewForPlayer
                                    ?.language
                                }
                              />
                            </Stack>
                          </Box>

                          <Box mt={3}>
                            <Typography
                              fontWeight={"bold"}
                              fontSize={"1.25rem"}
                            >
                              Description
                            </Typography>

                            <Typography sx={{ color: "GrayText" }}>
                              {
                                overviewData?.getCourseOverviewForPlayer
                                  ?.description
                              }
                            </Typography>
                            <a href="#">Read More</a>
                          </Box>

                          <Box mt={3}>
                            <Typography
                              fontWeight={"bold"}
                              fontSize={"1.25rem"}
                            >
                              Course Requirements
                            </Typography>

                            <Stack mt={1} pl={3} spacing={0.5}>
                              {overviewData?.getCourseOverviewForPlayer?.requirements?.map(
                                (req: any) => (
                                  <Stack
                                    key={req.description}
                                    direction={"row"}
                                    alignItems={"center"}
                                    spacing={1}
                                  >
                                    <Circle
                                      sx={{
                                        fontSize: ".7rem",
                                        color: "GrayText",
                                      }}
                                    />
                                    <Typography sx={{ color: "GrayText" }}>
                                      {req.description}
                                    </Typography>
                                  </Stack>
                                )
                              )}
                            </Stack>
                          </Box>

                          <Box mt={1}>
                            <Typography
                              fontWeight={"bold"}
                              fontSize={"1.25rem"}
                            >
                              Course Includes
                            </Typography>

                            <Stack mt={1} spacing={0.5}>
                              {courseDetails(
                                overviewData?.getCourseOverviewForPlayer
                              )?.map((detail) => (
                                <CourseDetailInfoCard2
                                  key={detail.title}
                                  icon={detail.icon}
                                  value={
                                    detail.title +
                                    (detail.value && " : " + detail.value)
                                  }
                                />
                              ))}
                            </Stack>
                          </Box>

                          <Box mt={2}>
                            <Typography
                              fontWeight={"bold"}
                              fontSize={"1.25rem"}
                            >
                              About Instructor
                            </Typography>

                            <Stack
                              direction={"row"}
                              spacing={2}
                              alignItems={"center"}
                              mt={1}
                            >
                              <Avatar
                                sx={{ width: "3.5rem", height: "3.5rem" }}
                              >
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
                                    overviewData?.getCourseOverviewForPlayer
                                      ?.instructor_full_name
                                  }
                                </Typography>
                                <Typography sx={{ color: "GrayText" }}>
                                  Instructructor
                                </Typography>
                              </Stack>
                            </Stack>

                            <Box mt={1}>
                              <Typography
                                fontWeight={"bold"}
                                fontSize={"1.25rem"}
                              >
                                About
                              </Typography>
                              <Typography sx={{ color: "GrayText" }}>
                                {
                                  overviewData?.getCourseOverviewForPlayer
                                    ?.instructor?.bio
                                }

                                <Button>Read More</Button>
                              </Typography>
                            </Box>

                            <Divider sx={{ my: 0.5 }} />
                            <Box mt={1}>
                              <Typography
                                fontWeight={"bold"}
                                fontSize={"1.25rem"}
                              >
                                Instructor Informations
                              </Typography>

                              <Stack mt={1} spacing={0.5}>
                                {instructorDetails(
                                  overviewData?.getCourseOverviewForPlayer
                                    ?.instructor
                                ).map((detail) => (
                                  <CourseDetailInfoCard2
                                    key={detail.title}
                                    icon={detail.icon}
                                    value={
                                      detail.title +
                                      (detail.value && " : " + detail.value)
                                    }
                                  />
                                ))}
                              </Stack>
                            </Box>
                          </Box>
                        </>
                      ))}

                    {activeTab === tabs[1].name && (
                      <QAForPlayer course_id={parseInt(course_id)} />
                    )}

                    {activeTab === tabs[2].name && (
                      <CourseNotesForPlayer
                        notesQuery={notesQuery}
                        course_id={parseInt(course_id)}
                        lesson={{
                          ...selectedLesson,
                          chapter: getCurrentChapter(),
                        }}
                        playing={playing}
                        played={played}
                        setPlayed={setPlayed}
                        setPlaying={setPlaying}
                      />
                    )}

                    {activeTab === tabs[3].name && (
                      <CourseAnnouncement announcement={announcementQuery} />
                    )}

                    {activeTab === tabs[4].name && (
                      <CourseReviews
                        course_id={parseInt(course_id)}
                        reviews={reviewsQuery}
                      />
                    )}
                  </Box>
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>

          <Carriculum
            enrolllment={enrolllmentQuery}
            carriculum={carriculumQuery}
            selectedLesson={selectedLesson}
            setSelectedLesson={setSelectedLesson}
            expandedList={expandedList}
            setExpandedList={setExpandedList}
          />
        </Grid2>
      </Box>
    </Box>
  );
}

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="caption"
          component="div"
          sx={{ color: "white" }}
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const tabs = [
  {
    name: "Course Overview",
  },
  {
    name: "Q&A",
  },
  {
    name: "Notes",
  },
  {
    name: "Announcements",
  },
  {
    name: "Reviews",
  },
];

const CourseOverviewSkeleton = () => {
  return (
    <Box sx={{ padding: 2 }}>
      {/* Course Detail Cards */}
      <Typography variant="h6">
        <Skeleton width={120} />
      </Typography>
      <Grid2 container spacing={2} sx={{ marginBottom: 2 }}>
        {Array.from(new Array(6)).map((_, index) => (
          <Grid2
            size={{
              xs: 12,
              sm: 6,
              md: 2,
            }}
            key={index}
          >
            <Skeleton
              variant="rectangular"
              height={80}
              sx={{ borderRadius: 2 }}
            />
          </Grid2>
        ))}
      </Grid2>

      {/* Description Section */}
      <Box marginBottom={2}>
        <Typography variant="h6">
          <Skeleton width={120} />
        </Typography>
        <Skeleton width="100%" height={30} />
        <Skeleton width="94%" height={30} />
        <Skeleton width="100%" height={30} />
        <Skeleton width="100%" height={30} />
        <Skeleton width="90%" height={30} />
        <Skeleton width="40%" />
      </Box>

      {/* Course Requirements Section */}
      <Typography variant="h6">
        <Skeleton width={200} />
      </Typography>

      {/* Course Includes */}
      <Box sx={{ marginTop: 2 }}>
        <Typography variant="h6">
          <Skeleton width={150} />
        </Typography>
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

      <Box mt={2}>
        {/* Header with Profile picture and instructor name */}
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: 3 }}>
          {/* Profile picture skeleton */}
          <Skeleton
            variant="circular"
            width={50}
            height={50}
            sx={{ marginRight: 2 }}
          />

          {/* Instructor name and title */}
          <Box>
            <Skeleton width={150} height={30} />
            <Skeleton width={100} height={20} />
          </Box>
        </Box>

        {/* About Section */}
        <Box sx={{ marginBottom: 4 }}>
          <Typography variant="h6">
            <Skeleton width="40%" />
          </Typography>

          {/* Skeleton for bio text */}
          <Skeleton width="100%" height={20} />
          <Skeleton width="95%" height={20} />
          <Skeleton width="90%" height={20} />
          <Skeleton width="85%" height={20} />
          <Skeleton width="80%" height={20} />
        </Box>

        {/* Instructor Informations Section */}
        <Typography variant="h6">
          <Skeleton width="40%" />
        </Typography>
        <Grid2 container spacing={2}>
          {/* Skeleton for each instructor information row */}
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid2 size={{ xs: 12 }} key={index}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {/* Icon Skeleton */}
                <Skeleton
                  variant="circular"
                  width={30}
                  height={30}
                  sx={{ marginRight: 2 }}
                />
                {/* Information text skeleton */}
                <Skeleton width="80%" height={20} />
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </Box>
    </Box>
  );
};

const CoursePlayerSkeleton = () => {
  return (
    <Box height={"100%"}>
      {/* Skeleton for video player */}
      <Skeleton variant="rectangular" width="100%" height={"90%"} />

      {/* Skeleton for video controls */}
      <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
        <Skeleton
          variant="circular"
          width={40}
          height={40}
          sx={{ marginRight: 2 }}
        />
        <Skeleton width="80%" height={10} />
        <Skeleton
          variant="rectangular"
          width={50}
          height={10}
          sx={{ marginLeft: 2 }}
        />
      </Box>
    </Box>
  );
};

export function ResponsiveDialog({
  course_id,
  my_review,
}: {
  course_id: number;
  my_review: any;
}) {
  const { currentUser } = useAppSelector((state) => state.auth);

  const [open, setOpen] = useState(false);

  // const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [createReview, { loading }] = useMutation(CREATE_COURSE_REVIEW);

  const myForm = useForm({
    mode: "all",
    // resolver: validator,
    defaultValues: {
      rating: 1,
      review_text: "",
    },
  });

  useEffect(() => {
    setHover(my_review?.rating);
    myForm.setValue("rating", my_review?.rating);
    myForm.setValue("review_text", my_review?.review_text);
  }, [my_review]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getLabelBasedOnRating = () => {
    switch (hover) {
      case 1:
        return "Awful, not what I expected at all";
        break;

      case 1.5:
        return "Awful / Poor";
        break;

      case 2:
        return "Poor, pretty disappointed";
        break;

      case 2.5:
        return "Poor / Average";
        break;

      case 3:
        return "Average, could be better";
        break;

      case 3.5:
        return "Average / Good";
        break;

      case 4:
        return "Good, what I expected";
        break;

      case 4.5:
        return "Good / Amazing";
        break;
      case 5:
        return "Amazing, above expectations!";
      default:
        return "Select Rating";
        break;
    }
  };

  const onSubmit = async () => {
    try {
      const { data } = await createReview({
        variables: {
          input: {
            course_id: course_id,
            student_id: currentUser?.id,
            rating: myForm.watch("rating"),
            review_text: myForm.watch("review_text"),
          },
        },
      });

      // refetch();
      handleClose();
      // myForm.reset();

      toast.success("Your Review is Successfully Submitted !", {
        autoClose: 500,
      });
    } catch (error: any) {
      toast.error(error.message, {
        autoClose: 500,
      });
    }
  };

  return (
    <>
      <ButtonBase
        sx={{
          color: "white",
          cursor: "pointer",
          // border: 1,
          borderColor: "whitesmoke",
          py: 1,
          px: 1,
          display: "flex",
          gap: 1,
          alignItems: "center",
          borderRadius: 1,
        }}
        onClick={handleClickOpen}
      >
        <Star />
        <Typography>Leave Rating</Typography>
      </ButtonBase>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{ zIndex: 1300000000 }}
        // maxWidth={"md"}
      >
        <DialogTitle id="responsive-dialog-title">
          {"How would you rate this course?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tell us about your own personal experience taking this course. Was
            it a good match for you?
          </DialogContentText>

          <Stack spacing={2} mt={3} alignItems={"center"}>
            <Stack spacing={2} alignItems={"center"}>
              <Typography fontWeight={"bold"}>
                {getLabelBasedOnRating()}
              </Typography>{" "}
              <Controller
                name="rating"
                control={myForm.control}
                render={({ field }) => {
                  const { value, onChange } = field;

                  return (
                    <Rating
                      sx={{ fontSize: "4rem" }}
                      precision={0.5}
                      value={value}
                      onChange={(e, newValue) => {
                        onChange(newValue);
                        // setValue(newValue || 0);
                        setHover(newValue || 0);
                      }}
                      onChangeActive={(event, newHover) => {
                        setHover(newHover);
                      }}
                      emptyIcon={
                        <Star style={{ opacity: 0.55 }} fontSize="inherit" />
                      }
                    />
                  );
                }}
              />
            </Stack>

            <TextField
              fullWidth
              placeholder="Write your review here"
              {...myForm.register("review_text")}
              multiline
              rows={4}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 2.75, pb: 2 }}>
          <Button variant="contained" autoFocus onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="contained"
            onClick={loading ? () => {} : onSubmit}
            autoFocus
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
