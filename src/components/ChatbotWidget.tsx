import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Lazy load chatbot functionality
  useEffect(() => {
    const loadChatbot = () => {
      setIsLoaded(true);
    };

    // Load only when user clicks chat icon first time
    if (isOpen && !isLoaded) {
      loadChatbot();
    }
  }, [isOpen, isLoaded]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getBotResponse = async (userMessage: string): Promise<string> => {
    // Hardcoded knowledge base for the chatbot
    const knowledgeBase = {
      greeting: ['hi', 'hello', 'hey', 'good morning', 'good evening'],
      problemStatements: ['problem statement', 'problem', 'challenge', 'topic'],
      mentors: ['mentor', 'mentors', 'guide', 'guidance'],
      coordinators: ['coordinator', 'coordinators', 'organizer', 'contact'],
      registration: ['register', 'registration', 'sign up', 'join', 'participate'],
      event: ['hackathon', 'event', 'cite', '2026', 'when', 'where', 'duration'],
      website: ['website', 'navigate', 'section', 'page'],
    };

    const lowerMessage = userMessage.toLowerCase();

    // Check for greetings
    if (knowledgeBase.greeting.some(greeting => lowerMessage.includes(greeting))) {
      return "Hello! I'm your CITE Hackathon Assistant. How can I help you today? I can help you with information about problem statements, mentors, coordinators, registration, and event details.";
    }

    // Check for problem statements
    if (knowledgeBase.problemStatements.some(keyword => lowerMessage.includes(keyword))) {
      return "You can find the problem statements in the Problem Statements section of the website. This year, we have two exciting challenges:\n\n1. Smart College Infrastructure Ticketing & Resolution System\n2. Intelligent Faculty Workload & Timetable Allocation System\n\nThese challenges are designed to help participants build impactful AI solutions for real-world college infrastructure problems.";
    }

    // Check for mentors
    if (knowledgeBase.mentors.some(keyword => lowerMessage.includes(keyword))) {
      return "The mentors guiding participants are listed in the Coordinators section of the website. Our experienced mentors include Mr. N. Ganapathi Ram (Coordinator CITE), Mr. K. Naveenraj, and Mr. K. Praveenraja (Developers CITE). They are here to guide you throughout your hackathon journey.";
    }

    // Check for coordinators
    if (knowledgeBase.coordinators.some(keyword => lowerMessage.includes(keyword))) {
      return "The coordinator details are available in the Coordinators section. Mr. N. Ganapathi Ram is the Coordinator CITE at KPR College of Arts Science and Research. You can reach him at ganapathiram.n@kprcas.ac.in or +91 98765 12345 for any assistance.";
    }

    // Check for registration
    if (knowledgeBase.registration.some(keyword => lowerMessage.includes(keyword))) {
      return "Registration for CITE Hackathon 2026 will be opening soon! You can register by clicking the 'Register Now' button on the website. Keep an eye on the website for registration opening announcements. The hackathon is open to all students interested in building AI solutions.";
    }

    // Check for event details
    if (knowledgeBase.event.some(keyword => lowerMessage.includes(keyword))) {
      return "CITE Hackathon 2026 is a 3-day Gen AI innovation hackathon where students collaborate to build real-world AI solutions. The event focuses on solving college infrastructure challenges using artificial intelligence. It's organized by CITE at KPR College of Arts Science and Research.";
    }

    // Check for website navigation
    if (knowledgeBase.website.some(keyword => lowerMessage.includes(keyword))) {
      return "The website has several sections to help you:\n\n• About - Learn about the hackathon\n• Problem Statements - View the challenges\n• Guidelines - Understand the rules and requirements\n• Timeline - Check important dates\n• Coordinators - Meet the mentors and organizers\n• Register - Sign up for the event\n\nYou can navigate using the menu or scroll through the sections.";
    }

    // Default response for out-of-scope questions
    return "I'm here to help with questions about CITE Hackathon 2026. I can assist you with information about problem statements, mentors, coordinators, registration, and event details. For specific questions outside the hackathon scope, please contact the organizers directly. Is there anything about the hackathon I can help you with?";
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Simulate API delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const botResponse = await getBotResponse(inputText);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble responding right now. Please try again later.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    // Chat icon when closed
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-accent to-accent/80 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
        aria-label="Open chat"
      >
        <MessageCircle size={24} className="group-hover:animate-pulse text-black" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
      </button>
    );
  }

  if (!isLoaded) {
    return null; // Don't render anything while loading
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-accent to-accent/80 p-4 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot size={20} className="text-black" />
          <h3 className="font-semibold text-black">CITE Hackathon Assistant</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-white/20 p-1 rounded transition-colors"
          aria-label="Close chat"
        >
          <X size={20} className="text-black" />
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 text-sm">
            <Bot className="mx-auto mb-2 text-black" size={32} />
            <p className="text-black">Hello! I'm your CITE Hackathon Assistant.</p>
            <p className="text-black">How can I help you today?</p>
          </div>
        )}
        
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-accent'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <div className="flex items-start gap-2">
                {message.sender === 'bot' && <Bot size={16} className="mt-1 flex-shrink-0 text-black" />}
                {message.sender === 'user' && <User size={16} className="mt-1 flex-shrink-0 text-black" />}
                <p className={`text-sm whitespace-pre-line ${message.sender === 'user' ? 'text-black' : 'text-black'}`}>{message.text}</p>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Bot size={16} className="text-black" />
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about CITE Hackathon..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !inputText.trim()}
            className="p-2 bg-accent rounded-lg hover:bg-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Send message"
          >
            <Send size={16} className="text-black" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotWidget;
