import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ForiqenTheme } from '@/constants/theme';
import { ChatUI, ChatMessage } from '@/components/common/ChatUI';

export default function BrandMessagesScreen() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hi! I would love to collaborate with your brand.',
      sender: 'other',
      senderName: 'Elena Rodriguez',
      timestamp: new Date(Date.now() - 3600000),
    },
  ]);

  const handleSendMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'me',
      senderName: 'Brand Manager',
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <LinearGradient colors={ForiqenTheme.gradients.hero} style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + ForiqenTheme.spacing.md }]}>
        <Text style={styles.headerTitle}>Messages</Text>
      </View>
      <ChatUI messages={messages} onSendMessage={handleSendMessage} />
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
});
