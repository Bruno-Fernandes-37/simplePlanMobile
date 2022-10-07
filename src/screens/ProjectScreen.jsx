import { useQuery } from '@apollo/client';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { PROJECTS } from '../api/projects';
import { Colors } from '../assets/styles/colors';

export default function ProjectScreen({ route }) {

    const colorBorder = (status) => {
        switch (status) {
            case 'in progress':
                return styles.colorYellow;
            case 'late':
                return styles.colorMelonPastel;
            case 'done':
                return styles.colorGreenTea;
            default:
                return styles.colorGrey;
        }
    }

    const colorStatus = (status) => {
        switch (status) {
            case 'in progress':
                return styles.statusYellow;
            case 'late':
                return styles.statusMelonPastel;
            case 'done':
                return styles.statusGreenTea;
            default:
                return styles.statusGrey;
        }
    }

    const id = route.params && route.params.id

    const [project, setProject] = React.useState({});
    const [projectError, setProjectError] = React.useState('')

    const { data, loading } = useQuery(PROJECTS.getOne, { variables: { getProjectId: id } }, {
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
    

    const { name, status, dueDate, description, projectManager, developpers } = project
    let date = new Date(dueDate * 1).toDateString()

    return project && name && (
        <View>
            <Text style={styles.title}>{name}</Text>
            <View style={styles.header}>
                <View style={[styles.borderHaeder, colorBorder(status)]}>
                    <Text style={colorStatus(status)}>{status}</Text>
                </View>
                <View style={styles.borderHaeder}>
                    <Text>{date}</Text>
                </View>
            </View>
            <View>
                <Text style={styles.description}>{description}</Text>
            </View>
            <Text style={styles.manager}>Project Manager: {projectManager?.username}</Text>
            <View >
                <Text style={styles.dev}>Developper:</Text>
                {developpers.length && developpers.map((dev) => <Text style={styles.dev}>- {dev.username}</Text>)}
            </View>
            {projectError && <Text style={styles.errorText} >{projectError.toString()}</Text>}
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
    colorYellow: {
        borderColor: Colors.yellow,
        backgroundColor: Colors.bgYellow

    },
    colorMelonPastel: {
        borderColor: 'red',
        backgroundColor: Colors.melonPastel
    },
    colorGreenTea: {
        borderColor: 'green',
        backgroundColor: Colors.greenTea
    },
    colorGrey: {
        borderColor: Colors.grey,
        backgroundColor: Colors.bgGrey
    },
    statusYellow: {
        color: Colors.yellow,
    },
    statusMelonPastel: {
        color: 'red',
    },
    statusGreenTea: {
        color: 'green',
    },
    statusGrey: {
        color: 'balck',
    },
    borderHaeder: {
        alignItems: 'center',
        width: 180,
        padding: 20,
        borderWidth: 1,
        borderRadius: 10,
    },
    description: {
        margin: 15,
    },
    manager: {
        textTransform: 'capitalize',
        margin: 15,
    },
    dev: {
        marginStart: 15,

    },
    errorText: {
        marginTop: 10,
        color: Colors.pinkPastel,
        fontSize: 20,
        fontWeight: 'bold',
    },
})