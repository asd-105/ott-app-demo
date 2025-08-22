import react, { useEffect } from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { COLORS } from "@/constants/Colors";
import { CatalogImage } from "../CatalogImage/CatalogImage";

export interface VideoListItemData {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    streamUrl: string;
    duration: number;
}

export interface VideoListItemProps extends VideoListItemData {
    isFocused: boolean;
    onFocus: (itemId: string) => void;
    onPress: (item: VideoListItemData) => void;
}

const { itemActive, itemInactive } = COLORS;

export const VIDEO_LIST_ITEM_TEST_ID = {
    pressable: "video-list-item-pressable-test-id"
}

function useVideoSectionListItemViewModel(
    isFocused: boolean,
    id: string,
    title: string,
    description: string,
    thumbnail: string,
    streamUrl: string,
    duration: number,
    onFocus: (itemId: string) => void,
    onPress: (item: VideoListItemData) => void
) {
    const styles = getStyles();

    const animatedScale = useSharedValue<number>(1);
    const animatedBackgroundColor = useSharedValue<string>(itemInactive);

    const animatedContainerStyles = useAnimatedStyle(() => {
        return {
            transform: [{ scale: animatedScale.value }],
            backgroundColor: animatedBackgroundColor.value,
        }
    });

    useEffect(() => {
        animatedScale.value = withTiming(isFocused ? 1.05 : 1);
        animatedBackgroundColor.value = withTiming(isFocused ? itemActive : itemInactive);
    }, [isFocused]);

    const handleFocus = () => {
        onFocus(id);
    };

    const handlePress = () => {
        onPress({
            id,
            title,
            description,
            thumbnail,
            streamUrl,
            duration
        })
    }

    return {
        styles,
        isFocused,
        animatedContainerStyles,
        handleFocus,
        handlePress
    };
}

export const VideoListItem: React.FC<VideoListItemProps> = ({
    id,
    title,
    description,
    thumbnail, streamUrl,
    duration,
    isFocused,
    onFocus,
    onPress
}) => {
    const {
        styles,
        animatedContainerStyles,
        handleFocus,
        handlePress
    } = useVideoSectionListItemViewModel(
        isFocused,
        id,
        title,
        description,
        thumbnail,
        streamUrl,
        duration,
        onFocus,
        onPress
    );

    return (
        <Animated.View style={[styles.contentContainer, animatedContainerStyles]}>
            <Pressable
                style={styles.wrapper}
                onFocus={handleFocus}
                tvFocusable
                focusable
                onPress={handlePress}
                testID={VIDEO_LIST_ITEM_TEST_ID.pressable}
            >
                <CatalogImage
                    source={{ uri: thumbnail }}
                    src={thumbnail}
                    style={styles.itemImage}
                />
                <Text style={styles.textTitle}>
                    {title}
                </Text>
                <Text style={styles.textDescription}>
                    {description}
                </Text>
            </Pressable>
        </Animated.View>
    );
}

const getStyles = () => StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
    },
    contentContainer: {
        flex: 1,
        margin: 8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        padding: 8,
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 3,
        lineHeight: 26,
        color: COLORS.textNormal,
    },
    textDescription: {
        color: COLORS.textSecondary,
    },
    itemImage: {
        height: 200,
        width: 200
    },
})