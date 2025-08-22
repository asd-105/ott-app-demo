import { useEvent } from 'expo';
import { useVideoPlayer, VideoSource, VideoView } from 'expo-video';
import { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, DimensionValue } from 'react-native';
import { ErrorCard } from '../ErrorCard/ErrorCard';

export interface PlayerDimensions {
    width: DimensionValue;
    height: DimensionValue;
}

export interface VideoPlayerProps {
    source: VideoSource;
    playerDimensions?: PlayerDimensions;
    onError?: VoidFunction;
}

function useVideoPlayerViewModel(
    source: VideoSource,
    playerDimensions?: PlayerDimensions,
    onError?: VoidFunction
) {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const styles = getStyles(playerDimensions);

    const player = useVideoPlayer(source, player => {
        player.loop = false;
        player.play();
    });

    const { isPlaying, } = useEvent(player, 'playingChange', { isPlaying: player.playing });
    const { status, error } = useEvent(player, 'statusChange', { status: player.status });

    useEffect(() => {
        setIsLoading(status === "loading");

        if (error) {
            onError && onError();
            setIsLoading(false);
            setIsError(true);
        }
    }, [status, error]);

    const handlePlayerPress = () => {
        if (isPlaying) {
            player.pause();
        } else {
            player.play();
        }
    }

    const handleVideoReady = () => {
        setIsLoading(false);
    }

    return {
        player,
        isLoading,
        isError,
        styles,
        handlePlayerPress,
        handleVideoReady,
    }
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ source, playerDimensions, onError }) => {
    const {
        player,
        isLoading,
        isError,
        styles,
        handleVideoReady,
    } = useVideoPlayerViewModel(source, playerDimensions, onError);

    return (
        <View style={styles.contentContainer}>
            {!isError && (<VideoView
                style={[
                    styles.video,
                    playerDimensions ?
                        { height: playerDimensions.height, width: playerDimensions.width } :
                        styles.contentDimensions
                ]}
                player={player}
                allowsFullscreen
                allowsPictureInPicture
                onFirstFrameRender={handleVideoReady}
            />)}
            {isLoading && (<View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FEFEFE" />
            </View>)}
            {isError && (
                <View style={styles.errorContainer}>
                    <ErrorCard />
                </View>
            )}
        </View>
    );
}

const getStyles = (dimensions: PlayerDimensions | undefined) => StyleSheet.create({
    contentContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: dimensions ? dimensions.width : "100%",
        height: dimensions ? dimensions.height : undefined,
    },
    contentDimensions: {
        width: "100%",
        height: "80%",
    },
    loadingContainer: {
        position: "absolute",
        flex: 1,
        height: "100%",
        width: "100%",
        justifyContent: "center",
    },
    errorContainer: {
        position: "absolute",
        flex: 1,
        width: dimensions ? dimensions.width : "90%",
        height: dimensions ? dimensions.height : "80%",
        minHeight: 200,
        justifyContent: "center",
    },
    video: {
        width: dimensions ? dimensions.width : "100%",
        height: dimensions ? dimensions.height : "80%",
        borderRadius: 16,
    }
});