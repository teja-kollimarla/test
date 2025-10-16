import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Users, TrendingUp, Eye, MessageCircle } from 'lucide-react-native';
import { ForiqenTheme } from '@/constants/theme';
import { AnalyticsCard } from '@/components/common/AnalyticsCard';

export default function AnalyticsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient colors={ForiqenTheme.gradients.hero} style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + ForiqenTheme.spacing.md }]}>
        <Text style={styles.headerTitle}>Analytics Overview</Text>
        <Text style={styles.headerSubtitle}>Comprehensive insights into your performance across platforms</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsGrid}>
          <AnalyticsCard
            title="Total Followers"
            value="18.5K"
            change="+12%"
            icon={Users}
            iconColor={ForiqenTheme.colors.accent2}
          />
          <AnalyticsCard
            title="Avg. Engagement"
            value="9.2%"
            change="+0.8%"
            icon={TrendingUp}
            iconColor={ForiqenTheme.colors.accent1}
          />
          <AnalyticsCard
            title="Total Posts"
            value="320"
            change="+5%"
            icon={MessageCircle}
            iconColor={ForiqenTheme.colors.accent3}
          />
          <AnalyticsCard
            title="Reach (Last 30D)"
            value="1.2M"
            change="-2%"
            icon={Eye}
            iconColor={ForiqenTheme.colors.accent1}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance Trends</Text>
          <LinearGradient colors={ForiqenTheme.gradients.card} style={styles.card}>
            <Text style={styles.placeholderText}>Chart: Follower Growth & Engagement Rate</Text>
            <Text style={styles.descriptionText}>
              Monthly overview of audience and interaction.
            </Text>
          </LinearGradient>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Engagement Breakdown</Text>
          <LinearGradient colors={ForiqenTheme.gradients.card} style={styles.card}>
            <Text style={styles.placeholderText}>Pie Chart: Content Interaction Types</Text>
            <Text style={styles.descriptionText}>
              Distribution of how users engage with your content.
            </Text>
          </LinearGradient>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Audience Demographics</Text>
          <LinearGradient colors={ForiqenTheme.gradients.card} style={styles.card}>
            <Text style={styles.placeholderText}>Bar Chart: Audience Age Distribution</Text>
            <Text style={styles.descriptionText}>
              Breakdown of your followers by age group.
            </Text>
          </LinearGradient>
        </View>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: ForiqenTheme.spacing.md,
    marginBottom: ForiqenTheme.spacing.xl,
  },
  section: {
    marginBottom: ForiqenTheme.spacing.xl,
  },
  sectionTitle: {
    fontSize: ForiqenTheme.fontSize.xl,
    fontWeight: '600' as const,
    color: ForiqenTheme.colors.white,
    marginBottom: ForiqenTheme.spacing.md,
  },
  card: {
    borderRadius: ForiqenTheme.borderRadius.xl,
    padding: ForiqenTheme.spacing.xl,
    ...ForiqenTheme.shadows.card,
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: ForiqenTheme.fontSize.lg,
    fontWeight: '600' as const,
    color: ForiqenTheme.colors.white,
    marginBottom: ForiqenTheme.spacing.sm,
  },
  descriptionText: {
    fontSize: ForiqenTheme.fontSize.sm,
    color: ForiqenTheme.colors.gray,
    textAlign: 'center',
  },
});
