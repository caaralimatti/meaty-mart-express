import React from 'react';
import { View, Text, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: boolean;
  shadow?: boolean;
}

interface CardHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface CardContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

interface CardTitleProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  style, 
  padding = true,
  shadow = true 
}) => {
  const { colors } = useTheme();

  const cardStyle: ViewStyle = {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    ...(padding && { padding: 16 }),
    ...(shadow && {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    }),
  };

  return <View style={[cardStyle, style]}>{children}</View>;
};

export const CardHeader: React.FC<CardHeaderProps> = ({ children, style }) => {
  return (
    <View style={[{ marginBottom: 12 }, style]}>
      {children}
    </View>
  );
};

export const CardContent: React.FC<CardContentProps> = ({ children, style }) => {
  return <View style={style}>{children}</View>;
};

export const CardTitle: React.FC<CardTitleProps> = ({ children, style }) => {
  const { colors } = useTheme();
  
  const titleStyle: TextStyle = {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.cardForeground,
  };

  return <Text style={[titleStyle, style]}>{children}</Text>;
};