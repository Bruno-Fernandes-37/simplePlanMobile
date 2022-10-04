import { gql } from '@apollo/client';

export const USERS = {
  login: gql`
    mutation Mutation($email: String!, $password: String!) {
      login(email: $email, password: $password)
    }
  `,
  register: gql`
    mutation Mutation($email: String!, $password: String!, $username: String!) {
      addUser(email: $email, password: $password, username: $username) {
        token
        email
      }
    }
  `,
};