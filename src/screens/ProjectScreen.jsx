import { useQuery } from '@apollo/client';
import React from 'react'
import { Text } from 'react-native'
import { PROJECTS } from '../api/projects';

export default function ProjectScreen({route}) {
   
    const id = route.params && route.params.id

    const [project, setProject] = React.useState([]);
    const [projectError, setProjectError] = React.useState('')

    const { data, loading } = useQuery(PROJECTS.getOne, {variables: {getProjectId: id}}, {
        onError: (err) => {
            setProjectError(err);
        }
    });

    React.useEffect(() => {
        if (!loading) {
            setProject(data.getProject);
            setProjectError('');
        }
        return
    }, [data])


  return (
    <>
    <Text>un project {project._id}</Text>
    {projectError && <Text style={styles.errorText} >{projectError.toString()}</Text>}
    </>
   
  )
}
