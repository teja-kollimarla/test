import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AlertCircle } from 'lucide-react-native';
import { ForiqenTheme } from '@/constants/theme';

interface ConfirmationModalProps {
  visible: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'warning' | 'info';
}

export function ConfirmationModal({
  visible,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'warning',
}: ConfirmationModalProps) {
  const scaleAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: visible ? 1 : 0,
      useNativeDriver: true,
      tension: 80,
      friction: 10,
    }).start();
  }, [visible, scaleAnim]);

  const getIconColor = () => {
    switch (variant) {
      case 'danger':
        return '#FF4444';
      case 'warning':
        return ForiqenTheme.colors.accent3;
      case 'info':
        return ForiqenTheme.colors.accent1;
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <View style={styles.overlay}>
        <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.iconContainer}>
            <AlertCircle size={48} color={getIconColor()} />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
              <Text style={styles.cancelText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm}>
              <LinearGradient
                colors={ForiqenTheme.gradients.button}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.confirmButton}
              >
                <Text style={styles.confirmText}>{confirmText}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: ForiqenTheme.spacing.lg,
  },
  container: {
    backgroundColor: ForiqenTheme.colors.primary,
    borderRadius: ForiqenTheme.borderRadius.xl,
    padding: ForiqenTheme.spacing.xl,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: ForiqenTheme.colors.accent1,
    ...ForiqenTheme.shadows.glow,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: ForiqenTheme.spacing.md,
  },
  title: {
    fontSize: ForiqenTheme.fontSize.xl,
    fontWeight: '700' as const,
    color: ForiqenTheme.colors.white,
    textAlign: 'center',
    marginBottom: ForiqenTheme.spacing.sm,
  },
  message: {
    fontSize: ForiqenTheme.fontSize.md,
    color: ForiqenTheme.colors.gray,
    textAlign: 'center',
    marginBottom: ForiqenTheme.spacing.xl,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: ForiqenTheme.spacing.md,
  },
  cancelButton: {
    flex: 1,
    padding: ForiqenTheme.spacing.md,
    borderRadius: ForiqenTheme.borderRadius.md,
    backgroundColor: ForiqenTheme.colors.secondary,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: ForiqenTheme.fontSize.md,
    fontWeight: '600' as const,
    color: ForiqenTheme.colors.white,
  },
  confirmButton: {
    flex: 1,
    padding: ForiqenTheme.spacing.md,
    borderRadius: ForiqenTheme.borderRadius.md,
    alignItems: 'center',
  },
  confirmText: {
    fontSize: ForiqenTheme.fontSize.md,
    fontWeight: '600' as const,
    color: ForiqenTheme.colors.white,
  },
});
