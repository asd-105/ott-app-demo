import react, { useEffect, useState } from "react";
import { Image, View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { VideoListItemData } from "../VideoListItem/VideoListItem";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";
import { COLORS } from "@/constants/Colors";
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { CatalogImage } from "../CatalogImage/CatalogImage";


export interface VideoItemDetailsPanelProps {
    itemData: VideoListItemData;
    onPanelClose: VoidFunction;
}

const { buttonActive, buttonInactive } = COLORS;
export const playButtonTitle = "Watch Now";

function useVideoItemDetailsPanelViewModel(id: string, streamUrl: string, title: string, onPanelClose: VoidFunction) {
    const [isCloseFocused, setIsCloseFocused] = useState(false);
    const [isPlayFocused, setIsPlayFocused] = useState(false);

    const [hasStreamError, setHasStreamError] = useState(false);

    const router = useRouter();

    const animatedCloseButtonColor = useSharedValue<string>(buttonInactive);
    const animatedCloseButtonScale = useSharedValue<number>(1);

    const animatedCloseButtonStyles = useAnimatedStyle(() => {
        return {
            transform: [{ scale: animatedCloseButtonScale.value }],
            backgroundColor: animatedCloseButtonColor.value,
        }
    });

    useEffect(() => {
        animatedCloseButtonScale.value = withTiming(isCloseFocused ? 1.05 : 1);
        animatedCloseButtonColor.value = withTiming(isCloseFocused ? buttonActive : buttonInactive);
    }, [isCloseFocused]);

    const handlePlayFocus = () => {
        setIsPlayFocused(true);
    };

    const handlePlayBlur = () => {
        setIsPlayFocused(false);
    };

    const handleCloseFocus = () => {
        setIsCloseFocused(true);
    }

    const handleCloseBlur = () => {
        setIsCloseFocused(false)
    }

    const onStreamError = () => {
        setHasStreamError(true);
    }

    const handlePlayPress = () => {
        if (hasStreamError) { return; }

        onPanelClose();
        router.navigate({
            pathname: "/player/[videoId]",
            params: {
                videoId: id,
                streamUrl,
                title
            }
        });
    };

    return {
        isCloseFocused,
        isPlayFocused,
        animatedCloseButtonStyles,
        hasStreamError,
        handlePlayFocus,
        handlePlayBlur,
        handlePlayPress,
        handleCloseFocus,
        handleCloseBlur,
        onStreamError,
    };
}

export const VideoItemDetailsPanel: React.FC<VideoItemDetailsPanelProps> = ({
    itemData: { id, title, description, thumbnail, streamUrl, duration },
    onPanelClose
}) => {

    const {
        isCloseFocused,
        isPlayFocused,
        hasStreamError,
        handlePlayBlur,
        handlePlayFocus,
        handlePlayPress,
        handleCloseFocus,
        handleCloseBlur,
        onStreamError,
    } = useVideoItemDetailsPanelViewModel(id, streamUrl, title, onPanelClose);

    return (
        <View style={styles.modalContainer}>
            <View style={styles.innerWrapper}>
                <View style={styles.contentContainer}>
                    <CatalogImage src={thumbnail} source={{ uri: thumbnail }} style={styles.thumbnail} />
                    <Text style={styles.title}>{title}</Text>
                    <ScrollView style={styles.descriptionContainer} >
                        <Text style={styles.description}>{description}</Text>
                    </ScrollView>
                    <Pressable
                        onPress={onPanelClose}
                        onFocus={handleCloseFocus}
                        onBlur={handleCloseBlur}
                        style={[styles.closeButton, isCloseFocused && styles.closeButtonFocused]}
                    >

                        <Text style={styles.closeButtonText}>Close</Text>

                    </Pressable>
                </View>
                <View style={styles.videoContainer}>
                    <VideoPlayer source={streamUrl} onError={onStreamError} />
                    <Pressable
                        style={[
                            styles.playButton,
                            isPlayFocused && !hasStreamError && styles.playButtonFocused,
                            hasStreamError && styles.playButtonDisabled
                        ]}
                        onPress={handlePlayPress}
                        onFocus={handlePlayFocus}
                        onBlur={handlePlayBlur}
                    >
                        <Text
                            style={[
                                styles.playButtonText,
                                hasStreamError && styles.playButtonTextDisabled
                            ]}>
                            {playButtonTitle}
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: COLORS.modalBackground,
        justifyContent: "center",
        alignItems: "center",
        padding: "3%",
    },
    innerWrapper: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.paneBackground,
        borderRadius: 16,
    },
    contentContainer: {
        borderRadius: 16,
        padding: "2%",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "column",
    },
    videoContainer: {
        height: "100%",
        maxWidth: "70%",
        borderRadius: 16,
        paddingHorizontal: "2%",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "column",
    },
    thumbnail: {
        width: "50%",
        height: "50%",
        borderRadius: 16,
        marginBottom: "2%",
        resizeMode: "contain",
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: "#fff",
        textAlign: "center",
        marginBottom: "2%",
    },
    descriptionContainer: {
    },
    description: {
        fontSize: 16,
        color: "#ccc",
        textAlign: "center",
        padding: 4,
    },
    closeButton: {
        paddingVertical: 8,
        paddingHorizontal: 36,
        borderRadius: 8,
        backgroundColor: COLORS.buttonInactive,
    },
    closeButtonFocused: {
        backgroundColor: COLORS.buttonActive,
        transform: [{ scale: 1.05 }],
        shadowColor: "#fff",
        shadowOpacity: 0.8,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.textLight,
        textAlign: "center",
    },
    playButton: {
        backgroundColor: COLORS.buttonInactive,
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: "38%",
    },
    playButtonFocused: {
        backgroundColor: COLORS.buttonActive,
        transform: [{ scale: 1.05 }],
    },
    playButtonDisabled: {
        backgroundColor: COLORS.buttonDisabled,
    },
    playButtonText: {
        fontSize: 16,
        fontWeight: "600",
        color: COLORS.textLight,
        textAlign: "center",
    },
    playButtonTextDisabled: {
        color: COLORS.textSecondary,
    }
});
