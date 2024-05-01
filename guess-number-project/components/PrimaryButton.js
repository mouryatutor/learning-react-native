import { Pressable, StyleSheet, Text, View } from "react-native";

function PrimaryButton(props) {

    function pressHandler() {
        console.log("pressed!")
    }

    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable style={({pressed}) => pressed ? [styles.pressed, styles.buttonInnerContainer] : styles.buttonInnerContainer} onPress={pressHandler} android_ripple={{color:"#640233"}}>
                    <Text style={styles.buttonText}>{props.children}</Text>
            </Pressable>
        </View>
    )
}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
        overflow:"hidden"
    },
    buttonInnerContainer: {
        backgroundColor: "#72063c",
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2
    },
    buttonText: {
        color: "white",
        textAlign: "center"
    },
    pressed: {  // style for iOS
        opacity: 0.75,

    }
})

