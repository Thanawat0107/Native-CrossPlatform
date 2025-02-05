import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SIZES } from '../../constants/themes';

interface InfoTextProps {
  label: string;
  value: string | number | string[] | undefined;
}

const InfoText = ({ label, value }: InfoTextProps) => {
  if (!value) return null;

  const textContent = Array.isArray(value) ? value.join(", ") : value;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{textContent}</Text>
    </View>
  )
}

export default InfoText

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  label: {
    fontFamily: "bold",
    marginBottom: 5,
    fontSize: SIZES.medium,
  },
  value: {
    fontFamily: "regular",
    fontSize: SIZES.small,
    textAlign: "justify",
  },
});