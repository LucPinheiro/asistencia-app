import React from 'react';
import { View, type ViewProps } from 'react-native';
import useThemeColors from '../hooks/useThemeColors';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  useThemeColors?: boolean;
  children?: React.ReactNode;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  useThemeColors: enableTheme = true,
  ...otherProps
}: ThemedViewProps) {
  const colors = enableTheme
    ? useThemeColors({ light: lightColor, dark: darkColor }, 'background')
    : undefined;

  return <View style={[colors ? { backgroundColor: colors.background } : null, style]} {...otherProps} />;
}
