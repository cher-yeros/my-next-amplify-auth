"use client";

import { CREATE_COURSE_NOTE } from "@/graphql/course/course";
import { useAppSelector } from "@/redux/store";
import { LessonContentType } from "@/utils/enums";
import { formatSecondsToMMSS } from "@/utils/helpers";
import { OperationVariables, QueryResult, useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  Grid2,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { CurrentUser } from "@/redux/slices/authSlice";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type NoteForm = {
  student_id: number;
  lesson_id: number;
  course_id: number;
  noted_on_minute: number;
  body: string;
};

export default function CourseNotesForPlayer({
  course_id,
  lesson,
  notesQuery,

  played,
  playing,
  setPlayed,
  setPlaying,
}: {
  lesson: any;
  course_id: number;
  notesQuery: QueryResult<any, OperationVariables>;

  played: number;
  playing: boolean;
  setPlayed: Dispatch<SetStateAction<number>>;
  setPlaying: Dispatch<SetStateAction<boolean>>;
}) {
  const { currentUser }: { currentUser: CurrentUser } = useAppSelector(
    (state) => state.auth
  );

  const [showNewQA, setShowNewQA] = useState<boolean>(false);

  const [createCourseNote, { loading }] = useMutation(CREATE_COURSE_NOTE);

  const myForm = useForm({
    mode: "all",
    resolver: yupResolver(
      Yup.object().shape({
        student_id: Yup.number().required("Student is required"),
        lesson_id: Yup.number().required("Lesson is required"),
        course_id: Yup.number().required("Course is required"),
        noted_on_minute: Yup.number().required("Noted on Minute is required"),
        body: Yup.string().required("Body is required"),
      })
    ),

    defaultValues: {
      student_id: currentUser?.id,
      lesson_id: lesson?.id,
      course_id: course_id,

      noted_on_minute:
        lesson?.content_type === LessonContentType.VIDEO ? played : 0,
    },
  });

  useEffect(() => {
    notesQuery.refetch();
  }, []);

  const onSubmit: SubmitHandler<NoteForm> = async (values: NoteForm) => {
    try {
      const { data } = await createCourseNote({
        variables: {
          input: {
            student_id: currentUser.id,
            course_id: course_id,
            lesson_id: lesson?.id,
            noted_on_minute:
              lesson?.content_type === LessonContentType.VIDEO ? played : 0,
            body: values.body,
          },
        },
      });

      myForm.reset();
      notesQuery.refetch();

      setShowNewQA(false);

      toast.success("Your Note is Successfully Saved !", {
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
      <Box mt={3}>
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
              placeholder={
                "Create a new Note at " + formatSecondsToMMSS(played)
              }
              value={"Create a new Note at " + formatSecondsToMMSS(played)}
              disabled
            />
            <TextField
              fullWidth
              placeholder="Add your Note Here"
              {...myForm?.register("body")}
              error={!!myForm?.formState?.errors?.body?.message}
              multiline
              rows={5}
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
              placeholder={
                "Create a new Note at " + formatSecondsToMMSS(played)
              }
              value={"Create a new Note at " + formatSecondsToMMSS(played)}
              disabled
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton
                      onClick={() => {
                        setShowNewQA(true);
                        setPlaying(false);
                      }}
                    >
                      <Add />
                    </IconButton>
                  ),
                },
              }}
            />
          </Stack>
        )}

        <Typography fontWeight={"bold"} fontSize={"1.25rem"}>
          Your Notes
        </Typography>
        {notesQuery.loading ? (
          <NoteSkeletonLoader />
        ) : (
          <Stack spacing={0} mt={2}>
            {notesQuery.data?.getCourseNotesForPlayer?.map((note: any) => (
              <Box
                key={note?.id}
                border={1}
                borderColor={"divider"}
                mb={1}
                borderRadius={1}
                pb={1}
              >
                <Stack
                  direction={"row"}
                  spacing={2}
                  justifyContent={"space-between"}
                  sx={{
                    px: 1,
                    py: 1,
                    cursor: "pointer",
                    // "&:hover": {
                    //   background: "#f0f1ff",
                    // },
                  }}
                >
                  <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    <Chip
                      label={
                        formatSecondsToMMSS(note?.noted_on_minute || 0) + ""
                      }
                      sx={{
                        background: "#0b448c",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    />

                    <Stack>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {`Chapter ${lesson?.chapter?.order} : ${lesson?.chapter?.title}`}
                      </Typography>
                      <Typography sx={{ color: "GrayText" }}>
                        {`Lesson ${lesson?.order} : ${lesson?.title}`}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    <Typography
                      component={"span"}
                      sx={{
                        ml: 1,
                        fontSize: ".8rem",
                        textTransform: "capitalize",
                        color: "#1f50ae",
                      }}
                    >
                      {dayjs(note?.createdAt)?.fromNow()}
                    </Typography>
                    {/* <Stack direction={"row"} alignItems={"center"} spacing={1}>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                        }}
                      >
                        <IconButton color="primary" sx={{ color: "success" }}>
                          <Edit />
                        </IconButton>
                      </Typography>
                      <Typography sx={{ color: "GrayText" }}>
                        <IconButton color="primary" sx={{ color: "error" }}>
                          <Delete />
                        </IconButton>
                      </Typography>
                    </Stack> */}
                  </Stack>
                </Stack>

                <Box
                  sx={{
                    ml: 5,
                    mr: 1,
                    p: 1,
                    background: "#f5f5f5",
                    minHeight: "5rem",
                    borderRadius: 1,
                  }}
                >
                  <>{note?.body}</>
                </Box>
              </Box>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
}

const NoteSkeletonLoader = () => {
  return (
    // <Grid2 container spacing={2}>
    //   {
    Array.from(new Array(8)).map((_, index) => (
      // <Grid2 size={{ xs: 12 }} key={index}>
      <Grid2 container key={index} alignItems="center" spacing={1} mb={1}>
        {/* Time and Chapter/Lesson Info */}
        <Grid2 size={{ xs: 1 }}>
          <Skeleton
            variant="rectangular"
            width={50}
            height={30}
            sx={{ borderRadius: 5 }}
          />
        </Grid2>

        <Grid2 size={{ xs: 9.5 }}>
          <Skeleton variant="text" width="50%" height={30} />
          <Skeleton variant="text" width="30%" height={25} />
        </Grid2>

        {/* Edit and Delete Icons */}
        <Grid2 size={{ xs: 0.75 }}>
          <Skeleton variant="circular" width={30} height={30} />
        </Grid2>
        <Grid2 size={{ xs: 0.75 }}>
          <Skeleton variant="circular" width={30} height={30} />
        </Grid2>

        {/* Note Content */}
        <Grid2 size={{ xs: 12 }} pl={5} mb={1}>
          <Skeleton variant="rectangular" width="100%" height={70} />
        </Grid2>
      </Grid2>
      // </Grid2>
    ))
    //   }
    // </Grid2>
  );
};
