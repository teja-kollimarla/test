import React, { useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ForiqenTheme } from '@/constants/theme';
import { GradientButton } from '@/components/common/GradientButton';
import { useUser, UserRole } from '@/contexts/UserContext';

const { height } = Dimensions.get('window');

export default function LandingPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isAuthenticated, role } = useUser();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    if (isAuthenticated && role) {
      router.replace(`/${role}` as any);
    }
  }, [isAuthenticated, role, router]);

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 10,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleRoleSelection = async (selectedRole: UserRole) => {
    router.push(`/(auth)/login?role=${selectedRole}` as any);
  };

  return (
    <LinearGradient
      colors={ForiqenTheme.gradients.hero}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.content,
          {
            paddingTop: insets.top + height * 0.1,
            paddingBottom: insets.bottom + ForiqenTheme.spacing.xxl,
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.heroSection}>
          <Text style={styles.logo}>FORIQEN</Text>
          <Text style={styles.heroTitle}>Empowering Influence</Text>
          <Text style={styles.heroSubtitle}>
            Connect Brands & Creators Intelligently
          </Text>
        </View>

        <View style={styles.buttonSection}>
          <Text style={styles.sectionTitle}>Choose Your Role</Text>
          
          <GradientButton
            title="Continue as Admin"
            onPress={() => handleRoleSelection('admin')}
            style={styles.button}
          />

          <GradientButton
            title="Continue as Brand"
            onPress={() => handleRoleSelection('brand')}
            style={styles.button}
          />

          <GradientButton
            title="Continue as Influencer"
            onPress={() => handleRoleSelection('influencer')}
            style={styles.button}
          />
        </View>

        <Text style={styles.footer}>
          Powered by AI-driven matching technology
        </Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: ForiqenTheme.spacing.xl,
  },
  heroSection: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 48,
    fontWeight: '900' as const,
    color: ForiqenTheme.colors.white,
    letterSpacing: 4,
    marginBottom: ForiqenTheme.spacing.lg,
  },
  heroTitle: {
    fontSize: ForiqenTheme.fontSize.hero,
    fontWeight: '700' as const,
    color: ForiqenTheme.colors.white,
    textAlign: 'center',
    marginBottom: ForiqenTheme.spacing.md,
  },
  heroSubtitle: {
    fontSize: ForiqenTheme.fontSize.lg,
    color: ForiqenTheme.colors.gray,
    textAlign: 'center',
  },
  buttonSection: {
    gap: ForiqenTheme.spacing.md,
  },
  sectionTitle: {
    fontSize: ForiqenTheme.fontSize.xl,
    fontWeight: '600' as const,
    color: ForiqenTheme.colors.white,
    textAlign: 'center',
    marginBottom: ForiqenTheme.spacing.md,
  },
  button: {
    width: '100%',
  },
  footer: {
    fontSize: ForiqenTheme.fontSize.sm,
    color: ForiqenTheme.colors.gray,
    textAlign: 'center',
  },
});
