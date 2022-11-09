import { Colors } from "../../assets/styles/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: "auto",
        height: "auto",
        display: 'flex',
        margin: 8,
        alignItems: 'flex-start',
    },
    image: {
        opacity: 1,
        width: 100,
        height: 100,
        borderRadius: 50,
        resizeMode: 'cover',
    },
    imagePressing : {
        opacity: 0.5,
    }
})

export default styles;