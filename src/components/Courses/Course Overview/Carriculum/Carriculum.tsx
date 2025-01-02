"use client";

import { CourseProgressStatus, LessonContentType } from "@/utils/enums";
import { formatCourseDuration } from "@/utils/helpers";
import { OperationVariables, QueryResult } from "@apollo/client";
import {
  ArticleOutlined,
  CheckCircle,
  ExpandMore,
  PlayCircleOutlineOutlined,
  QuizOutlined,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid2,
  LinearProgress,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export default function Carriculum({
  carriculum,
  enrolllment,
  selectedLesson,
  setSelectedLesson,
  expandedList,
  setExpandedList,
}: {
  carriculum: QueryResult<any, OperationVariables>;
  enrolllment: QueryResult<any, OperationVariables>;
  selectedLesson: any;
  setSelectedLesson: Dispatch<SetStateAction<any>>;
  expandedList: number[];
  setExpandedList: Dispatch<SetStateAction<number[]>>;
}) {
  return (
    <Grid2
      border={0}
      size={{ xs: 12, md: 3.7 }}
      height={"100%"}
      sx={{
        borderLeft: 1,
        borderColor: "divider",
        position: "fixed",
        right: 0,

        pr: "1.2rem",
        width: "100%",
      }}
    >
      {carriculum.loading ? (
        <Box px={2} pt={2} sx={{ marginBottom: 2 }}>
          <Typography variant="h6">
            <Skeleton width="60%" />
          </Typography>
          <Skeleton width="100%" height={10} sx={{ marginTop: 1 }} />
        </Box>
      ) : (
        <Box height={"4rem"} mb={1}>
          <Stack
            direction={"row"}
            py={2}
            px={2}
            justifyContent={"space-between"}
          >
            <Typography fontSize={"1.2rem"} fontWeight={"bold"} color="#052f6b">
              {enrolllment.data?.getEnrollment?.progress + " % completed "}
            </Typography>
            <Typography fontSize={"1.2rem"} fontWeight={"bold"} color="#052f6b">
              {formatCourseDuration(
                enrolllment.data?.getEnrollment?.watched_duration
              ) + " viewed"}
            </Typography>
          </Stack>

          <Stack px={2}>
            <LinearProgress variant="determinate" value={70} />
          </Stack>
        </Box>
      )}

      <Box border={1.5} borderColor={"#eaeaea"} />
      {carriculum.loading ? (
        <CourseCarriculumSkeleton />
      ) : (
        <Box
          height={"calc(100% - 5rem)"}
          border={0}
          overflow={"auto"}
          borderColor={"divider"}
          sx={{
            overflow: "auto",
            "& .MuiAccordionDetails-root": {
              p: 0,
            },
            "& .MuiPaper-root": {
              margin: "0!important",
              "& .MuiAccordionSummary-root.Mui-expanded": {
                backgroundColor: "#e8eef9",
                mb: 0,
              },
              "& .MuiAccordionSummary-content.Mui-expanded": {
                backgroundColor: "#e8eef9",
                // py: 1,
                margin: "12px 0",
              },
            },
          }}
        >
          {/* <CourseCarriculumSkeleton /> */}
          {carriculum.data?.getCourseCarriculumForPlayer?.map(
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
                expanded={expandedList.includes(chapter?.id)}
                onChange={() => {
                  if (expandedList.includes(chapter?.id)) {
                    setExpandedList((oldList) => [
                      ...oldList?.filter((l) => l !== chapter?.id),
                    ]);
                  } else {
                    setExpandedList((oldList) => [...oldList, chapter?.id]);
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  sx={{ fontWeight: "bold", color: "#052f6b", py: 1 }}
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
                        sx={{
                          cursor: "pointer",
                          background:
                            lesson?.id === selectedLesson?.id
                              ? "#e0ebff"
                              : "none",
                          "&:hover": {
                            background: "#e0ebff",
                          },
                        }}
                        onClick={() => setSelectedLesson(lesson)}
                      >
                        <Box
                          sx={{
                            height: "2.5rem",
                            width: "2.5rem",
                            background:
                              lesson?.id === selectedLesson?.id
                                ? "#034cb34d"
                                : "#034cb317",

                            borderRadius: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {lesson?.content_type === LessonContentType.QUIZ ? (
                            <QuizOutlined
                              sx={{
                                fontSize: "1.5rem",
                                color: "GrayText",
                              }}
                            />
                          ) : lesson?.content_type ===
                            LessonContentType.ARTICLE ? (
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
                          <Stack
                            direction={"row"}
                            alignItems={"center"}
                            spacing={0.5}
                          >
                            {lesson?.courseProgress?.status ===
                              CourseProgressStatus.COMPLETED && (
                              <CheckCircle
                                sx={{
                                  color: "#1f50ae",
                                  fontSize: "1.2rem",
                                }}
                              />
                            )}

                            <Typography>
                              Lesson {lesson.order} : {lesson.title}
                            </Typography>
                          </Stack>
                          <Typography variant="caption">
                            {lesson?.content_type}

                            {lesson?.content_type === LessonContentType.VIDEO
                              ? " : " + lesson?.duration + " min"
                              : ""}
                          </Typography>
                        </Stack>
                      </Stack>
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            )
          )}
        </Box>
      )}
    </Grid2>
  );
}

const CourseCarriculumSkeleton = () => {
  return (
    <Box px={2}>
      {/* Skeleton for progress */}

      {/* Skeleton for chapters */}
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((chapter) => (
        <Box key={chapter} sx={{ marginBottom: 2 }}>
          <Skeleton width="60%" height={30} />
          <Box sx={{ marginTop: 1, paddingLeft: 2 }}>
            {[1, 2, 3].map((lesson) => (
              <Box
                key={lesson}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: 1,
                }}
              >
                <Skeleton
                  variant="circular"
                  width={30}
                  height={30}
                  sx={{ marginRight: 2 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Skeleton width="80%" height={15} />
                  <Skeleton width="40%" height={10} />
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};
