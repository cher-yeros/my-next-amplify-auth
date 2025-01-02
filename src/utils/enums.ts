// 1. User Types / User Roles
export const UserRole = Object.freeze({
  STUDENT: "Student",
  INSTRUCTOR: "Instructor",
  ADMIN: "Admin",
  SUPER_ADMIN: "Super Admin",
});

// 2. Course Level
export const CourseLevel = Object.freeze({
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
  ALL_LEVEL: "All Level",
});

// 3. Course Status
export const CourseStatus = Object.freeze({
  DRAFTED: "Drafted",
  PUBLISHED: "Published",
  ARCHIVED: "Archived",
});

// 4. Lesson Content Type
export const LessonContentType = Object.freeze({
  VIDEO: "Video",
  ARTICLE: "Article",
  QUIZ: "Quiz",
});

// 5. Enrollment Status
export const EnrollmentStatus = Object.freeze({
  ACTIVE: "Active",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
});

// 6. Payment Status
export const PaymentStatus = Object.freeze({
  PENDING: "Pending",
  COMPLETED: "Completed",
  FAILED: "Failed",
});

// 7. Course Progress Status
export const CourseProgressStatus = Object.freeze({
  NOT_STARTED: "Not Started",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
});

// 8. Coupon Discount Type
export const CouponDiscountType = Object.freeze({
  FLAT: "Flat",
  RATE: "Rate",
});

// 9. User Activity Log Types
export const UserActivityLogType = Object.freeze({
  START_COURSE: "Start Course",
  WATCH_LESSON: "Watch Lesson",
  COMPLETE_LESSON: "Complete Lesson",
  PAUSE_LESSON: "Pause Lesson",
  RESUME_LESSON: "Resume Lesson",
  COMPLETE_COURSE: "Complete Course",
});

// 10. Quiz Question Types
export const QuizQuestionType = Object.freeze({
  MULTIPLE_CHOICE: "Multiple Choice",
  ONE_CHOICE: "One Choice",
});
