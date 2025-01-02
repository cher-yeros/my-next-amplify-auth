"use client";
import {
  ExpandMore,
  FastForwardRounded,
  FastRewindRounded,
  Fullscreen,
  PauseRounded,
  PlayArrowRounded,
  Settings,
  Subtitles,
  VolumeDownRounded,
  VolumeUpRounded,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid2,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRef, useState } from "react";
import ReactPlayer from "react-player/file";

// const DiscountChip = styled(Chip)(({ theme }) => ({
//   backgroundColor: theme.palette.error.main,
//   color: theme.palette.common.white,
//   marginRight: theme.spacing(1),
// }));

function CoursePage() {
  const video_url =
    "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4";

  const [playing, setPlaying] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(0.8);
  const [muted, setMuted] = useState<boolean>(true);
  const [played, setPlayed] = useState<number>(0);
  const [seeking, setSeeking] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(200);

  const [position, setPosition] = useState<number>(32);

  function formatDuration(value: number) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  const playerRef = useRef<ReactPlayer | null>(null);

  const togglePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleMute = () => {
    setMuted(!muted);
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekMouseUp = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    setSeeking(false);
    playerRef.current?.seekTo(parseFloat(e.currentTarget.value));
  };

  const handleProgress = (state: any) => {
    if (!seeking) {
      setPlayed(state.playedSeconds);
    }
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const TinyText = styled(Typography)({
    fontSize: "0.75rem",
    // opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
    color: "white",
  });

  return (
    <Box sx={{ px: 4 }}>
      {/* Course Header */}
      <Box my={4}></Box>
      {/* Course Details */}
      <Grid2 container spacing={4}>
        <Grid2 size={{ xs: 12, md: 7 }}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h4" component="h1" gutterBottom>
                Fundamental of UX for Application design
              </Typography>
            </CardContent>
          </Card>

          <Box
            height={"27.55rem"}
            border={1}
            borderColor={"divider"}
            borderRadius={1}
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
            <ReactPlayer
              ref={playerRef}
              className="react-player"
              url={video_url}
              playing={playing}
              volume={volume}
              muted={muted}
              onProgress={handleProgress}
              onDuration={handleDuration}
              played={played}
              onSeek={(e: any) => setPosition(e.target.value * duration)}
              // onSeek={handleSeekMouseUp}
              width="100%"
              height="100%"
            />

            <Stack
              direction={"row"}
              height={"2.5rem"}
              sx={{
                background: "#1976d28a",
                zIndex: 1000000000,
                position: "absolute",
                bottom: "0rem",
                width: "100%",
              }}
              alignItems={"center"}
              spacing={2}
            >
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
                <TinyText>{formatDuration(position)}</TinyText>
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
                <TinyText>{formatDuration(duration - position)}</TinyText>
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

                {/* <Slider
                  aria-label="Volume"
                  defaultValue={30}
                  sx={(t) => ({
                    color: "rgba(0,0,0,0.87)",
                    "& .MuiSlider-track": {
                      border: "none",
                    },
                    "& .MuiSlider-thumb": {
                      width: 24,
                      height: 24,
                      backgroundColor: "#fff",
                      "&::before": {
                        boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                      },
                      "&:hover, &.Mui-focusVisible, &.Mui-active": {
                        boxShadow: "none",
                      },
                    },
                    ...t.applyStyles("dark", {
                      color: "#fff",
                    }),
                  })}
                /> */}
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
            </Stack>
          </Box>
          {/* Course Info */}
          <Stack direction={"row"} spacing={2} alignItems={"center"} mt={2}>
            <Avatar></Avatar>

            <Stack>
              <Typography variant="subtitle1" gutterBottom>
                Instructed by <br /> <a href="#author">Solomon Abebe</a>
              </Typography>{" "}
            </Stack>
          </Stack>
          <Typography variant="body2" color="textSecondary">
            Date Released : 7/2024
          </Typography>
          <Typography variant="h6" component="p" color="textSecondary">
            The automated process all your website tasks. Discover tools and
            techniques to engage effectively with vulnerable children and young
            people.
          </Typography>

          <Stack direction={"row"} spacing={1} my={2}>
            <Chip size="small" label="Bestseller" color="success" />
            <Chip
              size="small"
              label="4.7 (11,603 ratings)"
              variant="outlined"
            />
            <Chip size="small" label="70,777 students" variant="outlined" />
          </Stack>

          {/* What You'll Learn */}
          <Box sx={{}}>
            <Typography variant="h4" component="h1" gutterBottom>
              About the Course
            </Typography>
            <Typography paragraph>
              Are you struggling to communicate in English? We understand that
              it can be difficult to speak naturally in a new language, which is
              why we have developed an online course to help you master the art
              of conversation in English.
            </Typography>

            <Typography variant="h5" component="h2" gutterBottom>
              Requirements
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Basic understanding of computers and the internet" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Familiarity with social media platforms (helpful, but not required)" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Access to a computer or mobile device with a stable internet connection" />
              </ListItem>
            </List>

            <Typography variant="h5" component="h2" gutterBottom>
              Who is this course for?
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Non-native English speakers who want to improve their fluency and pronunciation" />
              </ListItem>
              <ListItem>
                <ListItemText primary="English language learners who want to improve their listening comprehension" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Business professionals who want to improve their English communication skills" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Students who need to pass an English proficiency test for academic or professional purposes" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Anyone who wants to gain confidence speaking and listening in English." />
              </ListItem>
            </List>

            {/* Add similar content here as needed */}
          </Box>
        </Grid2>

        {/* Course Purchase Section */}
        <Grid2 size={{ xs: 12, md: 5 }}>
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Stack
                spacing={2}
                direction={"row"}
                display="flex"
                alignItems="center"
                mb={2}
              >
                <Chip size="small" label="89% OFF" />
                <Typography variant="h6" color="error">
                  ETB 120.99
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ textDecoration: "line-through", marginLeft: 8 }}
                >
                  ETB 1109.99
                </Typography>
              </Stack>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                3 days left at this price!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                // startIcon={"Cart"}
                fullWidth
              >
                Add to cart
              </Button>
              <Typography
                variant="caption"
                display="block"
                align="center"
                mt={2}
              >
                30-Day Money-Back Guarantee
              </Typography>{" "}
            </CardContent>{" "}
          </Card>
          <Card>
            {/* <CardMedia
              component="img"
              height="140"
              image="path-to-course-image.jpg"
              alt="Course preview"
            /> */}
            <CardContent>
              <Box>
                {course.chapters.map((chapter) => (
                  <Accordion
                    key={chapter.chapterId}
                    sx={{
                      mb: 2,
                      boxShadow: "none",
                      border: 1,
                      borderRadius: 1,
                      borderColor: "divider",
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                      sx={{ fontWeight: "bold" }}
                    >
                      Chapter {chapter.chapterId} : {chapter.chapterTitle}
                    </AccordionSummary>
                    <AccordionDetails>
                      {chapter.lessons.map((lesson) => (
                        <Stack
                          direction={"row"}
                          key={lesson.lessonId}
                          spacing={1.5}
                          borderTop={1}
                          borderColor={"divider"}
                          py={1.5}
                        >
                          <PlayArrowRounded />

                          <Box>
                            <Typography variant="body2">
                              Lesson {lesson.lessonId} : {lesson.lessonTitle}
                            </Typography>
                            {/* <Typography variant="caption">
                              {lesson.duration}
                            </Typography> */}
                          </Box>
                          {/* <Typography variant="body1">
                            {lesson.content}
                          </Typography> */}
                        </Stack>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default CoursePage;

export const course = {
  courseTitle: "Mastering English Communication",
  chapters: [
    {
      chapterId: 1,
      chapterTitle: "Introduction to English Communication",
      lessons: [
        {
          lessonId: 101,
          lessonTitle: "Welcome to the Course",
          duration: "5 minutes",
          content: "An introduction to what you'll learn in this course.",
        },
        {
          lessonId: 102,
          lessonTitle: "Importance of Effective Communication",
          duration: "10 minutes",
          content: "Understanding why communication skills are essential.",
        },
      ],
    },
    {
      chapterId: 2,
      chapterTitle: "Basics of English Grammar",
      lessons: [
        {
          lessonId: 201,
          lessonTitle: "Parts of Speech",
          duration: "15 minutes",
          content:
            "Learn about nouns, verbs, adjectives, and other parts of speech.",
        },
        {
          lessonId: 202,
          lessonTitle: "Sentence Structure",
          duration: "20 minutes",
          content:
            "Understanding the structure of simple and complex sentences.",
        },
      ],
    },
    {
      chapterId: 3,
      chapterTitle: "Improving Pronunciation and Fluency",
      lessons: [
        {
          lessonId: 301,
          lessonTitle: "Common Pronunciation Mistakes",
          duration: "12 minutes",
          content: "Identify and correct common pronunciation errors.",
        },
        {
          lessonId: 302,
          lessonTitle: "Practicing Fluency",
          duration: "18 minutes",
          content: "Exercises and tips to improve your speaking fluency.",
        },
      ],
    },
    {
      chapterId: 4,
      chapterTitle: "Listening Skills",
      lessons: [
        {
          lessonId: 401,
          lessonTitle: "Active Listening Techniques",
          duration: "15 minutes",
          content:
            "Learn how to listen actively to understand and respond appropriately.",
        },
        {
          lessonId: 402,
          lessonTitle: "Listening for Key Points",
          duration: "10 minutes",
          content: "Strategies for identifying main ideas in conversations.",
        },
      ],
    },
    {
      chapterId: 5,
      chapterTitle: "Vocabulary Building",
      lessons: [
        {
          lessonId: 501,
          lessonTitle: "Commonly Used Words",
          duration: "15 minutes",
          content:
            "Expand your vocabulary with frequently used words in English.",
        },
        {
          lessonId: 502,
          lessonTitle: "Contextual Vocabulary",
          duration: "20 minutes",
          content: "Learn how to use new words in different contexts.",
        },
      ],
    },
    {
      chapterId: 6,
      chapterTitle: "Understanding Idioms and Phrases",
      lessons: [
        {
          lessonId: 601,
          lessonTitle: "Common English Idioms",
          duration: "15 minutes",
          content:
            "Familiarize yourself with idioms commonly used in everyday English.",
        },
        {
          lessonId: 602,
          lessonTitle: "Phrasal Verbs",
          duration: "15 minutes",
          content:
            "Learn about phrasal verbs and how they are used in conversation.",
        },
      ],
    },
    {
      chapterId: 7,
      chapterTitle: "Advanced Grammar Concepts",
      lessons: [
        {
          lessonId: 701,
          lessonTitle: "Advanced Tenses",
          duration: "20 minutes",
          content: "Explore advanced tenses for expressing time and actions.",
        },
        {
          lessonId: 702,
          lessonTitle: "Complex Sentence Structures",
          duration: "20 minutes",
          content: "Learn how to build complex and compound sentences.",
        },
      ],
    },
    {
      chapterId: 8,
      chapterTitle: "Public Speaking",
      lessons: [
        {
          lessonId: 801,
          lessonTitle: "Overcoming Fear of Speaking",
          duration: "15 minutes",
          content:
            "Techniques to overcome anxiety and fear of public speaking.",
        },
        {
          lessonId: 802,
          lessonTitle: "Engaging Your Audience",
          duration: "25 minutes",
          content: "Learn how to keep your audience engaged and interested.",
        },
      ],
    },
    {
      chapterId: 9,
      chapterTitle: "Writing Skills",
      lessons: [
        {
          lessonId: 901,
          lessonTitle: "Writing Clear Sentences",
          duration: "15 minutes",
          content: "Techniques for writing clear and concise sentences.",
        },
        {
          lessonId: 902,
          lessonTitle: "Paragraph Structure",
          duration: "20 minutes",
          content: "How to organize your ideas into coherent paragraphs.",
        },
      ],
    },
    {
      chapterId: 10,
      chapterTitle: "Business English",
      lessons: [
        {
          lessonId: 1001,
          lessonTitle: "Business Vocabulary",
          duration: "20 minutes",
          content: "Expand your business-related vocabulary.",
        },
        {
          lessonId: 1002,
          lessonTitle: "Professional Email Writing",
          duration: "20 minutes",
          content: "Learn how to write clear and professional emails.",
        },
      ],
    },
    {
      chapterId: 11,
      chapterTitle: "Negotiation Skills",
      lessons: [
        {
          lessonId: 1101,
          lessonTitle: "Basics of Negotiation",
          duration: "15 minutes",
          content: "Introduction to negotiation and key strategies.",
        },
        {
          lessonId: 1102,
          lessonTitle: "Effective Persuasion",
          duration: "25 minutes",
          content: "Learn how to persuade others effectively in negotiations.",
        },
      ],
    },
    {
      chapterId: 12,
      chapterTitle: "Interpersonal Communication",
      lessons: [
        {
          lessonId: 1201,
          lessonTitle: "Understanding Non-Verbal Cues",
          duration: "20 minutes",
          content: "Learn about body language and other non-verbal cues.",
        },
        {
          lessonId: 1202,
          lessonTitle: "Building Rapport",
          duration: "15 minutes",
          content:
            "Techniques for establishing rapport and trust in communication.",
        },
      ],
    },
    {
      chapterId: 13,
      chapterTitle: "Pronunciation Practice",
      lessons: [
        {
          lessonId: 1301,
          lessonTitle: "Vowel and Consonant Sounds",
          duration: "20 minutes",
          content:
            "Learn to distinguish and pronounce different vowel and consonant sounds.",
        },
        {
          lessonId: 1302,
          lessonTitle: "Intonation and Stress",
          duration: "15 minutes",
          content:
            "Improve your pronunciation with correct intonation and stress.",
        },
      ],
    },
    {
      chapterId: 14,
      chapterTitle: "Cultural Communication",
      lessons: [
        {
          lessonId: 1401,
          lessonTitle: "Understanding Cultural Differences",
          duration: "25 minutes",
          content: "Learn how culture influences communication styles.",
        },
        {
          lessonId: 1402,
          lessonTitle: "Adapting to Different Cultures",
          duration: "20 minutes",
          content:
            "Techniques for adapting your communication to different cultural contexts.",
        },
      ],
    },
    {
      chapterId: 15,
      chapterTitle: "Course Conclusion and Final Assessment",
      lessons: [
        {
          lessonId: 1501,
          lessonTitle: "Course Summary",
          duration: "10 minutes",
          content:
            "Review of the key concepts and skills covered in the course.",
        },
        {
          lessonId: 1502,
          lessonTitle: "Final Assessment",
          duration: "30 minutes",
          content: "A comprehensive test to evaluate your learning progress.",
        },
      ],
    },
  ],
};
