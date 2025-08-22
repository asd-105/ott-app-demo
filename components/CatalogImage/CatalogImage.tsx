import { useState } from "react";
import {
    ActivityIndicator,
    View,
    Text,
    Image,
    StyleSheet,
    type ImageStyle,
    type ImageSourcePropType,
} from "react-native";

import { COLORS } from "@/constants/Colors";

export interface CatalogImageProps {
    src: string;
    style?: ImageStyle;
    source?: ImageSourcePropType;
}

export const CATALOG_IMAGE_TEST_ID = {
    loadingSpinner: "catalog-image-loading-spinner-test-id",
    image: "catalog-image-test-id",
}

export const imageErrorText = "Sorry, we could not load the image.";

function useCatalogImageViewModel() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    const handleError = () => {
        setError(true);
    };

    const handleOnLoadEnd = () => {
        setIsLoading(false);
    }

    return { isLoading, error, handleError, handleOnLoadEnd };
}

export const CatalogImage: React.FC<CatalogImageProps> = ({ src, style, source }) => {

    const { error, isLoading, handleError, handleOnLoadEnd } = useCatalogImageViewModel();

    return (
        <>
            {error ? (
                <View style={styles.thumbnailError}>
                    <Text style={styles.thumbnailErrorText}>
                        {imageErrorText}
                    </Text>
                </View>
            ) :
                <Image
                    src={src}
                    source={source}
                    style={style}
                    onError={handleError}
                    onLoadEnd={handleOnLoadEnd}
                    onLoad={handleOnLoadEnd}
                    testID={CATALOG_IMAGE_TEST_ID.image}
                />
            }
            {isLoading && !error &&
                <ActivityIndicator
                    testID={CATALOG_IMAGE_TEST_ID.loadingSpinner}
                    style={styles.loadingSpinner}
                    size="large"
                    color="#FEFEFE"
                />
            }
        </>
    );
}

const styles = StyleSheet.create({
    thumbnailError: {
        height: 200,
        width: 200,
        borderRadius: 16,
        backgroundColor: COLORS.errorBackground,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 18,
    },
    thumbnailErrorText: {
        fontSize: 18,
        fontStyle: "italic",
        textAlign: "justify"
    },
    loadingSpinner: {
        position: "absolute",
        top: "25%",
        left: "50%",
    },
});
