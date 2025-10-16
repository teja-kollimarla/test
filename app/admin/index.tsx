import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Building2, Users, Megaphone, TrendingUp } from 'lucide-react-native';
import { useQuery } from '@tanstack/react-query';
import { ForiqenTheme } from '@/constants/theme';
import { AnalyticsCard } from '@/components/common/AnalyticsCard';
import { mockBrands, mockInfluencers, mockCampaigns } from '@/mocks/data';

export default function AdminDashboard() {
  const insets = useSafeAreaInsets();

  const { data: stats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => ({
      totalBrands: mockBrands.length,
      totalInfluencers: mockInfluencers.length,
      activeCampaigns: mockCampaigns.filter(c => c.status === 'live').length,
      avgEngagement: '7.8%',
    }),
  });

  const { data: recentActivity } = useQuery({
    queryKey: ['admin-activity'],
    queryFn: async () => [
      { id: '1', text: 'New brand registered: TechFlow Inc', time: '2 hours ago' },
      { id: '2', text: 'Campaign "Summer Launch" completed', time: '5 hours ago' },
      { id: '3', text: 'Influencer Elena Rodriguez joined', time: '1 day ago' },
      { id: '4', text: 'New campaign created by EcoChic', time: '2 days ago' },
    ],
  });

  return (
    <LinearGradient colors={ForiqenTheme.gradients.hero} style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + ForiqenTheme.spacing.md }]}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
        <Text style={styles.headerSubtitle}>Platform Overview</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.statsGrid}>
          <AnalyticsCard
            title="Total Brands"
            value={stats?.totalBrands || 0}
            change="+12%"
            icon={Building2}
            iconColor={ForiqenTheme.colors.accent1}
          />
          <AnalyticsCard
            title="Total Influencers"
            value={stats?.totalInfluencers || 0}
            change="+18%"
            icon={Users}
            iconColor={ForiqenTheme.colors.accent2}
          />
          <AnalyticsCard
            title="Active Campaigns"
            value={stats?.activeCampaigns || 0}
            change="+5%"
            icon={Megaphone}
            iconColor={ForiqenTheme.colors.accent3}
          />
          <AnalyticsCard
            title="Avg. Engagement"
            value={stats?.avgEngagement || '0%'}
            change="+2.1%"
            icon={TrendingUp}
            iconColor={ForiqenTheme.colors.accent1}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <LinearGradient colors={ForiqenTheme.gradients.card} style={styles.activityCard}>
            {recentActivity?.map((activity) => (
              <TouchableOpacity key={activity.id} style={styles.activityItem}>
                <View style={styles.activityDot} />
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>{activity.text}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
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
    fontSize: ForiqenTheme.fontSize.md,
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
  activityCard: {
    borderRadius: ForiqenTheme.borderRadius.xl,
    padding: ForiqenTheme.spacing.lg,
    ...ForiqenTheme.shadows.card,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: ForiqenTheme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: ForiqenTheme.colors.secondary,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: ForiqenTheme.colors.accent1,
    marginTop: 6,
    marginRight: ForiqenTheme.spacing.sm,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: ForiqenTheme.fontSize.md,
    color: ForiqenTheme.colors.white,
    marginBottom: ForiqenTheme.spacing.xs,
  },
  activityTime: {
    fontSize: ForiqenTheme.fontSize.sm,
    color: ForiqenTheme.colors.gray,
  },
});
