import { COLORS } from "@/constants/Colors";
import { View, Text, StyleSheet, type ViewStyle, type TextStyle } from "react-native";

export interface ErrorCardProps {
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
}

export const ErrorCard: React.FC<ErrorCardProps> = ({ containerStyle, textStyle }) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={[styles.text, textStyle]}>
                Oops! Something went wrong.
            </Text>
            <Text style={[styles.text, textStyle]}>
                We couldn’t start the video. Please check back later or contact us for assistance.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        backgroundColor: COLORS.errorBackground,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 18,
        borderRadius: 16,
    },
    text: {
        fontSize: 18,
        fontStyle: "italic",
        textAlign: "justify"
    }
});
