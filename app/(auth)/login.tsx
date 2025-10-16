import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Platform,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ForiqenTheme } from '@/constants/theme';
import { useUser, UserRole } from '@/contexts/UserContext';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, User } from 'lucide-react-native';

const isWeb = Platform.OS === 'web';

export default function LoginPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { login } = useUser();
  const { role } = useLocalSearchParams<{ role: UserRole }>();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 40,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [fadeAnim, slideAnim, glowAnim]);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    setError('');

    await new Promise(resolve => setTimeout(resolve, 1200));

    try {
      const mockUser = {
        id: `${role}-user-1`,
        name: role === 'admin' ? 'Admin User' : role === 'brand' ? 'Brand Manager' : 'Influencer',
        email: email,
        role: role as UserRole,
        avatar: 'https://i.pravatar.cc/150?img=' + (role === 'admin' ? '1' : role === 'brand' ? '2' : '3'),
      };

      await login(mockUser);
      router.replace(`/${role}` as any);
    } catch {
      setError('Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  const getRoleTitle = () => {
    switch (role) {
      case 'admin':
        return 'Admin Portal';
      case 'brand':
        return 'Brand Dashboard';
      case 'influencer':
        return 'Creator Studio';
      default:
        return 'Login';
    }
  };

  const getRoleSubtitle = () => {
    switch (role) {
      case 'admin':
        return 'Manage the platform with powerful insights';
      case 'brand':
        return 'Connect with creators that align with your vision';
      case 'influencer':
        return 'Discover campaigns and grow your influence';
      default:
        return 'Welcome to Foriqen';
    }
  };

  const glowColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [ForiqenTheme.colors.accent1, ForiqenTheme.colors.accent2],
  });

  if (isWeb) {
    return (
      <LinearGradient colors={ForiqenTheme.gradients.hero} style={styles.container}>
        <View style={styles.webLayout}>
          <Animated.View
            style={[
              styles.webLeftPanel,
              {
                opacity: fadeAnim,
                transform: [{ translateX: Animated.multiply(slideAnim, -1) }],
              },
            ]}
          >
            <View style={styles.webBrandSection}>
              <Text style={styles.webLogo}>FORIQEN</Text>
              <Text style={styles.webTagline}>Empowering Influence</Text>
              <Text style={styles.webDescription}>
                Join the future of influencer marketing. Connect, collaborate, and create
                impactful campaigns with AI-driven precision.
              </Text>

              <View style={styles.webFeatures}>
                {[
                  { icon: '🚀', text: 'AI-Powered Matching' },
                  { icon: '📊', text: 'Real-Time Analytics' },
                  { icon: '💡', text: 'Smart Campaign Tools' },
                  { icon: '🌐', text: 'Global Reach' },
                ].map((feature, idx) => (
                  <View key={idx} style={styles.webFeatureItem}>
                    <Text style={styles.webFeatureIcon}>{feature.icon}</Text>
                    <Text style={styles.webFeatureText}>{feature.text}</Text>
                  </View>
                ))}
              </View>
            </View>
          </Animated.View>

          <Animated.View
            style={[
              styles.webRightPanel,
              {
                opacity: fadeAnim,
                transform: [{ translateX: slideAnim }],
              },
            ]}
          >
            <ScrollView
              contentContainerStyle={styles.webFormScroll}
              showsVerticalScrollIndicator={false}
            >
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
              >
                <ArrowLeft size={24} color={ForiqenTheme.colors.white} />
                <Text style={styles.backText}>Back</Text>
              </TouchableOpacity>

              <View style={styles.webFormContainer}>
                <View style={styles.roleIconContainer}>
                  <LinearGradient
                    colors={[ForiqenTheme.colors.accent1, ForiqenTheme.colors.accent3]}
                    style={styles.roleIconGradient}
                  >
                    <User size={40} color={ForiqenTheme.colors.white} />
                  </LinearGradient>
                </View>

                <Text style={styles.webFormTitle}>{getRoleTitle()}</Text>
                <Text style={styles.webFormSubtitle}>{getRoleSubtitle()}</Text>

                <View style={styles.webInputGroup}>
                  <Text style={styles.webLabel}>Email Address</Text>
                  <View style={styles.webInputWrapper}>
                    <Mail
                      size={20}
                      color={ForiqenTheme.colors.gray}
                      style={styles.webInputIcon}
                    />
                    <TextInput
                      style={styles.webInput}
                      placeholder="Enter your email"
                      placeholderTextColor={ForiqenTheme.colors.gray}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                    />
                  </View>
                </View>

                <View style={styles.webInputGroup}>
                  <Text style={styles.webLabel}>Password</Text>
                  <View style={styles.webInputWrapper}>
                    <Lock
                      size={20}
                      color={ForiqenTheme.colors.gray}
                      style={styles.webInputIcon}
                    />
                    <TextInput
                      style={styles.webInput}
                      placeholder="Enter your password"
                      placeholderTextColor={ForiqenTheme.colors.gray}
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      autoComplete="password"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.webEyeIcon}
                    >
                      {showPassword ? (
                        <EyeOff size={20} color={ForiqenTheme.colors.gray} />
                      ) : (
                        <Eye size={20} color={ForiqenTheme.colors.gray} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity
                  style={styles.forgotPassword}
                  onPress={() => {}}
                >
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.webLoginButton}
                  onPress={handleLogin}
                  disabled={isLoading}
                >
                  <LinearGradient
                    colors={[ForiqenTheme.colors.accent1, ForiqenTheme.colors.accent3]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.webLoginGradient}
                  >
                    {isLoading ? (
                      <ActivityIndicator color={ForiqenTheme.colors.white} />
                    ) : (
                      <Text style={styles.webLoginText}>Sign In</Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>

                <View style={styles.webDivider}>
                  <View style={styles.webDividerLine} />
                  <Text style={styles.webDividerText}>or continue with</Text>
                  <View style={styles.webDividerLine} />
                </View>

                <View style={styles.webSocialButtons}>
                  {['Google', 'LinkedIn'].map((provider) => (
                    <TouchableOpacity key={provider} style={styles.webSocialButton}>
                      <Text style={styles.webSocialButtonText}>{provider}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.webSignupText}>
                  Don&apos;t have an account?{' '}
                  <Text style={styles.webSignupLink}>Sign Up</Text>
                </Text>
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={ForiqenTheme.gradients.hero} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={[
            styles.mobileScrollContent,
            { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 20 },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color={ForiqenTheme.colors.white} />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>

          <Animated.View
            style={[
              styles.mobileContent,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Animated.View
              style={[
                styles.mobileGlowOrb,
                {
                  backgroundColor: glowColor,
                },
              ]}
            />

            <View style={styles.mobileHeader}>
              <View style={styles.roleIconContainer}>
                <LinearGradient
                  colors={[ForiqenTheme.colors.accent1, ForiqenTheme.colors.accent3]}
                  style={styles.roleIconGradient}
                >
                  <User size={36} color={ForiqenTheme.colors.white} />
                </LinearGradient>
              </View>
              <Text style={styles.mobileTitle}>{getRoleTitle()}</Text>
              <Text style={styles.mobileSubtitle}>{getRoleSubtitle()}</Text>
            </View>

            <View style={styles.mobileForm}>
              <View style={styles.mobileInputGroup}>
                <Text style={styles.mobileLabel}>Email</Text>
                <View style={styles.mobileInputWrapper}>
                  <Mail
                    size={20}
                    color={ForiqenTheme.colors.gray}
                    style={styles.mobileInputIcon}
                  />
                  <TextInput
                    style={styles.mobileInput}
                    placeholder="you@example.com"
                    placeholderTextColor={ForiqenTheme.colors.gray}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                  />
                </View>
              </View>

              <View style={styles.mobileInputGroup}>
                <Text style={styles.mobileLabel}>Password</Text>
                <View style={styles.mobileInputWrapper}>
                  <Lock
                    size={20}
                    color={ForiqenTheme.colors.gray}
                    style={styles.mobileInputIcon}
                  />
                  <TextInput
                    style={styles.mobileInput}
                    placeholder="Enter password"
                    placeholderTextColor={ForiqenTheme.colors.gray}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoComplete="password"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={styles.mobileEyeIcon}
                  >
                    {showPassword ? (
                      <EyeOff size={20} color={ForiqenTheme.colors.gray} />
                    ) : (
                      <Eye size={20} color={ForiqenTheme.colors.gray} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {error ? <Text style={styles.errorText}>{error}</Text> : null}

              <TouchableOpacity style={styles.forgotPassword} onPress={() => {}}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.mobileLoginButton}
                onPress={handleLogin}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={[ForiqenTheme.colors.accent1, ForiqenTheme.colors.accent3]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.mobileLoginGradient}
                >
                  {isLoading ? (
                    <ActivityIndicator color={ForiqenTheme.colors.white} />
                  ) : (
                    <Text style={styles.mobileLoginText}>Sign In</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.mobileDivider}>
                <View style={styles.mobileDividerLine} />
                <Text style={styles.mobileDividerText}>or</Text>
                <View style={styles.mobileDividerLine} />
              </View>

              <View style={styles.mobileSocialButtons}>
                <TouchableOpacity style={styles.mobileSocialButton}>
                  <Text style={styles.mobileSocialButtonText}>Google</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mobileSocialButton}>
                  <Text style={styles.mobileSocialButtonText}>LinkedIn</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.mobileSignupText}>
                Don&apos;t have an account?{' '}
                <Text style={styles.mobileSignupLink}>Sign Up</Text>
              </Text>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webLayout: {
    flexDirection: 'row',
    flex: 1,
  },
  webLeftPanel: {
    flex: 1,
    padding: 60,
    justifyContent: 'center',
    alignItems: 'flex-start',
    maxWidth: 600,
  },
  webBrandSection: {
    maxWidth: 480,
  },
  webLogo: {
    fontSize: 56,
    fontWeight: '900' as const,
    color: ForiqenTheme.colors.white,
    letterSpacing: 6,
    marginBottom: 16,
  },
  webTagline: {
    fontSize: 28,
    fontWeight: '600' as const,
    color: ForiqenTheme.colors.white,
    marginBottom: 24,
  },
  webDescription: {
    fontSize: 18,
    color: ForiqenTheme.colors.gray,
    lineHeight: 28,
    marginBottom: 48,
  },
  webFeatures: {
    gap: 20,
  },
  webFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  webFeatureIcon: {
    fontSize: 32,
  },
  webFeatureText: {
    fontSize: 18,
    color: ForiqenTheme.colors.white,
    fontWeight: '500' as const,
  },
  webRightPanel: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
  },
  webFormScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 60,
  },
  webFormContainer: {
    maxWidth: 480,
    width: '100%',
    alignSelf: 'center',
  },
  webFormTitle: {
    fontSize: 36,
    fontWeight: '700' as const,
    color: ForiqenTheme.colors.white,
    marginBottom: 12,
    textAlign: 'center',
  },
  webFormSubtitle: {
    fontSize: 16,
    color: ForiqenTheme.colors.gray,
    marginBottom: 40,
    textAlign: 'center',
  },
  webInputGroup: {
    marginBottom: 24,
  },
  webLabel: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: ForiqenTheme.colors.white,
    marginBottom: 8,
  },
  webInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
  },
  webInput: {
    flex: 1,
    height: 56,
    color: ForiqenTheme.colors.white,
    fontSize: 16,
    paddingHorizontal: 12,
    outlineStyle: 'none' as any,
  },
  webInputIcon: {
    marginRight: 4,
  },
  webEyeIcon: {
    padding: 8,
  },
  webLoginButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  webLoginGradient: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webLoginText: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: ForiqenTheme.colors.white,
  },
  webDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  webDividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  webDividerText: {
    color: ForiqenTheme.colors.gray,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  webSocialButtons: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  webSocialButton: {
    flex: 1,
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  webSocialButtonText: {
    color: ForiqenTheme.colors.white,
    fontSize: 16,
    fontWeight: '500' as const,
  },
  webSignupText: {
    textAlign: 'center',
    color: ForiqenTheme.colors.gray,
    fontSize: 14,
  },
  webSignupLink: {
    color: ForiqenTheme.colors.accent1,
    fontWeight: '600' as const,
  },
  mobileScrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
  },
  mobileContent: {
    flex: 1,
    justifyContent: 'center',
  },
  mobileGlowOrb: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    opacity: 0.3,
    shadowColor: ForiqenTheme.colors.accent1,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 50,
    elevation: 20,
  },
  mobileHeader: {
    alignItems: 'center',
    marginBottom: 40,
  },
  roleIconContainer: {
    marginBottom: 20,
  },
  roleIconGradient: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: ForiqenTheme.colors.accent1,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 10,
  },
  mobileTitle: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: ForiqenTheme.colors.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  mobileSubtitle: {
    fontSize: 15,
    color: ForiqenTheme.colors.gray,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  mobileForm: {
    gap: 20,
  },
  mobileInputGroup: {
    gap: 8,
  },
  mobileLabel: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: ForiqenTheme.colors.white,
  },
  mobileInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 16,
    height: 56,
  },
  mobileInput: {
    flex: 1,
    color: ForiqenTheme.colors.white,
    fontSize: 16,
    paddingHorizontal: 12,
    height: '100%',
  },
  mobileInputIcon: {
    marginRight: 4,
  },
  mobileEyeIcon: {
    padding: 8,
  },
  mobileLoginButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: ForiqenTheme.colors.accent1,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  mobileLoginGradient: {
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileLoginText: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: ForiqenTheme.colors.white,
  },
  mobileDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  mobileDividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  mobileDividerText: {
    color: ForiqenTheme.colors.gray,
    paddingHorizontal: 16,
    fontSize: 13,
  },
  mobileSocialButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  mobileSocialButton: {
    flex: 1,
    height: 56,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileSocialButtonText: {
    color: ForiqenTheme.colors.white,
    fontSize: 15,
    fontWeight: '600' as const,
  },
  mobileSignupText: {
    textAlign: 'center',
    color: ForiqenTheme.colors.gray,
    fontSize: 14,
    marginTop: 8,
  },
  mobileSignupLink: {
    color: ForiqenTheme.colors.accent1,
    fontWeight: '600' as const,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  backText: {
    color: ForiqenTheme.colors.white,
    fontSize: 16,
    fontWeight: '500' as const,
  },
  errorText: {
    color: ForiqenTheme.colors.accent3,
    fontSize: 14,
    textAlign: 'center',
    marginTop: -8,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  forgotPasswordText: {
    color: ForiqenTheme.colors.accent1,
    fontSize: 14,
    fontWeight: '500' as const,
  },
});
