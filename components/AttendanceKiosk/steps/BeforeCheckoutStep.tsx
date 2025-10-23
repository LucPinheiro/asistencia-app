// components/AttendanceKiosk/steps/BeforeCheckoutStep.tsx
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect, useRef, useState } from "react";
import { Button, Switch, Text, TextInput, View } from "react-native";
import { SuccessModal } from "../../ui/SuccessModal";
import styles from "../AttendanceStyles";
import { BeforeCheckoutStepProps } from "./AttendanceStepTypes";

export function BeforeCheckoutStep({
  workedHours,
  onCheckOut,
  onChangeTask,
  loading,
  timer,
  formatTimer,
  observaciones,
  setObservaciones,
  avanceInput,
  setAvanceInput,
  selectedProject,
  selectedTask,
}: BeforeCheckoutStepProps & { selectedProject?: any; selectedTask?: any }) {
  // Refs/estados
  const observacionesRef = useRef("");
  const [avanceSwitch, setAvanceSwitch] = useState(false);

  // Estados/refs para el modal de éxito
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const advanceAfterSuccess = useRef(false);

  useEffect(() => {
    observacionesRef.current = observaciones;
  }, [observaciones]);

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16, marginTop: 16 }}>
      <View style={{ width: "100%", maxWidth: 400, alignSelf: "center" }}>
        {!!workedHours && (
          <Text style={{ textAlign: "center", marginBottom: 16, color: "#1976d2", fontWeight: "bold" }}>
            Bolsa de horas: {workedHours}
          </Text>
        )}

        <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
          <Text style={[styles.message, { textAlign: "center" }]}>¿Registrar salida?</Text>
        </View>

        <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
          <View style={[styles.centered, { width: "100%", alignItems: "center", justifyContent: "center" }]}>
            <Text style={styles.timerLabel}>Contador:</Text>
            <Text style={styles.timer}>{formatTimer(timer)}</Text>
          </View>
        </View>

        {selectedProject && selectedTask && (
          <View
            style={{
              backgroundColor: "#f5f5f5",
              borderRadius: 8,
              padding: 12,
              marginBottom: 16,
              borderWidth: 1,
              borderColor: "#e0e0e0",
            }}
          >
            <Text style={{ color: "#888", fontWeight: "bold", fontSize: 13, marginBottom: 2 }}>
              Proyecto actual:
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 6 }}>
              {selectedProject.label || selectedProject.value || selectedProject.name}
            </Text>
            <Text style={{ color: "#888", fontWeight: "bold", fontSize: 13, marginBottom: 2 }}>
              Actividad actual:
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 8 }}>
              {selectedTask.label || selectedTask.value || selectedTask.name}
            </Text>
          </View>
        )}

        {typeof avanceInput !== "undefined" && typeof setAvanceInput === "function" && (
          <View style={{ marginVertical: 5, width: "100%", alignItems: "center", justifyContent: "center" }}>
            <View style={{ flexDirection: "row", width: "100%", marginBottom: 4, alignItems: "center" }}>
              <View style={{ flex: 7, justifyContent: "center" }}>
                <Text style={[styles.message, { textAlign: "left", marginLeft: 2 }]}>Avance</Text>
              </View>
              <View style={{ flex: 3, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                <Text style={{ fontSize: 15, color: "#888", fontWeight: "bold", textAlign: "center", marginLeft: 2 }}>
                  Calidad
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: "row", width: "100%", alignItems: "center", justifyContent: "center" }}>
              <View style={{ flex: 6 }}>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: "#ccc",
                    borderRadius: 8,
                    padding: 8,
                    marginBottom: 12,
                    width: "100%",
                    fontSize: 16,
                    textAlign: "left",
                  }}
                  placeholder="Porcentaje de avance..."
                  value={avanceInput}
                  onChangeText={setAvanceInput}
                  keyboardType="numeric"
                />
              </View>
              <View style={{ flex: 3, alignItems: "center", justifyContent: "center" }}>
                <Switch
                  value={avanceSwitch}
                  onValueChange={setAvanceSwitch}
                  trackColor={{ false: "#767577", true: "#81b0ff" }}
                  thumbColor={avanceSwitch ? "#f5dd4b" : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                />
              </View>
            </View>
          </View>
        )}

        <View style={{ marginVertical: 5, width: "100%", alignItems: "center" }}>
          <Text style={[styles.message, { textAlign: "center" }]}>Observaciones:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 8,
              marginBottom: 12,
              width: "100%",
              fontSize: 16,
              minHeight: 80,
              textAlignVertical: "top",
              textAlign: "left",
            }}
            placeholder="Describe lo realizado en esta actividad..."
            value={observaciones}
            onChangeText={(text) => {
              observacionesRef.current = text;
              setObservaciones(text);
            }}
            multiline
          />
        </View>

        <View style={[styles.buttonRow, { justifyContent: "center", width: "100%", alignItems: "center" }]}>
          <View style={[styles.button, { backgroundColor: "#b71c1c" }]}>
            <Button
              title="Salida"
              color="#b71c1c"
              onPress={() => {
                onCheckOut(observacionesRef.current, avanceSwitch);
                // (opcional) para mostrar el modal:
                // setSuccessMessage("Salida registrada con éxito");
                // setSuccessModalVisible(true);
                // advanceAfterSuccess.current = true;
              }}
              disabled={loading}
            />
          </View>

          <View
            style={[
              styles.button,
              { backgroundColor: "#FFA726", flexDirection: "row", alignItems: "center", justifyContent: "center" },
            ]}
          >
            <MaterialIcons name="autorenew" size={22} color="#fff" style={{ marginRight: 6 }} />
            <Button title="Cambiar actividad" color="#FFA726" onPress={() => onChangeTask()} />
          </View>
        </View>
      </View>

      <SuccessModal
        visible={successModalVisible}
        message={successMessage}
        onClose={() => {
          setSuccessModalVisible(false);
          if (advanceAfterSuccess.current) {
            advanceAfterSuccess.current = false;
          }
        }}
      />
    </View>
  );
}
