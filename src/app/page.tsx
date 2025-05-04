
"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Smile, User, Mail, MessageSquare, ChevronRight, Users, Clock, Star, Bell, Home, ArrowLeft } from 'lucide-react';

// User type definition for the users list
type UserType = {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastMessage: string;
  isTyping?: boolean;
};

// Message type with reactions support
type MessageType = {
  id: string;
  text: string;
  sender: 'user' | 'other';
  reactions?: string[];
};

// Header component with back button
const Header = ({ currentView, setCurrentView, previousView, setPreviousView, showUserList, setShowUserList }: { 
  currentView: 'landing' | 'chat' | 'about' | 'contact'; 
  setCurrentView: (view: 'landing' | 'chat' | 'about' | 'contact') => void;
  previousView: 'landing' | 'chat' | 'about' | 'contact';
  setPreviousView: (view: 'landing' | 'chat' | 'about' | 'contact') => void;
  showUserList: boolean;
  setShowUserList: (show: boolean) => void;
}) => {
  
  const handleBackNavigation = () => {
    // If in chat view, go to user list instead of previous view
    if (currentView === 'chat' && !showUserList) {
      setShowUserList(true);
    } else {
      setCurrentView(previousView);
    }
  };
  
  return (
    <header className="bg-white py-3 px-4 flex items-center justify-between">
      <div className="flex items-center">
        {currentView !== 'landing' && (
          <button 
            onClick={handleBackNavigation}
            className="mr-3 text-blue-600 hover:text-blue-800"
            title="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-2xl font-bold text-blue-600 mr-8">ChatX</h1>
        <nav className="hidden md:flex space-x-6">
          <button 
            onClick={() => {
              setPreviousView(currentView);
              setCurrentView('landing');
            }}
            className={`flex items-center ${currentView === 'landing' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
          >
            <Home className="w-4 h-4 mr-1" />
            Home
          </button>
          <button 
            onClick={() => {
              setPreviousView(currentView);
              setCurrentView('about');
            }}
            className={`flex items-center ${currentView === 'about' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
          >
            <User className="w-4 h-4 mr-1" />
            About
          </button>
          <button 
            onClick={() => {
              setPreviousView(currentView);
              setCurrentView('contact');
            }}
            className={`flex items-center ${currentView === 'contact' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-blue-600'}`}
          >
            <Mail className="w-4 h-4 mr-1" />
            Contact
          </button>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <button className="relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">1</span>
        </button>
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {/* {<Image 
            src="/api/placeholder/40/40" 
            alt="User profile" 
            width={32} 
            height={32} 
            className="object-cover"
          /> } */}
          S
        </div>
      </div>
    </header>
  );
};

// NEW COMPONENT: Online users sidebar
const OnlineUsersList = ({ users, onSelectUser }: { 
  users: UserType[];
  onSelectUser: (user: UserType) => void;
}) => {
  const onlineUsers = users.filter(user => user.status === 'online');
  
  return (
    <motion.div 
      initial={{ opacity: 0, width: 0 }}
      animate={{ opacity: 1, width: "200px" }}
      exit={{ opacity: 0, width: 0 }}
      className="h-full border-l bg-white overflow-y-auto"
    >
      <div className="p-3 border-b">
        <h3 className="font-medium text-gray-700 flex items-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
          Online Users ({onlineUsers.length})
        </h3>
      </div>
      
      <div className="divide-y">
        {onlineUsers.map(user => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: user.id * 0.05 }}
            onClick={() => onSelectUser(user)}
            className="p-3 flex items-center hover:bg-gray-50 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium text-sm mr-2">
              {user.name}
            </div>
            <div className="text-sm text-gray-700">{user.name}</div>
            <div className="ml-auto">
              {user.isTyping && (
                <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full animate-pulse">
                  typing...
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// NEW COMPONENT: Emoji Picker
const EmojiPicker = ({ onSelectEmoji, onClose }: { 
  onSelectEmoji: (emoji: string) => void;
  onClose: () => void;
}) => {
  const emojis = ['👍', '❤️', '😊', '😂', '🎉', '👏', '🔥', '💯', '🙏', '✅'];
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="absolute bottom-16 right-2 bg-white rounded-lg shadow-lg p-2 border z-10"
    >
      <div className="grid grid-cols-5 gap-2">
        {emojis.map(emoji => (
          <button
            key={emoji}
            onClick={() => {
              onSelectEmoji(emoji);
              onClose();
            }}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-md transition-colors"
          >
            {emoji}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default function ChatApp() {
  const [currentView, setCurrentView] = useState<'landing' | 'chat' | 'about' | 'contact'>('landing');
  const [previousView, setPreviousView] = useState<'landing' | 'chat' | 'about' | 'contact'>('landing');
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [showUserList, setShowUserList] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  // const [showEmojiPicker, setShowEmojiPicker] = useState<boolean | string>(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState<string | false>(false);
  const [showOnlineUsers, setShowOnlineUsers] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sample users data
  const [users, setUsers] = useState<UserType[]>([
    {
      id: 1,
      name: "E",
      avatar: "",
      status: "online",
      lastMessage: "Hey, how's it going?"
    },
    {
      id: 2,
      name: "J",
      avatar: "",
      status: "online",
      lastMessage: "Did you see the new project specs?"
    },
    {
      id: 3,
      name: "S",
      avatar: "",
      status: "away",
      lastMessage: "I'll get back to you tomorrow"
    },
    {
      id: 4,
      name: "M",
      avatar: "",
      status: "offline",
      lastMessage: "Thanks for your help!"
    },
    {
      id: 5,
      name: "O",
      avatar: "",
      status: "online",
      lastMessage: "Let's catch up soon"
    }
  ]);

  // Auto-focus input when chat opens
  useEffect(() => {
    if (currentView === 'chat' && !showUserList) {
      inputRef.current?.focus();
    }
  }, [currentView, showUserList]);

  // Auto-scroll to bottom when messages change, but use a more controlled approach
  useEffect(() => {
    if (messageEndRef.current) {
      const chatContainer = messageEndRef.current.parentElement;
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  }, [messages]);

  // NEW: Handle typing indicator
  const handleTyping = () => {
    if (selectedUser && !isTyping) {
      setIsTyping(true);
      
      // Clear any existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      // Set timeout to clear typing indicator after 2 seconds of inactivity
      typingTimeoutRef.current = setTimeout(() => {
        setIsTyping(false);
      }, 2000);
    }
  };

  // NEW: Add reaction to message
  const addReaction = (messageId: string, emoji: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = msg.reactions || [];
        // Don't add duplicate emojis
        if (!reactions.includes(emoji)) {
          return { ...msg, reactions: [...reactions, emoji] };
        }
      }
      return msg;
    }));
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // Generate unique ID for message
    const messageId = Date.now().toString();
    
    // Add user message
    setMessages(prev => [...prev, {id: messageId, text: newMessage, sender: 'user'}]);
    setNewMessage('');

    //update selected user last message
    setUsers(prevUsers => {
      if (selectedUser) {
        return prevUsers.map(user => 
          user.id === selectedUser.id ? { ...user, lastMessage: newMessage } : user
        );
      }
      return prevUsers;
    });

    setNewMessage('');

    // Clear typing state
    setIsTyping(false);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // NEW: Show recipient typing indicator
    if (selectedUser) {
      const updatedUsers = users.map(user => 
        user.id === selectedUser.id ? { ...user, isTyping: true } : user
      );
      setUsers(updatedUsers);
      
      // Clear typing indicator after a random time
      setTimeout(() => {
        setUsers(prevUsers => prevUsers.map(user => 
          user.id === selectedUser?.id ? { ...user, isTyping: false } : user
        ));
      }, 1000 + Math.random() * 1000);
    }

    // Add mock reply after 1 second
    setTimeout(() => {
      const replies = [
        "That's interesting!",
        "Tell me more about that",
        "I understand what you mean",
        "Thanks for sharing!",
        "What else is new?",
        "I am good,how about you?",
        "Let's discuss this further",
        "I see your point",
        "That's a great idea!",
        "I appreciate your input",
        "Can you elaborate on that??",
        "I didn't think about it that way",
        "That's a valid concern",
        "I can see why you'd feel that way",
        "Hi",
        "Hello"
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      const replyId = Date.now().toString();
      const botMessage = {id: replyId, text: reply, sender: 'other' as const};
      setMessages(prev => [...prev, botMessage]);
      setUsers(prevUsers =>
        prevUsers.map(user =>
          selectedUser && user.id === selectedUser.id ? {...user, lastMessage: reply} : user
        )
      )
    }, 1000);
  };

  const selectUser = (user: UserType) => {
    setSelectedUser(user);
    setShowUserList(false);
    setMessages([{id: '0', text: user.lastMessage, sender: 'other'}]);
  };

  const getStatusColor = (status: 'online' | 'offline' | 'away') => {
    switch(status) {
      case 'online': return 'bg-green-500';
      case 'offline': return 'bg-gray-400';
      case 'away': return 'bg-yellow-500';
    }
  };

  const LandingPage = () => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-12 text-center"
      >
        <h1 className="text-6xl font-bold mb-4 text-gray-900">Connect and Chat</h1>
        <h2 className="text-5xl font-bold mb-8 text-blue-600">Seamlessly</h2>
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          Experience real-time messaging with a beautifully designed interface. Share
          thoughts, react with emojis, and stay connected with your team.
        </p>
      </motion.div>
      
      <motion.div
        className="flex space-x-4 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <button 
          onClick={() => {
            setPreviousView(currentView);
            setCurrentView('about');
          }}
          className="flex items-center px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100"
        >
          <User className="w-5 h-5 mr-2 text-purple-600" /> 
          <span>About</span>
        </button>
        <button 
          onClick={() => {
            setPreviousView(currentView);
            setCurrentView('contact');
          }}
          className="flex items-center px-6 py-3 bg-white rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-100"
        >
          <Mail className="w-5 h-5 mr-2 text-blue-600" /> 
          <span>Contact</span>
        </button>
      </motion.div>
      
      <motion.button
        onClick={() => {
          setPreviousView(currentView);
          setCurrentView('chat');
        }}
        className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all font-medium"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Start Messaging
      </motion.button>
      
      <motion.div
        className="mt-12 flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-white flex items-center justify-center text-xs text-white">
              {i}
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600">Join thousands of users today</p>
      </motion.div>
    </motion.div>
  );

  const AboutPage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-gradient-to-br from-blue-50 to-white"
    >
      <div className="max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-purple-700">About Us</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
        ChatX is a real-time messaging app built with Next.js, featuring smooth animations, instant messaging, and a clean UI. It includes dynamic views, notification alerts, and personalized user avatars. Developed by Soumojit, it showcases modern React and TypeScript skills with a focus on intuitive design. Perfect for seamless, stylish conversations.
        </p>
        <button 
          onClick={() => {
            setPreviousView(currentView);
            setCurrentView('landing');
          }}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-md transition-all"
        >
          Back to Home
        </button>
      </div>
    </motion.div>
  );

  const ContactPage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-gradient-to-br from-blue-50 to-white"
    >
      <div className="max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Contact Us</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Have questions? Reach out to me at:
          <br />
          <span className="font-medium text-purple-600">sanjugon2003@gmail.com</span>
        </p>
        <button 
          onClick={() => {
            setPreviousView(currentView);
            setCurrentView('landing');
          }}
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-md transition-all"
        >
          Back to Home
        </button>
      </div>
    </motion.div>
  );
  const UserListComponent = () => (
    <div className="h-full flex flex-col">
      <div className="py-3 px-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <Users className="w-5 h-5 mr-2 text-blue-600" />
          Contacts
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {users.map((user) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: user.id * 0.1 }}
            onClick={() => selectUser(user)}
            className="p-4 border-b hover:bg-gray-50 cursor-pointer flex items-center"
          >
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold text-lg">
                {user.name}
              </div>
              <div className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(user.status)} rounded-full border-2 border-white`}></div>
            </div>
            <div className="ml-3 flex-1">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-800">{user.name}</h3>
                <span className="text-xs text-gray-500">
                  <Clock className="w-3 h-3 inline mr-1" />
                  {user.id < 3 ? 'Just now' : user.id === 3 ? '2h ago' : 'Yesterday'}
                </span>
              </div>
              <p className="text-sm text-gray-500 truncate">
                {user.isTyping ? (
                  <span className="inline-flex items-center">
                    <span className="animate-pulse">typing</span>
                    <span className="animate-bounce inline-flex ml-1">...</span>
                  </span>
                ) : (
                  user.lastMessage
                )}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
  
      <div className="p-4 bg-gray-50 border-t">
        <button 
          onClick={() => {
            setPreviousView(currentView);
            setCurrentView('landing');
          }}
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:shadow-md transition-all"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
  
  const ChatPage = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-screen bg-gray-50 overflow-hidden"
      style={{ position: 'relative' }}
    >
      {showUserList ? (
        <UserListComponent />
      ) : (
        <div className="flex h-full">
          <div className="flex-1 flex flex-col">
            {/* Chat Header - With typing indicator */}
            <div className="py-3 px-4 flex justify-between items-center">
              <button 
                onClick={() => setShowUserList(true)}
                className="text-blue-600 hover:text-blue-800"
                title="Back to user list"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              {selectedUser && (
                <div className="flex items-center">
                  <h2 className="font-bold text-gray-800">{selectedUser.name}</h2>
                  <div className={`ml-2 w-3 h-3 ${getStatusColor(selectedUser.status)} rounded-full`}></div>
                  {selectedUser.isTyping && (
                    <span className="ml-2 text-xs text-gray-500 animate-pulse flex items-center">
                      typing
                      <span className="flex space-x-1 ml-1">
                        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                        <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                      </span>
                    </span>
                  )}
                </div>
              )}
              <button 
                onClick={() => setShowOnlineUsers(!showOnlineUsers)}
                className="text-blue-600 hover:text-blue-800 p-1 border border-blue-200 rounded-md"
                title="Show online users"
              >
                <Users className="w-5 h-5" />
              </button>
            </div>
            
            {/* Messages - Enhanced with reactions */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50 to-white h-0">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="relative group">
                    <div className={`max-w-xs p-3 rounded-lg ${
                      msg.sender === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                    }`}>
                      {msg.text}
                    </div>
                    
                    {/* Reaction buttons that appear on hover */}
                    {msg.sender === 'other' && (
                      <div className="absolute -right-10 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => setShowEmojiPicker(prev => (prev === msg.id ? false : msg.id))}
                          className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                          title="Add reaction"
                        >
                          <Smile className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    )}
                    
                    {/* Show emoji picker when button is clicked */}
                    {showEmojiPicker === msg.id && (
                      <EmojiPicker 
                        onSelectEmoji={(emoji) => addReaction(msg.id, emoji)} 
                        onClose={() => setShowEmojiPicker(false)}
                      />
                    )}
                    
                    {/* Display reactions */}
                    {msg.reactions && msg.reactions.length > 0 && (
                      <div className="flex mt-1 flex-wrap gap-1">
                        {msg.reactions.map((emoji, idx) => (
                          <span 
                            key={idx}
                            className="inline-block bg-white rounded-full px-2 py-1 text-xs shadow-sm"
                          >
                            {emoji}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={messageEndRef} />
            </div>
            
            {/* Input - With typing indicator */}
            <div className="p-3 bg-white border-t flex-shrink-0">
              {isTyping && (
                <div className="text-xs text-gray-500 mb-1 ml-4 animate-pulse flex items-center">
                  <span>You are typing</span>
                  <span className="flex space-x-1 ml-1">
                    <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '200ms'}}></span>
                    <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '400ms'}}></span>
                  </span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={newMessage}
                  onChange={(e) => {
                    setNewMessage(e.target.value);
                    handleTyping();
                  }}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm max-h-12"
                  autoFocus
                  style={{ resize: 'none' }}
                />
                <button
                  title="Add emoji"
                  onClick={() => setShowEmojiPicker('new')}
                  className="p-2 text-gray-500 hover:text-blue-600 flex-shrink-0"
                >
                  <Smile className="w-5 h-5" />
                </button>
                <button
                  title="Send message"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="p-2 bg-blue-600 text-white rounded-full disabled:opacity-50 flex-shrink-0"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              
              {/* Emoji picker for new messages */}
              {showEmojiPicker && (
                <EmojiPicker 
                  onSelectEmoji={(emoji) => {
                    setNewMessage(prev => prev + emoji);
                    setShowEmojiPicker(false);
                    inputRef.current?.focus();
                  }} 
                  onClose={() => setShowEmojiPicker(false)}
                />
              )}
            </div>
          </div>
          
          {/* Online users sidebar - toggleable */}
          <AnimatePresence>
            {showOnlineUsers && (
              <OnlineUsersList 
                users={users} 
                onSelectUser={(user) => {
                  setSelectedUser(user);
                  setShowOnlineUsers(false);
                }}
              />
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Global header that persists across all views */}
      <Header 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
        previousView={previousView}
        setPreviousView={setPreviousView}
        showUserList={showUserList}
        setShowUserList={setShowUserList}
      />
      
      {/* Thin separator line */}
      <div className="border-b border-gray-200"></div>
      
      {/* Content area */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {currentView === 'landing' && <LandingPage />}
          {currentView === 'chat' && <ChatPage />}
          {currentView === 'about' && <AboutPage />}
          {currentView === 'contact' && <ContactPage />}
        </AnimatePresence>
      </div>
      </div>
    );
  }
