import react from "react";
import { Modal, StyleSheet, View } from "react-native";
import { VideoItemDetailsPanel } from "../VideoItemDetailsPanel/VideoItemDetailsPanel";
import type { Nullable } from "@/constants/types";
import type { VideoListItemData } from "../VideoListItem/VideoListItem";

export interface CatalogModalProps {
    isOpen: boolean;
    modalItem: Nullable<VideoListItemData>;
    onClose: VoidFunction;
}

export const CatalogModal: React.FC<CatalogModalProps> = ({ isOpen, modalItem, onClose }) => {
    return (
        <Modal
            animationType="fade"
            visible={isOpen}
            onRequestClose={onClose}
            transparent
        >
            <View style={styles.modalBackground}>
                {modalItem && (
                    <VideoItemDetailsPanel itemData={modalItem} onPanelClose={onClose} />
                )}
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});
