"use client";

import {
  UPDATE_COURSE_PROGRESS,
  UPDATE_ENROLLMENT_LAST_ACCESS_INFO,
} from "@/graphql/course/course";
import { CourseProgressStatus, LessonContentType } from "@/utils/enums";
import { useMutation } from "@apollo/client";
import {
  Forward30,
  Fullscreen,
  PauseRounded,
  PlayArrowRounded,
  Replay30,
  Settings,
  Subtitles,
  VolumeOff,
  VolumeUpRounded,
} from "@mui/icons-material";
import { Box, colors, Slider, Stack, Typography } from "@mui/material";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactPlayer from "react-player";
import QuizPlayer from "./QuizPlayer";
import { OnProgressProps } from "react-player/base";

export default function CoursePlayer({
  lesson,
  enrollment,
  playNext,
  refetchCarriculum,
  enrollmentRefetch,

  played,
  playing,
  setPlayed,
  setPlaying,
}: {
  lesson: any;
  enrollment: any;
  playNext: () => void;
  refetchCarriculum: () => void;
  enrollmentRefetch: () => void;
  played: number;
  playing: boolean;
  setPlayed: Dispatch<SetStateAction<number>>;
  setPlaying: Dispatch<SetStateAction<boolean>>;
}) {
  const playerRef = useRef<ReactPlayer | null>(null);
  const videoContainerRef = useRef(null); // For fullscreen

  const [volumeClicked, setVolumeClicked] = useState<boolean>(false);

  const [buffered, setBuffered] = useState(0); // Buffered percentage

  const [volume, setVolume] = useState<number>(0.8);
  const [muted, setMuted] = useState<boolean>(false);
  const [seeking, setSeeking] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [position, setPosition] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState(1); // Playback speed

  const lastProgressUpdate = useRef<number>(0);

  const [updateCourseProgress, { loading: progressLoading }] = useMutation(
    UPDATE_COURSE_PROGRESS
  );

  const [updateCourseLastAccess, { loading: lastAccessLoading }] = useMutation(
    UPDATE_ENROLLMENT_LAST_ACCESS_INFO
  );

  useEffect(() => {
    handleUpdateCourseLastAccess();
  }, [lesson]);

  const handleUpdateCourseLastAccess = async () => {
    try {
      await updateCourseLastAccess({
        variables: {
          input: {
            enrollment_id: enrollment?.id,
            last_accessed_chapter_id: lesson?.chapter_id,
            last_accessed_lesson_id: lesson?.id,
            last_accessed_date: new Date(),
          },
        },
      });
    } catch (error) {
      // console.log(error);
    }
  };

  const handleProgress = async (state: OnProgressProps) => {
    setPlayed(state.playedSeconds);
    setBuffered(state.loadedSeconds);

    const currentTime = Math.floor(state.playedSeconds);
    const progressPercentage = state.playedSeconds / duration;

    if (currentTime - lastProgressUpdate.current >= 30) {
      lastProgressUpdate.current = currentTime;

      const watched_duration = state.playedSeconds / 60;

      let status;

      if (progressPercentage === 0) {
        status = CourseProgressStatus.NOT_STARTED;
      } else if (progressPercentage > 0 && progressPercentage < 0.95) {
        status = CourseProgressStatus.IN_PROGRESS;
      } else if (progressPercentage >= 0.95) {
        status = CourseProgressStatus.COMPLETED;
      }

      await updateCourseProgress({
        variables: {
          input: {
            enrollment_id: enrollment?.id,
            lesson_id: lesson?.id,
            status: status,
            watched_duration: watched_duration,
            last_accessed_date: new Date(),
          },
        },
      });
    }
  };

  const handleSeek = (value: number | number[]) => {
    console.log(value);
    // setPlayed(value as number);
    if (playerRef.current) {
      playerRef.current.seekTo(value as number); // Seek to fraction
    }
  };

  function formatDuration(value: number) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${
      secondLeft < 10 ? `0${secondLeft.toFixed(0)}` : secondLeft.toFixed(0)
    }`;
  }

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleEnded = async () => {
    playNext();

    try {
      await updateCourseProgress({
        variables: {
          input: {
            enrollment_id: enrollment?.id,
            lesson_id: lesson?.id,
            status: CourseProgressStatus.COMPLETED,
            watched_duration: duration / 60,
            last_accessed_date: new Date(),
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // const handleSeek = (value: number) => {
  //   if (playerRef.current) {
  //     playerRef.current.seekTo(value, "seconds");
  //   }
  // };

  const handleForward = () => {
    const newTime = Math.min(played + 30, duration); // Avoid exceeding duration
    handleSeek(newTime);
  };

  const handleBackward = () => {
    const newTime = Math.max(played - 30, 0); // Avoid negative time
    handleSeek(newTime);
  };

  const handleFullscreen = () => {
    if (videoContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoContainerRef.current ;
      }
    }
  };

  const handlePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
    if (playerRef.current) {
      playerRef.current.getInternalPlayer().playbackRate = rate;
    }
  };

  //

  return (
    <Box
      height={"100%"}
      border={0}
      borderColor={"divider"}
      borderRadius={0}
      sx={{
        overflow: "hidden",
        position: "relative",
        "& .react-player": {
          height: "100%",
          width: "100%",
          zIndex: 100,
        },
      }}
    >
      {lesson?.content_type === LessonContentType.VIDEO && (
        <Box height={playing ? "100%" : "35rem"} ref={videoContainerRef}>
          <ReactPlayer
            ref={playerRef}
            className="react-player"
            url={lesson?.content_url}
            playing={playing}
            volume={volume}
            muted={muted}
            onProgress={handleProgress}
            onDuration={handleDuration}
            onEnded={handleEnded}
            played={played}
            onSeek={(e: any) => setPosition(e.target.value * duration)}
            width="100%"
            height="100%"
            // onBuffer={}
            // onStart={}

            fallback={<Typography>Loading....</Typography>}
          />

          <Stack
            sx={{
              background: "#0254a426",
              zIndex: 1000000000,
              position: "absolute",
              bottom: "0rem",
              width: "100%",
              px: 3,
              pb: 0.5,
            }}
            // alignItems={"center"}
            spacing={0}
          >
            <Slider
              size="medium"
              valueLabelDisplay="auto"
              value={played}
              min={0}
              step={1}
              max={duration}
              valueLabelFormat={(value: number) => formatDuration(value)}
              // onChange={handleSeekChange}
              onChange={(_, value) => handleSeek(value)}
              sx={{
                color: "#fff",
                position: "relative",
                // overflow: "hidden",
                "&::after": {
                  content: `''`,
                  width: Math.min((buffered / duration) * 100, 100) + "%",
                  height: "4px",
                  position: "absolute",
                  background: "#efefefc7",
                  borderRadius: 1,
                },
                "& .MuiSlider-root": {
                  color: "white",
                },
                "& .MuiSlider-track": {
                  zIndex: 10000,
                  color: colors.blue[500],
                },
                "& .MuiSlider-thumb": {
                  zIndex: 10000,
                  width: 15,
                  height: 15,
                  backgroundColor: "#fff",
                  border: 4,
                  borderColor: colors.blue[500],
                  "&::before": {
                    boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                  },
                  "&:hover, &.Mui-focusVisible, &.Mui-active": {
                    boxShadow: "none",
                  },
                },
              }}
            />
            <Stack
              direction={"row"}
              spacing={2}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{
                "& .MuiSvgIcon-root": {
                  cursor: "pointer",
                },
              }}
            >
              <Stack
                direction={"row"}
                spacing={2}
                alignItems={"center"}
                sx={{
                  "& .MuiSvgIcon-root": {
                    cursor: "pointer",
                  },
                }}
              >
                <Stack
                  direction={"row"}
                  spacing={2}
                  alignItems={"center"}
                  color={"white"}
                  fontSize={"1.8rem"}
                >
                  {!playing ? (
                    <PlayArrowRounded
                      sx={{ fontSize: "2.2rem", cursor: "pointer" }}
                      onClick={() => setPlaying(true)}
                    />
                  ) : (
                    <PauseRounded
                      sx={{ fontSize: "2.2rem", cursor: "pointer" }}
                      onClick={() => setPlaying(false)}
                    />
                  )}

                  <Forward30 fontSize="inherit" />

                  <Replay30 fontSize="inherit" />
                </Stack>
                <Stack
                  direction={"row"}
                  spacing={2}
                  alignItems={"center"}
                  color={"white"}
                  fontSize={"1.8rem"}
                >
                  {muted ? (
                    <VolumeOff
                      onMouseOver={() => setVolumeClicked(true)}
                      // onMouseLeave={() => setVolumeClicked(false)}
                      onClick={() => {
                        setVolumeClicked(true);
                        setMuted(!muted);
                      }}
                    />
                  ) : (
                    <VolumeUpRounded
                      onMouseOver={() => setVolumeClicked(true)}
                      // onMouseLeave={() => setVolumeClicked(false)}
                      onClick={() => {
                        setVolumeClicked(true);
                        setMuted(!muted);
                      }}
                    />
                  )}
                  {volumeClicked && (
                    <Slider
                      size="medium"
                      value={volume}
                      min={0}
                      max={1}
                      step={0.1}
                      onChange={(_, value) => {
                        if (typeof value === "number") {
                          setVolume(value);
                        }
                        console.log(value);
                        // setVolume(value)
                      }}
                      sx={{
                        width: "5rem",
                        color: "#fff",

                        "& .MuiSlider-thumb": {
                          width: 13,
                          height: 13,
                          backgroundColor: "#fff",
                          border: 1,
                          borderColor: colors.blue[500],
                          "&::before": {
                            boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                          },
                          "&:hover, &.Mui-focusVisible, &.Mui-active": {
                            boxShadow: "none",
                          },
                        },
                      }}
                    />
                  )}

                  <Box width={"1.5rem"}></Box>
                  <Typography>
                    {`${formatDuration(played)} / ${formatDuration(duration)}`}
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                direction={"row"}
                spacing={2}
                alignItems={"center"}
                sx={{
                  "& .MuiSvgIcon-root": {
                    cursor: "pointer",
                  },
                }}
              >
                <Stack
                  direction={"row"}
                  spacing={2}
                  alignItems={"center"}
                  color={"white"}
                  fontSize={"1.8rem"}
                >
                  <Settings fontSize="inherit" />

                  <Fullscreen fontSize="inherit" />
                </Stack>
              </Stack>
            </Stack>

            {/* <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Box
                sx={(theme) => ({
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // mt: -1,
                  "& svg": {
                    color: "#fff",
                    ...theme.applyStyles("dark", {
                      color: "#fff",
                    }),
                  },
                })}
              >
                <IconButton aria-label="previous song">
                  <FastRewindRounded fontSize="large" />
                </IconButton>
                <IconButton
                  aria-label={playing ? "play" : "pause"}
                  onClick={() => setPlaying(!playing)}
                >
                  {!playing ? (
                    <PlayArrowRounded sx={{ fontSize: "3rem" }} />
                  ) : (
                    <PauseRounded sx={{ fontSize: "3rem" }} />
                  )}
                </IconButton>
                <IconButton aria-label="next song">
                  <FastForwardRounded fontSize="large" />
                </IconButton>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // mt: -2,
                }}
              >
                {" "}
                <Typography>{formatDuration(position)}</Typography>
              </Box>
              <Slider
                aria-label="time-indicator"
                size="small"
                value={position}
                min={0}
                step={1}
                max={duration}
                // onChange={handleSeekChange}
                // onChangeCommitted={handleSeekMouseUp}
                onChange={(_, value) => {
                  if (typeof value === "number") {
                    // 1 == 200
                    // x == value
                    // x = value/
                    // handleSeekChange(_);
                    // setSeeking(value / duration);

                    setPosition(value);
                    setSeeking(true);
                  }
                }}
                sx={(t) => ({
                  color: "rgba(225,225,225,225.87)",
                  height: 4,
                  "& .MuiSlider-thumb": {
                    width: 8,
                    height: 8,
                    transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
                    "&::before": {
                      boxShadow: "0 2px 12px 0 rgba(1,1,1,1.4)",
                    },
                    "&:hover, &.Mui-focusVisible": {
                      boxShadow: `0px 0px 0px 8px ${"rgb(0 0 0 / 16%)"}`,
                      ...t.applyStyles("dark", {
                        boxShadow: `0px 0px 0px 8px ${"rgb(255 255 255 / 16%)"}`,
                      }),
                    },
                    "&.Mui-active": {
                      width: 20,
                      height: 20,
                    },
                  },
                  "& .MuiSlider-rail": {
                    opacity: 0.28,
                  },
                  ...t.applyStyles("dark", {
                    color: "#fff",
                  }),
                })}
              />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  // mt: -2,
                }}
              >
                <Typography>{formatDuration(duration - position)}</Typography>
              </Box>
              <Stack
                spacing={2}
                direction="row"
                sx={(theme) => ({
                  mb: 1,
                  px: 1,
                  "& > svg": {
                    color: "rgba(255,255,255)",
                    ...theme.applyStyles("dark", {
                      color: "rgba(255,255,255)",
                    }),
                  },
                })}
                alignItems="center"
              >
                {muted ? (
                  <VolumeDownRounded onClick={() => setMuted(!muted)} />
                ) : (
                  <VolumeUpRounded onClick={() => setMuted(!muted)} />
                )}
              </Stack>
              <Stack
                spacing={1}
                direction="row"
                sx={(theme) => ({
                  mb: 1,
                  px: 1,
                  "& > svg": {
                    color: "rgba(255,255,255)",
                    ...theme.applyStyles("dark", {
                      color: "rgba(255,255,255)",
                    }),
                  },
                })}
                alignItems="center"
              >
                <Settings />
                <Settings />
                <Subtitles />
                <Fullscreen />
              </Stack>
            </Stack> */}
          </Stack>
        </Box>
      )}

      {lesson?.content_type === LessonContentType.ARTICLE && (
        <Box
          height={"35rem"}
          overflow={"auto"}
          p={2}
          px={4}
          sx={{ background: "white" }}
        >
          <Box
            sx={{ textAlign: "center" }}
            dangerouslySetInnerHTML={{ __html: lesson?.article?.content }}
          >
            {/* {lesson?.article?.content} */}
          </Box>
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
          </Stack>{" "}
        </Box>
      )}

      {lesson?.content_type === LessonContentType.QUIZ && (
        <QuizPlayer
          lesson={lesson}
          enrollment={enrollment}
          refetchCarriculum={refetchCarriculum}
          enrollmentRefetch={enrollmentRefetch}
          playNext={playNext}
        />
      )}
    </Box>
  );
}
