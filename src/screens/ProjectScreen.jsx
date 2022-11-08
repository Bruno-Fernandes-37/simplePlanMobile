import { useQuery } from '@apollo/client';
import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { PROJECTS } from '../api/projects';
import { Colors } from '../assets/styles/colors';
import DueDate from '../components/date/DueDate';
import Status from '../components/status/Status';
import User from '../components/user/User';

export default function ProjectScreen({ route }) {



    const id = route.params && route.params.id

    const [project, setProject] = React.useState({});
    const [projectError, setProjectError] = React.useState('')

    const { data, loading } = useQuery(PROJECTS.getOne, { variables: { getProjectId: id } }, {
        onError: (err) => {
            setProjectError(err);
        }
    });

    // returns a style with a coloured border depending on the status of the project
    React.useEffect(() => {
        if (!loading) {
            setProject(data.getProject);
            setProjectError('');
        }
        return
    }, [data])


    const { name, status, dueDate, description, projectManager, developpers } = project

    return project && name && (
        <View>
             <ScrollView>
            <Text style={styles.title}>{name}</Text>
            <View style={styles.header}>
                <Status status={status} />
                <DueDate dueDate={dueDate} />
            </View>
            <View style={styles.containerDescription}>
                <Text style={styles.description}>{description}</Text>
            </View>
            <View>
                <Text style={styles.manager}>Project Manager: </Text>
                <User user={projectManager} />
            </View>
            
            <View >
                <Text style={styles.dev}>Developper:</Text>
                {developpers.length && developpers.map((developper) => <User user={developper} />)}
            </View>
            {projectError && <Text style={styles.errorText} >{projectError.toString()}</Text>}
             </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.veryPeri,
        margin: 30,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 35,
    },
    containerDescription: {
        padding: 10,
        backgroundColor: Colors.white,
        
    },
    description: {
        margin: 15,
    },
    manager: {
        margin: 15,
    },
    dev: {
        margin: 15,
    },
    errorText: {
        marginTop: 10,
        color: Colors.pinkPastel,
        fontSize: 20,
        fontWeight: 'bold',
    },
})