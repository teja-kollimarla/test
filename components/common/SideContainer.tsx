import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet, Animated } from 'react-native';
import { X } from 'lucide-react-native';
import { ForiqenTheme } from '@/constants/theme';

interface SideContainerProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function SideContainer({ visible, onClose, title, children }: SideContainerProps) {
  const slideAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: visible ? 1 : 0,
      useNativeDriver: true,
      tension: 65,
      friction: 10,
    }).start();
  }, [visible, slideAnim]);

  const translateX = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [400, 0],
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <Animated.View
          style={[
            styles.container,
            { transform: [{ translateX }] },
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color={ForiqenTheme.colors.white} />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.content}>
            {children}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  container: {
    width: '85%',
    maxWidth: 400,
    backgroundColor: ForiqenTheme.colors.primary,
    borderLeftWidth: 1,
    borderLeftColor: ForiqenTheme.colors.accent1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: ForiqenTheme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: ForiqenTheme.colors.secondary,
  },
  title: {
    fontSize: ForiqenTheme.fontSize.xl,
    fontWeight: '700' as const,
    color: ForiqenTheme.colors.white,
  },
  closeButton: {
    padding: ForiqenTheme.spacing.sm,
  },
  content: {
    flex: 1,
    padding: ForiqenTheme.spacing.lg,
  },
});
