import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ForiqenTheme } from '@/constants/theme';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  style?: object;
}

export function GradientButton({ title, onPress, style }: GradientButtonProps) {
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 5,
    }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleAnim }] }, style]}>
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <LinearGradient
          colors={ForiqenTheme.gradients.button}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.button, ForiqenTheme.shadows.glow]}
        >
          <Text style={styles.text}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: ForiqenTheme.spacing.md,
    paddingHorizontal: ForiqenTheme.spacing.xl,
    borderRadius: ForiqenTheme.borderRadius.round,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: ForiqenTheme.fontSize.md,
    fontWeight: '700' as const,
    color: ForiqenTheme.colors.white,
  },
});
