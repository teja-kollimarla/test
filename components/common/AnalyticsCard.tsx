import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ForiqenTheme } from '@/constants/theme';
import { LucideIcon } from 'lucide-react-native';

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  iconColor?: string;
}

export function AnalyticsCard({ title, value, change, icon: Icon, iconColor }: AnalyticsCardProps) {
  const isPositive = change?.startsWith('+');

  return (
    <LinearGradient
      colors={ForiqenTheme.gradients.card}
      style={styles.container}
    >
      <View style={styles.iconContainer}>
        <Icon size={24} color={iconColor || ForiqenTheme.colors.accent1} />
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
      {change && (
        <Text style={[styles.change, isPositive ? styles.positive : styles.negative]}>
          {change}
        </Text>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: ForiqenTheme.borderRadius.xl,
    padding: ForiqenTheme.spacing.lg,
    minWidth: 150,
    ...ForiqenTheme.shadows.card,
  },
  iconContainer: {
    marginBottom: ForiqenTheme.spacing.sm,
  },
  title: {
    fontSize: ForiqenTheme.fontSize.sm,
    color: ForiqenTheme.colors.gray,
    marginBottom: ForiqenTheme.spacing.xs,
  },
  value: {
    fontSize: ForiqenTheme.fontSize.xxl,
    fontWeight: '700' as const,
    color: ForiqenTheme.colors.white,
    marginBottom: ForiqenTheme.spacing.xs,
  },
  change: {
    fontSize: ForiqenTheme.fontSize.sm,
    fontWeight: '600' as const,
  },
  positive: {
    color: ForiqenTheme.colors.accent2,
  },
  negative: {
    color: '#FF4444',
  },
});
