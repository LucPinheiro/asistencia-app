// components/ThemedView.tsx
import React from 'react';
import { View, type ViewProps } from 'react-native';
import useThemeColors from '../hooks/useThemeColors';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  // Hacemos la prop opcional (para que NO sea obligatoria)
  useThemeColors?: boolean;
  children?: React.ReactNode;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  // Alias para no chocar con el nombre del hook 'useThemeColors'
  useThemeColors: enableTheme = true,
  ...otherProps
}: ThemedViewProps) {
  // Si enableTheme está activo, pedimos colores al hook; si no, sin fondo temático
  const colors = enableTheme
    ? useThemeColors({ light: lightColor, dark: darkColor }, 'background')
    : undefined;

  return (
    <View
      style={[
        colors ? { backgroundColor: colors.background } : null,
        style,
      ]}
      {...otherProps}
    />
  );
}
