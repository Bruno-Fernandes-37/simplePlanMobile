import { gql } from '@apollo/client';
import jwt_decode from 'jwt-decode';
import AsyncStorage  from '@react-native-async-storage/async-storage';

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
  getUser: gql`
    query Query($getUserId: ID) {
      getUser(id: $getUserId) {
        _id
        email
        username
        picture
        preferred_language
        role
      }
    }
  `,
  updateEmail: gql`
  mutation Mutation($updateUserInfosAsUserId: ID!, $email: String) {
    updateUserInfosAsUser(id: $updateUserInfosAsUserId, email: $email) {
      username
      email
    }
  }
  `,
  updateUsername: gql `
  mutation Mutation($updateUserInfosAsUserId: ID!, $username: String) {
    updateUserInfosAsUser(id: $updateUserInfosAsUserId, username: $username) {
      username
    }
  }
  `,
  updatePicture: gql `
  mutation Mutation($updateUserInfosAsUserId: ID!, $picture: String) {
    updateUserInfosAsUser(id: $updateUserInfosAsUserId, picture: $picture) {
      picture
      username
    }
  }
  `,
  updatePreferredLanguage: gql`
  mutation Mutation($updateUserInfosAsUserId: ID!, $preferredLanguage: String) {
    updateUserInfosAsUser(id: $updateUserInfosAsUserId, preferred_language: $preferredLanguage) {
      username
      preferred_language
    }
  }
  `,
  updatePassword : gql`
  mutation Mutation($updateUserInfosAsUserId: ID!, $password: String) {
    updateUserInfosAsUser(id: $updateUserInfosAsUserId, password: $password) {
      email
    }
  }
  `,
};