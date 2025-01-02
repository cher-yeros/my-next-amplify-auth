import CourseOverview from "@/components/Courses/CourseOverview";
import CoursePage from "@/components/Courses/CoursePage";
import { Box } from "@mui/material";

export default function SingleCourse({ params }: { params: any }) {
  return (
    <Box>
      {/* <CoursePage /> */}
      <CourseOverview />
      {/* <Grid2 container spacing={3}>
        <Grid2 size={{ lg: 8, md: 12 }}>
          <Paper className="p-4">
            <div className="mb-4">
              <div className="ratio ratio-16x9">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Video Player"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <Typography variant="h4" gutterBottom>
              Course Title
            </Typography>
            <Typography variant="body1" gutterBottom>
              This is a brief description of the course. It covers various
              topics and provides valuable knowledge.
            </Typography>

            <div className="mt-5">
              <Typography variant="h5" gutterBottom>
                Comments
              </Typography>
              <textarea
                className="form-control mb-3"
                rows={3}
                placeholder="Add a comment"
              ></textarea>
              <button className="btn btn-primary">Submit</button>

              <div className="mt-4">
                <div className="d-flex align-items-start mb-3">
                  <img
                    src="https://via.placeholder.com/40"
                    alt="user"
                    className="rounded-circle me-3"
                  />
                  <div>
                    <Typography variant="body1">
                      <strong>User Name</strong> This is a sample comment. Great
                      course!
                    </Typography>
                    <small className="text-muted">2 hours ago</small>
                  </div>
                </div>
              </div>
            </div>
          </Paper>
        </Grid2>

        <Grid size={{ lg: 4, md: 12 }}>
          <Box className="p-4">
            <Typography variant="h5" gutterBottom>
              Course Content
            </Typography>
            <ul className="list-group">
              <li className="list-group-item">
                <Typography variant="h6">Chapter 1: Introduction</Typography>
                <ul className="list-unstyled">
                  <li>
                    <Typography variant="body1">Lesson 1: Overview</Typography>
                  </li>
                  <li>
                    <Typography variant="body1">
                      Lesson 2: Getting Started
                    </Typography>
                  </li>
                </ul>
              </li>
            </ul>
          </Box>
        </Grid>
      </Grid2> */}
    </Box>
  );
}
