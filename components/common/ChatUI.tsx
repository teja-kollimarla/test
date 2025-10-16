import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Animated } from 'react-native';
import { Send } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ForiqenTheme } from '@/constants/theme';

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'me' | 'other';
  senderName: string;
  timestamp: Date;
}

interface ChatUIProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
}

export function ChatUI({ messages, onSendMessage }: ChatUIProps) {
  const [inputText, setInputText] = useState<string>('');

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText.trim());
      setInputText('');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((message, index) => (
          <MessageBubble key={message.id} message={message} index={index} />
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type a message..."
          placeholderTextColor={ForiqenTheme.colors.gray}
          multiline
        />
        <TouchableOpacity onPress={handleSend}>
          <LinearGradient
            colors={ForiqenTheme.gradients.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.sendButton}
          >
            <Send size={20} color={ForiqenTheme.colors.white} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function MessageBubble({ message, index }: { message: ChatMessage; index: number }) {
  const slideAnim = React.useRef(new Animated.Value(50)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        delay: index * 50,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 50,
        useNativeDriver: true,
      }),
    ]).start();
  }, [index, slideAnim, opacityAnim]);

  const isMe = message.sender === 'me';

  return (
    <Animated.View
      style={[
        styles.messageContainer,
        isMe ? styles.myMessage : styles.otherMessage,
        { transform: [{ translateY: slideAnim }], opacity: opacityAnim },
      ]}
    >
      {isMe ? (
        <LinearGradient
          colors={ForiqenTheme.gradients.button}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.messageBubble}
        >
          <Text style={styles.messageText}>{message.text}</Text>
          <Text style={styles.timestamp}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </LinearGradient>
      ) : (
        <View style={styles.otherBubble}>
          <Text style={styles.senderName}>{message.senderName}</Text>
          <Text style={styles.messageText}>{message.text}</Text>
          <Text style={styles.timestamp}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
    padding: ForiqenTheme.spacing.md,
  },
  messageContainer: {
    marginBottom: ForiqenTheme.spacing.md,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
  },
  otherMessage: {
    alignSelf: 'flex-start',
  },
  messageBubble: {
    padding: ForiqenTheme.spacing.md,
    borderRadius: ForiqenTheme.borderRadius.lg,
  },
  otherBubble: {
    padding: ForiqenTheme.spacing.md,
    borderRadius: ForiqenTheme.borderRadius.lg,
    backgroundColor: ForiqenTheme.colors.secondary,
  },
  senderName: {
    fontSize: ForiqenTheme.fontSize.xs,
    color: ForiqenTheme.colors.accent1,
    fontWeight: '600' as const,
    marginBottom: ForiqenTheme.spacing.xs,
  },
  messageText: {
    fontSize: ForiqenTheme.fontSize.md,
    color: ForiqenTheme.colors.white,
    marginBottom: ForiqenTheme.spacing.xs,
  },
  timestamp: {
    fontSize: ForiqenTheme.fontSize.xs,
    color: ForiqenTheme.colors.gray,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: ForiqenTheme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: ForiqenTheme.colors.secondary,
    alignItems: 'center',
    gap: ForiqenTheme.spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: ForiqenTheme.colors.secondary,
    borderRadius: ForiqenTheme.borderRadius.lg,
    padding: ForiqenTheme.spacing.md,
    color: ForiqenTheme.colors.white,
    fontSize: ForiqenTheme.fontSize.md,
    maxHeight: 100,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: ForiqenTheme.borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
