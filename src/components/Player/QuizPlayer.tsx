import { GET_QUIZ_ATTEMPT, SAVE_QUIZ_ATTEMPTS } from "@/graphql/quiz/quiz";
import { AuthState } from "@/redux/slices/authSlice";
import { useAppSelector } from "@/redux/store";
import { QuizQuestionType } from "@/utils/enums";
import { useMutation, useQuery } from "@apollo/client";
import {
  ArrowBackIos,
  ArrowForwardIos,
  CheckCircle,
  Circle,
  Fullscreen,
  Replay,
  Settings,
  Subtitles,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  colors,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import MyToastContainer from "../layout/ToastContainerProvider";

export default function QuizPlayer({
  lesson,
  enrollment,
  refetchCarriculum,
  enrollmentRefetch,
  playNext,
}: {
  lesson: any;
  enrollment: any;
  refetchCarriculum: () => void;
  enrollmentRefetch: () => void;
  playNext: () => void;
}): React.ReactNode {
  const { currentUser, token, avatar }: AuthState = useAppSelector(
    (state) => state.auth
  );

  const [currentStep, setCurrentStep] = useState(0);

  const [quizAttempt, setQuizAttempt] = useState<any>(null);

  const [answers, setAnswers] = useState<{
    [questionID: number]: { answers: number[] };
  }>({});

  const [saveQuizAttempt, { loading, data }] = useMutation(SAVE_QUIZ_ATTEMPTS);
  const {
    data: quizAttemptData,
    loading: quizAttemptLoading,
    refetch: quizAttemptRefetch,
  } = useQuery(GET_QUIZ_ATTEMPT, {
    variables: {
      input: {
        enrollment_id: enrollment?.id,
        quiz_id: lesson?.quiz?.id,
        student_id: currentUser?.id,
      },
    },
  });

  useEffect(() => {
    if (quizAttemptData?.getQuizAttempt) {
      setQuizAttempt(quizAttemptData?.getQuizAttempt);
      setCurrentStep(lesson?.quiz?.questions?.length);
    }
  }, [quizAttemptData]);

  const validateSelection = () => {
    const questionID = lesson?.quiz?.questions[currentStep]?.id;
    return questionID && answers[questionID]?.answers.length > 0;
  };

  const getProgress = () => {
    const progress = (currentStep * 100) / lesson?.quiz?.questions?.length;

    return progress;
  };

  const handleNextClick = async () => {
    if (currentStep + 1 < lesson?.quiz?.questions?.length) {
      if (!validateSelection()) {
        toast.error("Please select an answer before proceeding.");
        return;
      }
      setCurrentStep((oldStep) => oldStep + 1);
    } else if (currentStep === lesson?.quiz?.questions?.length) {
      setCurrentStep(0);
      setAnswers({});
      setQuizAttempt(null);
    } else {
      const attemps = Object.keys(answers).map((key: any) => {
        return {
          questionID: parseInt(key),
          answers: answers[key].answers,
        };
      });

      try {
        // saveQuizAttempt;
        await saveQuizAttempt({
          variables: {
            input: {
              student_id: currentUser.id,
              quiz_id: lesson?.quiz?.id,
              enrollment_id: enrollment?.id,
              attempts: attemps,
            },
          },
        });

        refetchCarriculum();
        enrollmentRefetch();

        quizAttemptRefetch();

        setCurrentStep((oldStep) => oldStep + 1);
      } catch (error: any) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Box
      height={"35rem"}
      overflow={"auto"}
      p={2}
      px={4}
      sx={{
        background: "white",
        overflow: "auto",
      }}
    >
      <MyToastContainer />
      {quizAttemptLoading ? (
        <Box
          height={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography
            textAlign={"center"}
            fontSize={"1.3rem"}
            fontWeight={"bold"}
            mb={1}
          >
            {lesson?.quiz?.title}
          </Typography>
          {!quizAttempt && (
            <>
              <Typography
                textAlign={"center"}
                fontSize={"1rem"}
                fontWeight={"normal"}
              >
                {lesson?.quiz?.description}
              </Typography>
              <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <LinearProgress
                  value={getProgress()}
                  variant="determinate"
                  sx={{ flex: 1, height: ".5rem", my: 1, mb: 2 }}
                  color={getProgress() >= 100 ? "success" : "primary"}
                />

                <Typography>
                  {currentStep + " / " + lesson?.quiz?.questions?.length}
                </Typography>
              </Stack>
            </>
          )}
          <Stack spacing={1}>
            <Box
              border={0}
              height={"calc(100% - 2.5rem)"}
              borderTop={1}
              borderColor={"divider"}
              p={1}
            >
              <Stack height={"100%"} overflow={"auto"} spacing={1} mt={0}>
                {quizAttempt ? (
                  <Box>
                    <Stack
                      sx={{
                        borderTop: 5,
                        borderRadius: 1,
                        mt: 5,
                        mb: 3,
                        px: 3,
                        py: 1,
                        background: colors.blue[100],
                        borderColor: colors.blue[500],
                      }}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Typography>
                        You have got <strong>{quizAttempt?.score}</strong>{" "}
                        correct answers out of{" "}
                        <strong>{lesson?.quiz?.questions?.length}</strong>{" "}
                        questions.
                      </Typography>
                    </Stack>

                    <Stack alignItems={"start"} mt={3} px={4}>
                      <Typography fontWeight={"bold"} py={1}>
                        Areas You should Review
                      </Typography>

                      {Object.keys(quizAttempt?.attempts)
                        ?.filter(
                          (key) => !quizAttempt?.attempts[key]?.is_correct
                        )
                        ?.map((key: any) => (
                          <Stack
                            key={key}
                            direction={"row"}
                            alignItems={"center"}
                            spacing={1}
                          >
                            <Circle
                              sx={{ fontSize: ".7rem", color: "GrayText" }}
                            />
                            <Typography sx={{ color: "GrayText" }}>
                              {
                                lesson?.quiz?.questions?.find(
                                  (q: any) => q.id === parseInt(key)
                                )?.question_text
                              }
                            </Typography>
                          </Stack>
                        ))}
                    </Stack>
                  </Box>
                ) : (
                  <QuestionView
                    question={lesson?.quiz?.questions[currentStep]}
                    currentStep={currentStep}
                    answers={answers}
                    setAnswers={setAnswers}
                  />
                )}

                <Stack
                  direction={"row"}
                  spacing={1}
                  alignItems={"center"}
                  justifyContent={"center"}
                  mt={2}
                >
                  {!quizAttempt && (
                    <Button
                      variant="contained"
                      onClick={() => {
                        if (currentStep > 0) {
                          setCurrentStep((oldStep) => oldStep - 1);
                        }
                      }}
                      startIcon={<ArrowBackIos />}
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    onClick={loading ? () => {} : handleNextClick}
                    endIcon={
                      !(currentStep + 1 === lesson?.quiz?.questions?.length) ? (
                        quizAttempt ? (
                          <Replay />
                        ) : (
                          <ArrowForwardIos />
                        )
                      ) : (
                        <CheckCircle />
                      )
                    }
                    color={"primary"}
                  >
                    {currentStep + 1 === lesson?.quiz?.questions?.length ||
                    quizAttempt
                      ? loading
                        ? "Saving..."
                        : quizAttempt
                        ? "Try Again"
                        : "Save Attempt"
                      : "Next"}
                  </Button>

                  {quizAttempt && (
                    <Button
                      variant="contained"
                      onClick={() => playNext()}
                      endIcon={<ArrowForwardIos />}
                      color={"primary"}
                    >
                      Next Lesson
                    </Button>
                  )}
                </Stack>
              </Stack>
            </Box>
          </Stack>
          <Stack
            direction={"row"}
            height={"2.5rem"}
            sx={{
              background: "#1976d28a",
              zIndex: 1000000000,
              position: "absolute",
              bottom: "0rem",
              width: "100%",
              left: 0,
            }}
            alignItems={"center"}
            spacing={2}
            justifyContent={"flex-end"}
          >
            <Stack
              spacing={1}
              direction="row"
              sx={(theme) => ({
                mb: 1,
                px: 1,
                "& > svg": {
                  // color: "#0b448c",
                  color: "white",
                  ...theme.applyStyles("dark", {
                    color: "rgba(255,255,255)",
                  }),
                },
              })}
              alignItems="center"
              justifyContent={"flex-end"}
            >
              <Settings />
              <Subtitles />
              <Fullscreen />
            </Stack>
          </Stack>
        </>
      )}
    </Box>
  );
}

function QuestionView({
  question,
  currentStep,
  answers,
  setAnswers,
}: {
  question: any;
  currentStep: number;

  answers: { [questionID: string]: { answers: number[] } };
  setAnswers: React.Dispatch<
    React.SetStateAction<{ [questionID: string]: { answers: number[] } }>
  >;
}) {
  const handleOptionClick = (optionId: number) => {
    setAnswers((prevAnswers) => {
      const questionID = question?.id;

      const currentAnswers = prevAnswers[questionID]?.answers || [];

      const newAnswers =
        question?.question_type === QuizQuestionType.MULTIPLE_CHOICE
          ? currentAnswers.includes(optionId)
            ? currentAnswers.filter((id) => id !== optionId)
            : [...currentAnswers, optionId]
          : [optionId];

      return {
        ...prevAnswers,
        [questionID]: { answers: newAnswers },
      };
    });
  };

  const currentAnswers = answers[question?.id]?.answers || [];

  return (
    <Stack
      key={question?.id}
      mb={1}
      // border={1}
      borderRadius={1}
      borderColor={"divider"}
      p={1}
    >
      <Typography
        fontWeight={"bold"}
        fontSize={"1.2rem"}
        py={1}
        mb={1}
        textAlign={"center"}
      >
        {currentStep + 1} . {question?.question_text} ({question?.question_type}
        )
      </Typography>
      <Stack pl={5} spacing={1}>
        {question?.options?.map((option: any) => (
          <Typography
            key={option?.id}
            sx={{
              px: 2,
              py: 1.5,
              borderLeft: 4,
              borderColor: currentAnswers.includes(option?.id)
                ? colors.green[500]
                : colors.blue[500],
              background: currentAnswers.includes(option?.id)
                ? colors.green[100]
                : colors.blue[100],
              cursor: "pointer",
            }}
            onClick={() => handleOptionClick(option?.id)}
          >
            {option?.option_text}
          </Typography>
        ))}
      </Stack>
    </Stack>
  );
}
