import React from 'react';
import { 
  TextInput, 
  View, 
  Text, 
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle 
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  labelStyle,
  errorStyle,
  style,
  ...props
}) => {
  const { colors } = useTheme();

  const inputStyle: TextStyle = {
    borderWidth: 1,
    borderColor: error ? colors.destructive : colors.border,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: colors.background,
    color: colors.foreground,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[{ color: colors.foreground, fontSize: 16, fontWeight: '500', marginBottom: 8 }, labelStyle]}>
          {label}
        </Text>
      )}
      <TextInput
        style={[inputStyle, style]}
        placeholderTextColor={colors.mutedForeground}
        {...props}
      />
      {error && (
        <Text style={[{ color: colors.destructive, fontSize: 14, marginTop: 4 }, errorStyle]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});