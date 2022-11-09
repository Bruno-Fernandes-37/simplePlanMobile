import { StyleSheet } from "react-native";
import { Colors } from "../../assets/styles/colors";

const styles = StyleSheet.create({
    container: {display: "flex", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingHorizontal: 8, marginBottom: 24},
    username: {color: "black", fontSize: 24, fontWeight: 'bold', textTransform: 'capitalize', marginBottom: 4},
    role: {color: Colors.veryPeri, fontSize: 16, fontWeight: '600', textTransform: 'capitalize', marginBottom: 4, textShadowColor: Colors.veryPeri, textShadowRadius: 2 }

});

export default styles;