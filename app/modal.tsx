import { StyleSheet, Text } from 'react-native';


export default function ModalScreen() {
  return (
    // <ThemedView style={styles.container}>
    //   <ThemedText type="title">This is a modal</ThemedText>
    //   <Link href="/" dismissTo style={styles.link}>
    //     <ThemedText type="link">Go to home screen</ThemedText>
    //   </Link>
    // </ThemedView>
    <Text>Sua bunda modal</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
