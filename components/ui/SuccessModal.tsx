// components/ui/SuccessModal.tsx
import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

type SuccessModalProps = {
  visible: boolean;
  message?: string | null;
  onClose: () => void;
  hideTitle?: boolean;
};

export const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  message,
  onClose,
  hideTitle,
}) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
    <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", alignItems: "center" }}>
      <View style={{ backgroundColor: "white", borderRadius: 12, padding: 20, minWidth: 280 }}>
        {!hideTitle && <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8 }}>Éxito</Text>}
        {!!message && <Text style={{ marginBottom: 16 }}>{message}</Text>}
        <Pressable onPress={onClose} style={{ alignSelf: "flex-end", paddingVertical: 8, paddingHorizontal: 12 }}>
          <Text style={{ fontWeight: "600" }}>Cerrar</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
);

export default SuccessModal;
