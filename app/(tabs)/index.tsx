// import { calculateKnitting } from "@/src/domain/calculators/new-calculators";
import { decrease, increase } from "@/src/domain/calculators/calculators";
import { useState } from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function CalculatorMockScreen() {
  const [incStitches, setIncStitches] = useState("0");
  const [increases, setIncreases] = useState("0");

  const [decStitches, setDecStitches] = useState("0");
  const [decreases, setDecreases] = useState("0");

  const [resultIncrease, setResultIncrease] = useState("");
  const [resultDecrease, setResultDecrease] = useState("");

  // const { calculate, result, error } = useKnittingCalculator();

  // const handleCalculate = () => {
  //   try {
  //     setError(null);
  //     const res = calculateKnitting(Number(stitches), Number(changes), operation);
  //     setResult(res);
  //   } catch (err: any) {
  //     setError(err.message);
  //     setResult(null);
  //   }
  // }

  const handleCalculateIncrease = () => {
    const res = increase(Number(incStitches), Number(increases));
    setResultIncrease(res);
  }

  const handleCalculateDecrease = () => {
    const res = decrease(Number(decStitches), Number(decreases));
    setResultDecrease(res);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>[Mock] Calculadora de Pontos</Text>

      <Text style={styles.subTitle}>Calculadora de Aumentos</Text>

      <Text style={styles.label}>Pontos Atuais:</Text>
      <TextInput
        value={incStitches}
        onChangeText={setIncStitches}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Aumentos:</Text>
      <TextInput
        value={increases}
        onChangeText={setIncreases}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button title="Calcular aumentos" onPress={handleCalculateIncrease} />

      {/* Resultado aumentos */}
      {resultIncrease && (
        <View style={styles.resultBox}>
          <Text style={styles.bold}>Resultado: </Text>
          <Text>Pontos iniciais: {incStitches}</Text>
          <Text>Pontos finais: {Number(incStitches) + Number(increases)}</Text>

          <Text style={[styles.bold, {marginTop: 10}]}>Instrução:</Text>
          <Text style={styles.instructionText}>{resultIncrease}</Text>
        </View>
      )}

      <Text style={styles.subTitle}>Calculadora de Diminuições</Text>

      <Text style={styles.label}>Pontos Atuais:</Text>
      <TextInput
        value={decStitches}
        onChangeText={setDecStitches}
        keyboardType="numeric"
        style={styles.input}
      />

      <Text style={styles.label}>Diminuições:</Text>
      <TextInput
        value={decreases}
        onChangeText={setDecreases}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button title="Calcular diminuições" onPress={handleCalculateDecrease} />

      {/* Resultado diminuições */}
      {resultDecrease && (
        <View style={styles.resultBox}>
          <Text style={styles.bold}>Resultado:</Text>
          <Text>Pontos iniciais: {decStitches}</Text>
          <Text>Pontos finais: {Number(decStitches) - Number(decreases)}</Text>

          <Text style={[styles.bold, {marginTop: 10}]}>Instruções:</Text>
          <Text style={styles.instructionText}>{resultDecrease}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  subTitle: { fontSize: 15, fontWeight: "bold", marginBottom: 15 },
  label: { marginTop: 10, fontSize: 12 },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginVertical: 5 },
  row: { marginVertical: 10 },
  errorBox: { padding: 10, backgroundColor: "#ffcccc", marginTop: 15 },
  errorText: { color: "#990000" },
  resultBox: { padding: 10, backgroundColor: "#e6ffe6", marginTop: 15 },
  bold: { fontWeight: "bold", marginTop: 5 },
  instructionText: { fontSize: 14, color: "#2e7d32", marginTop: 4, fontStyle: "italic" }
});