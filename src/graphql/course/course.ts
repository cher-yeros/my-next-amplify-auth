import { gql } from "@apollo/client";

export const GET_COURSE_CATEGORIES = gql`
  query AllCourseCategorys {
    allCourseCategorys {
      id
      name
    }
  }
`;

export const GET_PUBLISHED_COURSES = gql`
  query GetPublishedCourses {
    getPublishedCourses {
      # instructor {
      #   fullname
      # }
      # category {
      #   name
      # }
      # sub_category {
      #   name
      # }
      # language_details {
      #   name
      # }
      # chapters
      # lessons {
      #   id
      # }
      # enrollments
      # course_reviews
      # course_tags
      # faqs
      # announcements
      # requirements
      # payments
      # certificates
      # wish_lists
      # messages
      # questions_and_answers
      id
      # instructor_id
      instructor_full_name
      title
      # description
      # category_id
      # sub_category_id
      price
      duration
      # language_id
      language
      level
      # rating
      thumbnail_image
      # number_of_chapters
      number_of_lessons
      # status
      # trailer
      createdAt
      updatedAt
    }
  }
`;
// export const GET_PUBLIC_MARKED_COURSES = gql``

export const GET_COURSE_OVERVIEW = gql`
  query GetCourseOverview($id: ID!) {
    getCourseOverview(id: $id) {
      id
      title
      description
      trailer
      level
      language
      price

      requirements {
        description
      }

      thumbnail_image

      instructor_full_name
      category {
        name
      }

      sub_category {
        name
      }

      instructor {
        id
        user_id
        name
        bio
        experience_years
        expertise
        languages_spoken
        teaching_style
        courses_taught
        rating
        support_availability
        certifications
        achievements
      }

      chapters {
        id
        order
        title
        lessons {
          id
          order
          title
          content_type
        }
      }
    }
  }
`;

export const GET_COURSE_ENROLLMENT_FOR_PLAYER = gql`
  query GetEnrollment($course_id: ID!) {
    getEnrollment(course_id: $course_id) {
      id
      course_id
      enrolled_date
      progress
      status
      watched_duration
      last_accessed_chapter_id
      last_accessed_lesson_id
      createdAt
    }
  }
`;

export const GET_COURSE_OVERVIEW_FOR_PLAYER = gql`
  query GetCourseOverviewForPlayer($id: ID!) {
    getMyReview(course_id: $id) {
      id
      rating
      review_text
      createdAt
      updatedAt
    }
    getCourseOverviewForPlayer(id: $id) {
      id
      title
      description
      trailer
      level
      language
      price

      number_of_chapters
      number_of_lessons

      duration

      # requirements {
      #   description
      # }

      thumbnail_image

      instructor_full_name
      category {
        name
      }

      sub_category {
        name
      }

      instructor {
        id
        user_id
        name
        bio
        experience_years
        expertise
        languages_spoken
        teaching_style
        courses_taught
        rating
        support_availability
        certifications
        achievements
      }

      chapters {
        id
        order
        title
        lessons {
          id
          order
          title
          content_type

          content_url

          article {
            id
            content
          }

          quiz {
            id
            title
            description
            questions {
              id
              question_text
              question_type

              options {
                id
                option_text
                # is_correct
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_COURSE = gql`
  query GetCourse($id: ID!) {
    course(id: $id) {
      instructor_id
      instructor {
        name
      }
      category {
        name
      }
      sub_category {
        name
      }
      language_details {
        name
      }
      category_id
      sub_category_id

      course_tags {
        id

        tag {
          id
          name
        }
      }

      chapters {
        lessons {
          id
          course_id
          chapter_id
          title
          content_type
          content_url

          article {
            id
            content
          }

          quiz {
            id
            title
            description
            questions {
              id
              question_text
              question_type
              options {
                id
                option_text
                is_correct
              }
            }
          }

          duration
          order
          createdAt
          updatedAt
        }
        id
        course_id
        title
        description
        total_duration
        order
        createdAt
      }
      # lessons
      # enrollments
      # course_reviews
      # course_tags
      faqs {
        id
        question
        answer
      }
      announcements {
        id
        message
        title
      }

      requirements {
        id
        description
      } # payments
      # certificates
      # wish_lists
      # messages
      # questions_and_answers
      id
      # instructor_id
      # instructor_full_name
      title
      description
      # category_id
      # sub_category_id
      price
      # duration
      language_id
      language
      level
      # rating
      thumbnail_image
      # number_of_chapters
      # number_of_lessons
      status
      trailer
      createdAt
      updatedAt
    }
  }
