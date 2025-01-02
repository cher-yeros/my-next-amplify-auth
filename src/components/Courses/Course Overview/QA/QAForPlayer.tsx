"use client";

import {
  CREATE_COURSE_QA,
  GET_COURSE_QA_FOR_PLAYER,
} from "@/graphql/course/course";
import { useAppSelector } from "@/redux/store";
import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Add, QuestionAnswer } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Grid2,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { lazy, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";
var relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

type QAForm = {
  title: string;
  description: string;
  parent_comment_id?: number | null;
};

export default function QAForPlayer({ course_id }: { course_id: number }) {
  const { currentUser } = useAppSelector((state) => state.auth);

  const [showNewQA, setShowNewQA] = useState<boolean>(false);

  const {
    data: qaData,
    loading: qaLoading,
    refetch: qaRefetch,
  } = useQuery(GET_COURSE_QA_FOR_PLAYER, {
    variables: { id: course_id },
  });

  const [createCourseQA, { loading }] = useMutation(CREATE_COURSE_QA);

  const myForm = useForm({
    mode: "all",
    resolver: yupResolver(
      Yup.object().shape({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        parent_comment_id: Yup.number().nullable(),
      })
    ),

    defaultValues: {
      title: "",
      description: "",
      parent_comment_id: null,
    },
  });

  const onSubmit: SubmitHandler<QAForm> = async (values: QAForm) => {
    try {
      const { data } = await createCourseQA({
        variables: {
          input: {
            course_id: course_id,
            student_id: currentUser?.id,
            title: values.title,
            description: values.description,
            parent_comment_id: values.parent_comment_id,
          },
        },
      });

      myForm.reset();
      qaRefetch();

      setShowNewQA(false);

      toast.success("Your Question/Answer is Successfully Added!", {
        autoClose: 500,
      });
    } catch (error: any) {
      toast.error(error.message, {
        autoClose: 500,
      });
    }
  };

  return (
    <Box px={5}>
      {showNewQA ? (
        <Stack
          my={3}
          spacing={1}
          alignItems={"start"}
          component={"form"}
          onSubmit={myForm.handleSubmit(onSubmit)}
        >
          <TextField
            fullWidth
            placeholder="Add your Question Title"
            {...myForm?.register("title")}
            error={!!myForm?.formState?.errors?.title?.message}
            // helperText={myForm?.formState?.errors.title?.message}
          />
          <TextField
            fullWidth
            placeholder="Add your Question Description"
            {...myForm?.register("description")}
            error={!!myForm?.formState?.errors?.description?.message}
            // helperText={errors.description?.message}
            multiline
            rows={3}
          />

          <Button variant="contained" type={loading ? "button" : "submit"}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </Stack>
      ) : (
        <Stack
          my={3}
          spacing={1}
          alignItems={"start"}
          component={"form"}
          onSubmit={myForm.handleSubmit(onSubmit)}
        >
          <TextField
            fullWidth
            placeholder="Add your Question Title"
            {...myForm?.register("title")}
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton onClick={() => setShowNewQA(true)}>
                    <Add />
                  </IconButton>
                ),
              },
            }}
          />
        </Stack>
      )}

      <Box mt={3}>
        <Typography fontWeight={"bold"} fontSize={"1.25rem"}>
          Asked questions in this course
        </Typography>{" "}
        {qaLoading ? (
          <QuestionListSkeleton />
        ) : (
          <Stack spacing={0} mt={2}>
            {qaData?.getCourseQAForPlayer?.map((qa: any) => (
              <QARow
                key={qa?.id}
                qa={qa}
                course_id={course_id}
                refetch={qaRefetch}
              />
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}

function QARow({
  qa,
  refetch,
  course_id,
}: {
  qa: any;
  course_id: number;
  refetch: () => void;
}) {
  const { currentUser } = useAppSelector((state) => state.auth);

  const [showReply, setShowReply] = useState(false);

  const [createCourseQA, { loading }] = useMutation(CREATE_COURSE_QA);

  const formInstance = useForm({
    mode: "all",
    resolver: yupResolver(
      Yup.object().shape({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        parent_comment_id: Yup.number().nullable(),
      })
    ),

    defaultValues: {
      title: "",
      description: "",
      parent_comment_id: null,
    },
  });

  const onSubmit: SubmitHandler<QAForm> = async (values: QAForm) => {
    try {
      const { data } = await createCourseQA({
        variables: {
          input: {
            course_id: course_id,
            student_id: currentUser?.id,
            title: values.title,
            description: values.description,
            parent_comment_id: qa?.id,
          },
        },
      });

      // setShowReply(false);
      formInstance.reset();
      refetch();

      toast.success("Your Answer is Successfully Added!", {
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
      <Stack
        key={qa?.id}
        direction={"row"}
        spacing={2}
        justifyContent={"space-between"}
        borderBottom={1}
        borderColor={"divider"}
        sx={{
          px: 1,
          py: 1,
          cursor: "pointer",
          "&:hover": {
            background: "#f0f1ff",
          },
        }}
        onClick={() => {
          formInstance.setValue("parent_comment_id", qa?.id);
          setShowReply(!showReply);
        }}
      >
        <Stack direction={"row"} spacing={2} alignItems={"center"} flex={1}>
          <Avatar
            sx={{
              width: "3rem",
              height: "3rem",
              fontWeight: "bold",
              background: "#0b448c",
            }}
          >
            {qa?.student?.firstname[0] + qa?.student?.lastname[0]}
          </Avatar>

          <Stack>
            <Typography sx={{ fontWeight: "bold" }}>
              {qa?.title}{" "}
              <Typography
                component={"span"}
                sx={{
                  ml: 1,
                  fontSize: ".8rem",
                  textTransform: "capitalize",
                  color: "#1f50ae",
                }}
              >
                - {dayjs(qa?.createdAt)?.fromNow()}
              </Typography>
            </Typography>
            <Typography sx={{ color: "GrayText" }}>
              {showReply
                ? qa?.description
                : qa?.description?.substring(0, 90) + "..."}
            </Typography>
          </Stack>
        </Stack>

        <Stack
          direction={"row"}
          spacing={2}
          alignItems={"center"}
          width={"5rem"}
        >
          <Stack alignItems={"end"}>
            <Typography
              sx={{
                fontWeight: "bold",
              }}
            >
              {qa?.replies?.length || 0} Replies
            </Typography>
            <Typography sx={{ color: "GrayText" }}>
              <IconButton
                sx={{ color: "#0b448c" }}
                onClick={() => {
                  formInstance.setValue("parent_comment_id", qa?.id);
                  setShowReply(!showReply);
                }}
              >
                <QuestionAnswer />
              </IconButton>
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      {showReply && (
        <Stack spacing={0} mt={2} pl={8}>
          {qa?.replies?.map((reply: any) => (
            <Stack
              key={qa?.id}
              direction={"row"}
              spacing={2}
              justifyContent={"space-between"}
              borderBottom={1}
              borderColor={"divider"}
              sx={{
                px: 1,
                py: 1,
                cursor: "pointer",
                "&:hover": {
                  background: "#f0f1ff",
                },
              }}
            >
              <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <Avatar
                  sx={{
                    width: "3rem",
                    height: "3rem",
                    fontWeight: "bold",
                    background: "#0b448c",
                  }}
                >
                  {reply?.student?.firstname[0] + reply?.student?.lastname[0]}
                </Avatar>

                <Stack>
                  <Typography sx={{ fontWeight: "bold" }}>
                    {reply?.title}

                    <Typography
                      component={"span"}
                      sx={{
                        ml: 1,
                        fontSize: ".8rem",
                        textTransform: "capitalize",
                        color: "#1f50ae",
                      }}
                    >
                      - {dayjs(reply?.createdAt)?.fromNow()}
                    </Typography>
                  </Typography>
                  <Typography sx={{ color: "GrayText" }}>
                    {reply?.description}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          ))}
        </Stack>
      )}

      {showReply && (
        <Stack
          my={3}
          pl={8}
          spacing={1}
          alignItems={"start"}
          component={"form"}
          onSubmit={formInstance.handleSubmit(onSubmit)}
        >
          <TextField
            fullWidth
            placeholder="Add your Reply Title"
            {...formInstance.register("title")}
            error={!!formInstance?.formState.errors?.title?.message}
            // helperText={errors.title?.message}
          />
          <TextField
            fullWidth
            placeholder="Add your Reply Description"
            {...formInstance.register("description")}
            error={!!formInstance?.formState?.errors?.description?.message}
            // helperText={errors.description?.message}
            multiline
            rows={3}
          />

          <Button variant="contained" type={loading ? "button" : "submit"}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </Stack>
      )}
    </>
  );
}
const QuestionListSkeleton = () => {
  return (
    <Box sx={{ padding: 2 }} width={"100%"}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Grid2
          container
          spacing={2}
          alignItems="center"
          key={index}
          sx={{ marginBottom: 2 }}
          width={"100%"}
        >
          {/* Left side - Avatar Skeleton */}
          <Grid2 size={{ xs: 1 }}>
            <Skeleton variant="circular" width={45} height={45} />
          </Grid2>

          {/* Middle side - Question Title and Detail */}
          <Grid2 size={{ xs: 10.5 }}>
            <Skeleton width="80%" height={25} />
            <Skeleton width="60%" height={18} />
          </Grid2>

          {/* Right side - Number and Icon */}
          <Grid2 size={{ xs: 0.5 }} sx={{ textAlign: "right" }}>
            <Skeleton width={20} height={20} sx={{ marginRight: 1 }} />
            <Skeleton variant="rectangular" width={25} height={25} />
          </Grid2>
        </Grid2>
      ))}
    </Box>
  );
};
