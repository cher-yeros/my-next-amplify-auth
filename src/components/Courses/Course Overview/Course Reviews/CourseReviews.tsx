"use client";

import { CREATE_COURSE_REVIEW } from "@/graphql/course/course";
import { CurrentUser } from "@/redux/slices/authSlice";
import { useAppSelector } from "@/redux/store";
import { numberFormat } from "@/utils/helpers";
import { OperationVariables, QueryResult, useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { QuestionAnswer } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as Yup from "yup";

type ReviewForm = {
  course_id: number;
  student_id: number;
  rating: number;
  review_text: string;
};

export default function CourseReviews({
  reviews,
  course_id,
}: {
  course_id: number;
  reviews: QueryResult<any, OperationVariables>;
}) {
  const { currentUser }: { currentUser: CurrentUser } = useAppSelector(
    (state) => state.auth
  );

  const [showNewQA, setShowNewQA] = useState<boolean>(false);

  const [createCourseReview, { loading }] = useMutation(CREATE_COURSE_REVIEW);

  const myForm = useForm({
    mode: "all",
    resolver: yupResolver(
      Yup.object().shape({
        student_id: Yup.number().required("Student is required"),
        course_id: Yup.number().required("Course is required"),
        rating: Yup.number().required("Rating is required"),
        review_text: Yup.string().required("review_text is required"),
      })
    ),

    defaultValues: {
      student_id: currentUser?.id,
      course_id: course_id,
    },
  });

  const onSubmit: SubmitHandler<ReviewForm> = async (values: ReviewForm) => {
    try {
      const { data } = await createCourseReview({
        variables: {
          input: {
            student_id: currentUser.id,
            course_id: course_id,
            review: values.rating,
            review_text: values.review_text,
          },
        },
      });

      myForm.reset();
      reviews.refetch();

      setShowNewQA(false);

      toast.success("Your Reivew is Successfully Saved !", {
        autoClose: 500,
      });
    } catch (error: any) {
      toast.error(error.message, {
        autoClose: 500,
      });
    }
  };

  reviews.refetch();

  return (
    <Box px={5}>
      <Box
        mt={2}
        sx={{
          background: "white",
          boxShadow: "0px 2px 20px rgba(1, 41, 112, 0.1)",
          px: 2,
          py: 1,
          border: 0,
          borderColor: "divider",
          borderRadius: 2,
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
              <Typography sx={{ fontWeight: "bold" }}>Rating</Typography>
              <Typography sx={{ color: "GrayText" }}>
                {numberFormat(
                  reviews.data?.getCourseReviews?.no_of_students || 0
                )}{" "}
                Students
              </Typography>
            </Stack>
          </Stack>

          <Stack direction={"row"} spacing={2} alignItems={"center"}>
            <Stack>
              <Rating
                precision={0.5}
                value={reviews.data?.getCourseReviews?.course_rating}
                readOnly
              />

              <Typography sx={{ color: "GrayText" }}>
                {reviews.data?.getCourseReviews?.course_rating || 0} (
                {numberFormat(
                  reviews.data?.getCourseReviews?.no_of_ratings || 0
                )}{" "}
                ratings)
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>

      <Box mt={3}>
        <Typography fontWeight={"bold"} fontSize={"1.25rem"}>
          Reviews given for this course
        </Typography>{" "}
        {reviews.data?.getCourseReviews?.reviews?.map((review: any) => (
          <Stack
            key={review?.id}
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
            <Stack direction={"row"} spacing={2} alignItems={"center"} flex={1}>
              <Avatar
                sx={{
                  width: "3rem",
                  height: "3rem",
                  fontWeight: "bold",
                  background: "#0b448c",
                }}
              >
                {review?.student?.firstname[0] + review?.student?.lastname[0]}
              </Avatar>

              <Stack>
                <Typography sx={{ fontWeight: "bold" }}>
                  {review?.title}{" "}
                  <Rating value={review?.rating || 0} readOnly size="small" />
                  <Typography
                    component={"span"}
                    sx={{
                      ml: 1,
                      fontSize: ".8rem",
                      textTransform: "capitalize",
                      color: "#1f50ae",
                    }}
                  >
                    - {dayjs(review?.updatedAt)?.fromNow()}
                  </Typography>
                </Typography>
                <Typography sx={{ color: "GrayText" }}>
                  {review?.review_text}
                  {/* {showReply
                    ? review?.description
                    : review?.description?.substring(0, 90) + "..."} */}
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
                  {/* {review?.replies?.length || 0} Replies */}
                </Typography>
                <Typography sx={{ color: "GrayText" }}>
                  {/* <IconButton
                    sx={{ color: "#0b448c" }}
                    // onClick={() => {
                    //   formInstance.setValue("parent_comment_id", review?.id);
                    //   setShowReply(!showReply);
                    // }}
                  >
                    <QuestionAnswer />
                  </IconButton> */}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Box>
    </Box>
  );
}
