import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ForiqenTheme } from '@/constants/theme';
import { GradientButton } from '@/components/common/GradientButton';
import { useUser } from '@/contexts/UserContext';

export default function InfluencerProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, logout } = useUser();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/landing/index' as any);
  };

  return (
    <LinearGradient colors={ForiqenTheme.gradients.hero} style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + ForiqenTheme.spacing.md }]}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content}>
        <LinearGradient colors={ForiqenTheme.gradients.card} style={styles.profileCard}>
          <Text style={styles.userName}>{user?.name || 'Influencer'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'influencer@foriqen.com'}</Text>
          <Text style={styles.userBio}>
            Digital content creator specializing in tech reviews, futuristic lifestyle, and interstellar travel vlogs. Passionate about innovation and connecting communities.
          </Text>
          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>INFLUENCER</Text>
          </View>
        </LinearGradient>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Social Links</Text>
          <LinearGradient colors={ForiqenTheme.gradients.card} style={styles.socialCard}>
            <Text style={styles.socialText}>Instagram: @elara.nova</Text>
            <Text style={styles.socialText}>YouTube: Elara Nova</Text>
            <Text style={styles.socialText}>TikTok: @elara_nova</Text>
          </LinearGradient>
        </View>

        <GradientButton title="Logout" onPress={handleLogout} style={styles.logoutButton} />
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
  content: {
    flex: 1,
    padding: ForiqenTheme.spacing.lg,
  },
  profileCard: {
    borderRadius: ForiqenTheme.borderRadius.xl,
    padding: ForiqenTheme.spacing.xl,
    alignItems: 'center',
    marginBottom: ForiqenTheme.spacing.xl,
    ...ForiqenTheme.shadows.card,
  },
  userName: {
    fontSize: ForiqenTheme.fontSize.xl,
    fontWeight: '700' as const,
    color: ForiqenTheme.colors.white,
    marginBottom: ForiqenTheme.spacing.xs,
  },
  userEmail: {
    fontSize: ForiqenTheme.fontSize.md,
    color: ForiqenTheme.colors.gray,
    marginBottom: ForiqenTheme.spacing.md,
  },
  userBio: {
    fontSize: ForiqenTheme.fontSize.sm,
    color: ForiqenTheme.colors.gray,
    textAlign: 'center',
    marginBottom: ForiqenTheme.spacing.md,
  },
  roleBadge: {
    paddingHorizontal: ForiqenTheme.spacing.md,
    paddingVertical: ForiqenTheme.spacing.sm,
    borderRadius: ForiqenTheme.borderRadius.round,
    backgroundColor: ForiqenTheme.colors.accent1,
  },
  roleText: {
    fontSize: ForiqenTheme.fontSize.sm,
    fontWeight: '700' as const,
    color: ForiqenTheme.colors.black,
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
  socialCard: {
    borderRadius: ForiqenTheme.borderRadius.xl,
    padding: ForiqenTheme.spacing.lg,
    ...ForiqenTheme.shadows.card,
  },
  socialText: {
    fontSize: ForiqenTheme.fontSize.md,
    color: ForiqenTheme.colors.white,
    marginBottom: ForiqenTheme.spacing.sm,
  },
  logoutButton: {
    marginTop: ForiqenTheme.spacing.lg,
  },
});
