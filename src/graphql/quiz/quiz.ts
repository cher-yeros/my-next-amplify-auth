import { gql } from "@apollo/client";

export const SAVE_QUIZ_ATTEMPTS = gql`
  mutation SaveQuizAttempt($input: SaveQuizAttemptInput) {
    saveQuizAttempt(input: $input) {
      score
      correctAnswers
      totalQuestions
      attempts
    }
  }
`;

export const GET_QUIZ_ATTEMPT = gql`
  query GetQuizAttempt($input: GetQuizAttemptInput!) {
    getQuizAttempt(input: $input) {
      id
      student_id
      quiz_id
      score
      updatedAt
      attempts
    }
  }
`;