`;

export const BUY_COURSE = gql`
  mutation BuyCourse($input: BuyCourseInput) {
    buyCourse(input: $input) {
      message
      status
      data {
        checkout_url
      }
    }
  }
`;

export const GET_MY_COURSES = gql`
  query MyCourses($student_id: Int) {
    myCourses(student_id: $student_id) {
      id

      last_accessed_chapter_id
      last_accessed_lesson_id

      course {
        id
        # instructor_id
        instructor_full_name
        title
        # description
        # category_id
        # sub_category_id
        price
        duration
        # language_id
        language
        level
        # rating
        thumbnail_image
        # number_of_chapters
        number_of_lessons
        # status
        # trailer
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_COURSE_OVERVIEW_FOR_PLAYER1 = gql`
  query GetCourseOverview($id: ID!) {
    getCourseOverview(id: $id) {
      rating
      price
      # duration
      level
      language
      description

      requirements {
        description
      }

      instructor {
        id
        name
        bio
        experience_years
        expertise
        languages_spoken
        teaching_style
        courses_taught
        rating
        support_availability
        certifications
        achievements
      }
    }
  }
`;

export const GET_COURSE_OVERVIEW_FOR_PUBLIC = gql`
  query GetCourseOverviewForPublic($id: ID!) {
    getCourseOverviewForPublic(id: $id) {
      price
      # duration
      level
      language
      number_of_chapters
      number_of_lessons
    }
  }
`;

export const GET_COURSE_OVERVIEW1_FOR_PUBLIC = gql`
  query GetCourseOverview1ForPublic($id: ID!) {
    getCourseOverview1ForPublic(id: $id) {
      price
      # duration
      level
      language
      number_of_chapters
      number_of_lessons
      rating
      description
      instructor_full_name

      requirements {
        description
      }

      chapters {
        id
        order
        title
        lessons {
          id
          content_type
          title
        }
      }
    }
  }
`;

export const GET_COURSE_BASICS_FOR_PUBLIC = gql`
  query GetCourseBasicsForPublic($id: ID!) {
    getCourseBasicsForPublic(id: $id) {
      title
      trailer
      thumbnail_image
    }
  }
`;

export const GET_COURSE_INSTRUCTOR_FOR_PUBLIC = gql`
  query GetCourseInstructorForPublic($id: ID!) {
    getCourseInstructorForPublic(id: $id) {
      id
      user_id
      name
      bio
      experience_years
      expertise
      languages_spoken
      teaching_style
      courses_taught
      rating
      support_availability
      certifications
      achievements
    }
  }
`;

export const GET_COURSE_QA_FOR_PUBLIC = gql`
  query GetCourseQAForPublic($id: ID!) {
    getCourseQAForPublic(id: $id) {
      body
      answer
    }
  }
`;

export const GET_COURSE_NOTES_FOR_PUBLIC = gql`
  query GetCourseNotesForPublic($id: ID!) {
    getCourseNotesForPublic(id: $id) {
      body
      lesson_id
    }
  }
`;

export const GET_COURSE_ANNOUNCEMENTS_FOR_PUBLIC = gql`
  query GetCourseAnnouncementsForPublic(
    $getCourseAnnouncementsForPublicId: ID!
  ) {
    getCourseAnnouncementsForPublic(id: $getCourseAnnouncementsForPublicId) {
      id
      title
      message
    }
  }
`;

export const GET_COURSE_REVIEWS_FOR_PUBLIC = gql`
  query GetCourseReviewsForPublic($id: ID!) {
    getCourseReviewsForPublic(id: $id) {
      rating
      review_text
      id
    }
  }
`;

export const GET_COURSE_CARRICULUM_FOR_PUBLIC = gql`
  query GetCourseCarriculumForPublic($id: ID!) {
    getCourseCarriculumForPublic(id: $id) {
      lessons {
        id
        course_id
        chapter_id
        title
        content_type
        content_url

        article {
          id
          content
        }

        quiz {
          id
          title
          description
          questions {
            id
            question_text
            question_type
            options {
              id
              option_text
              is_correct
            }
          }
        }

        duration
        order
        createdAt
        updatedAt
      }
      id
      title
      description
      total_duration
      order
    }
  }
`;

export const GET_COURSE_BASICS_FOR_PLAYER = gql`
  query GetCourseBasicsForPlayer($id: ID!) {
    getCourseBasicsForPlayer(id: $id) {
      title
      trailer
      thumbnail_image
    }
  }
`;

export const GET_COURSE_QA_FOR_PLAYER = gql`
  query GetCourseQAForPlayer($id: ID!) {
    getCourseQAForPlayer(id: $id) {
      id
      title
      description

      createdAt

      student {
        id
        fullname
        firstname
        lastname
      }

      replies {
        id
        title
        description

        createdAt

        student {
          id
          fullname
          firstname
          lastname
        }
      }
    }
  }
`;

export const GET_COURSE_NOTES_FOR_PLAYER = gql`
  query GetCourseNotesForPlayer($lesson_id: Int, $student_id: Int) {
    getCourseNotesForPlayer(lesson_id: $lesson_id, student_id: $student_id) {
      id
      noted_on_minute
      body
      createdAt
    }
  }
`;

export const GET_COURSE_ANNOUNCEMENTS_FOR_PLAYER = gql`
  query GetCourseAnnouncementsForPlayer($id: ID!) {
    getCourseAnnouncementsForPlayer(id: $id) {
      id
      title
      message
      createdAt
    }
  }
`;

export const GET_COURSE_REVIEWS_FOR_PLAYER = gql`
  query GetCourseReviews($course_id: ID!) {
    getCourseReviews(course_id: $course_id) {
      course_rating
      no_of_ratings
      no_of_students
      reviews {
        id
        rating
        review_text
        student {
          id
          fullname
          firstname
          lastname
        }
        updatedAt
        createdAt
      }
    }
  }
`;

export const GET_COURSE_CARRICULUM_FOR_PLAYER = gql`
  query GetCourseCarriculumForPlayer($id: ID!) {
    getCourseCarriculumForPlayer(id: $id) {
      lessons {
        id
        course_id
        chapter_id
        title
        content_type
        content_url

        article {
          id
          content
        }

        quiz {
          id
          title
          description
          questions {
            id
            question_text
            question_type
            options {
              id
              option_text
              is_correct
            }
          }
        }

        courseProgress {
          id
          enrollment_id
          lesson_id
          watched_duration
          status
          last_accessed_date
          createdAt
        }

        duration
        order
        createdAt
        updatedAt
      }
      id
      title
      description
      total_duration
      order
    }
  }
`;

export const UPDATE_COURSE_PROGRESS = gql`
  mutation UpdateCourseProgress($input: UpdateCourseProgressInput) {
    updateCourseProgress(input: $input) {
      id
    }
  }
`;

export const UPDATE_ENROLLMENT_LAST_ACCESS_INFO = gql`
  mutation UpdateCourseLastAccessPosition(
    $input: UpdateCourseLastAccessPositionInput
  ) {
    updateCourseLastAccessPosition(input: $input)
  }
`;

export const CREATE_COURSE_QA = gql`
  mutation CreateQuestionAnswerAndComment(
    $input: CreateQuestionAnswerAndCommentInput
  ) {
    createQuestionAnswerAndComment(input: $input) {
      id
    }
  }
`;

export const CREATE_COURSE_NOTE = gql`
  mutation CreateCourseNote($input: CreateCourseNoteInput) {
    createCourseNote(input: $input) {
      id
    }
  }
`;

export const CREATE_COURSE_REVIEW = gql`
  mutation CreateCourseReview($input: CreateCourseReviewInput) {
    createCourseReview(input: $input) {
      id
    }
  }
`;

// export const CREATE_COURSE_QA = gql``;
// export const CREATE_COURSE_QA = gql``;
