"use client";

import { OperationVariables, QueryResult } from "@apollo/client";
import { Box, Chip, Skeleton, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
var relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

export default function CourseAnnouncement({
  announcement,
}: {
  announcement: QueryResult<any, OperationVariables>;
}) {
  return (
    <Box px={5}>
      <Box mt={3}>
        <Typography fontWeight={"bold"} fontSize={"1.25rem"}>
          Announcements
        </Typography>{" "}
        {announcement.loading ? (
          <AnnouncementSkeleton />
        ) : (
          <Stack spacing={0} mt={2}>
            {announcement.data?.getCourseAnnouncementsForPlayer?.map(
              (ann: any) => (
                <Box
                  key={ann?.id}
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
                    <Stack
                      direction={"row"}
                      spacing={2}
                      alignItems={"center"}
                      mb={5}
                    >
                      <Stack>
                        <Typography sx={{ fontWeight: "bold" }}>
                          {ann?.title}
                        </Typography>
                        {/* <Typography sx={{ color: "GrayText" }}>
                          {ann?.message}
                        </Typography> */}
                      </Stack>
                    </Stack>
                    <Stack direction={"row"} spacing={2} alignItems={"center"}>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={1}
                      >
                        <Chip
                          label={new Date(ann?.createdAt).toLocaleDateString()}
                          sx={{
                            background: "#0b448c",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        />
                      </Stack>
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
                    {ann?.message}
                  </Box>
                </Box>
              )
            )}
          </Stack>
        )}
      </Box>
    </Box>
  );
}

const AnnouncementSkeleton = () => {
  return (
    <Box sx={{ width: "100%" }}>
      {[...Array(4)].map((_, index) => (
        <Box
          key={index}
          sx={{
            marginBottom: 2,
            padding: 2,
            border: "1px solid #ddd",
            borderRadius: 2,
            // boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Stack direction={"row"} justifyContent={"space-between"}>
            {/* Announcement Title */}
            <Skeleton variant="text" width="60%" height={30} />

            {/* Announcement Date */}
            <Skeleton
              variant="rectangular"
              width="15%"
              height={30}
              sx={{ float: "right", borderRadius: 16 }}
            />
          </Stack>

          {/* Announcement Content */}
          <Box sx={{ marginTop: 2, pl: 5 }}>
            <Skeleton variant="rectangular" width="100%" height={80} />
          </Box>
        </Box>
      ))}
    </Box>
  );
};
