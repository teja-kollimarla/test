import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { ForiqenTheme } from '@/constants/theme';
import { mockBrands } from '@/mocks/data';

export default function InfluencerBrandsScreen() {
  const insets = useSafeAreaInsets();

  const { data: brands } = useQuery({
    queryKey: ['influencer-brands'],
    queryFn: async () => mockBrands.filter(b => b.openToContributions),
  });

  return (
    <LinearGradient colors={ForiqenTheme.gradients.hero} style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + ForiqenTheme.spacing.md }]}>
        <Text style={styles.headerTitle}>Brands</Text>
        <Text style={styles.headerSubtitle}>Open to Free Contributions</Text>
      </View>

      <ScrollView style={styles.content}>
        {brands?.map((brand) => (
          <TouchableOpacity key={brand.id}>
            <LinearGradient colors={ForiqenTheme.gradients.card} style={styles.brandCard}>
              <Text style={styles.brandName}>{brand.name}</Text>
              <Text style={styles.brandIndustry}>{brand.industry}</Text>
              <View style={styles.badgeContainer}>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>OPEN TO CONTRIBUTIONS</Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: ForiqenTheme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: ForiqenTheme.colors.accent1,
  },
  headerTitle: {
    fontSize: ForiqenTheme.fontSize.xxl,
    fontWeight: '700' as const,
    color: ForiqenTheme.colors.white,
  },
  headerSubtitle: {
    fontSize: ForiqenTheme.fontSize.sm,
    color: ForiqenTheme.colors.gray,
    marginTop: ForiqenTheme.spacing.xs,
  },
  content: {
    flex: 1,
    padding: ForiqenTheme.spacing.lg,
  },
  brandCard: {
    borderRadius: ForiqenTheme.borderRadius.xl,
    padding: ForiqenTheme.spacing.lg,
    marginBottom: ForiqenTheme.spacing.md,
    ...ForiqenTheme.shadows.card,
  },
  brandName: {
    fontSize: ForiqenTheme.fontSize.lg,
    fontWeight: '700' as const,
    color: ForiqenTheme.colors.white,
    marginBottom: ForiqenTheme.spacing.xs,
  },
  brandIndustry: {
    fontSize: ForiqenTheme.fontSize.sm,
    color: ForiqenTheme.colors.gray,
    marginBottom: ForiqenTheme.spacing.md,
  },
  badgeContainer: {
    flexDirection: 'row',
  },
  badge: {
    paddingHorizontal: ForiqenTheme.spacing.sm,
    paddingVertical: ForiqenTheme.spacing.xs,
    borderRadius: ForiqenTheme.borderRadius.sm,
    backgroundColor: ForiqenTheme.colors.accent2,
  },
  badgeText: {
    fontSize: ForiqenTheme.fontSize.xs,
    fontWeight: '700' as const,
    color: ForiqenTheme.colors.black,
  },
});
