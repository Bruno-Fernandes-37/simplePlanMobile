import { gql } from '@apollo/client';

export const PROJECTS = {
  get: gql`
    query projects {
      getProjects {
        _id
        name
        description
        status
        dueDate
        createdAt
        updatedAt
      }
    }
  `,
  getOne: gql`
    query GetProject($getProjectId: ID!) {
      getProject(id: $getProjectId) {
        _id
        name
        description
        status
        dueDate
        tasks {
          _id
          name
          description
          status
          labels {
            _id
            name
            color
          }
        }
        createdAt
        updatedAt
        projectManager {
          _id
          email
          username
          password
          picture
          preferred_language
        }
        developpers {
          _id
          email
          username
          password
          picture
          preferred_language
        }
      }
    }
  `,
  add: gql`
    mutation AddProject($name: String!, $description: String!, $dueDate: String!) {
      addProject(name: $name, description: $description, dueDate: $dueDate) {
        _id
        name
        description
        status
        dueDate
      }
    }
  `,
};