import react from "react";
import { FlatList, View } from "react-native"
import { VideoListItem, type VideoListItemData } from "../VideoListItem/VideoListItem";
import type { Nullable } from "@/constants/types";


export interface VideoFlatListProps {
    listItems: VideoListItemData[];
    focusedItem: Nullable<string>;
    handleItemFocus: (itemId: string) => void;
    handleItemPress: (item: VideoListItemData) => void;
}

export const VideoFlatList: React.FC<VideoFlatListProps> = ({
    listItems,
    focusedItem,
    handleItemFocus,
    handleItemPress
}) => {
    return (
        <View>
            <FlatList
                hasTVPreferredFocus
                focusable
                isTVSelectable
                data={listItems}
                renderItem={({ item }) =>
                    <VideoListItem
                        {...item}
                        onFocus={handleItemFocus}
                        onPress={handleItemPress}
                        isFocused={item.id === focusedItem}
                    />}
                numColumns={2}
            />
        </View>
    );
}
