import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation LoginUser($input: LoginInput!) {
    loginUser(input: $input) {
      token
      user {
        id
        phone
        firstname
        lastname
        email
        role

        is_corporate_user
        corporate_id
      }
    }
  }
`;

export const SIGN_UP_USER = gql`
  mutation RegisterUser($input: RegisterUserInput) {
    registerUser(input: $input) {
      id
      role
    }
  }
`;
