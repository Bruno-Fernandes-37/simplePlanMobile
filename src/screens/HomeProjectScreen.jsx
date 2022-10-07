import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { FlatList, StyleSheet, Text, View, SafeAreaView } from 'react-native'
import { useQuery } from '@apollo/client';
import AppLoading from 'expo-app-loading';

import CardProject from '../components/cardProjects/CardProject';
import { Colors } from '../assets/styles/colors';
import { PROJECTS } from '../api/projects';


export default function HomeProjectScreen() {

    const [projects, setProjects] = React.useState([]);
    const [projectError, setProjectError] = React.useState('')

    let projectsActif = []
    let projectsNotStarted = []
    let projectsArchived = []

    const { data, loading } = useQuery(PROJECTS.get, {
        onError: (err) => {
            setProjectError(err);
        }
    });

    React.useEffect(() => {
        if (!loading) {
            setProjects(data.getProjects);
            setProjectError('');
        }
        return
    }, [data])


    projectsActif = projects.filter((project) => project.status === 'in progress' || project.status === 'late' || project.status === 'done')
    projectsNotStarted = projects.filter((project) => project.status === 'not started')
    projectsArchived = projects.filter((project) => project.status === 'archived')

    const renderProjects = ({ item }) => <CardProject name={item.name} status={item.status} dueDate={item.dueDate} id={item._id}/>;

    return (
        <SafeAreaView style={styles.androidSafeArea}>
            <StatusBar style="auto" />
            <View>
                <Text style={styles.title}>Your projects</Text>
                <View style={styles.containerList}>
                    <Text style={styles.text}>In progress</Text>

                    {loading ?
                        <AppLoading onError={console.warn} />
                        :
                        <FlatList
                            style={styles.card}
                            data={projectsActif}
                            renderItem={renderProjects}
                            keyExtractor={item => item.id}
                            horizontal={true}
                        />}
                </View>
                <View style={styles.containerList}>
                    <Text style={styles.text}>Coming soon</Text>
                    {loading ?
                        <AppLoading onError={console.warn} />
                        :
                        <FlatList
                            style={styles.card}
                            data={projectsNotStarted}
                            renderItem={renderProjects}
                            keyExtractor={item => item.id}
                            horizontal={true}
                        />}
                </View>
                <View style={styles.containerList}>
                    <Text style={styles.text}>Archived</Text>
                    {loading ?
                        <AppLoading onError={console.warn} />
                        :
                        <FlatList
                            style={styles.card}
                            data={projectsArchived}
                            renderItem={renderProjects}
                            keyExtractor={item => item.id}
                            horizontal={true}
                        />}
                </View>
                {projectError && <Text style={styles.errorText} >{projectError.toString()}</Text>}
            </View >
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    androidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.veryPeri,
        margin: 15,
    },
    text: {
        margin: 5,
        paddingLeft: 10,
        fontSize: 20,
        color: Colors.veryPeri
    },
    errorText: {
        marginTop: 10,
        color: Colors.pinkPastel,
        fontSize: 20,
        fontWeight: 'bold',
    },
    card: {
        marginLeft: 10,
    }
})