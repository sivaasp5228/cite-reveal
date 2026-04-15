import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  TrendingUp, 
  Activity, 
  Calendar, 
  Trophy, 
  Settings,
  LogOut,
  BarChart3,
  PieChart,
  Clock,
  Target,
  Award,
  FileText
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import ProgressMonitoringSection from './ProgressMonitoringSection';
import PerformanceMetricsSection from './PerformanceMetricsSection';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Shared state for real-time data from all sections
  const [sharedStats, setSharedStats] = useState({
    // From Progress Monitoring
    totalTeams: 0,
    departmentCount: 0,
    participantCount: 0,
    lastUpdated: '',
    
    // From Performance Metrics
    currentVisitors: 0,
    totalToday: 0,
    newVisitors: 0,
    returningVisitors: 0,
    pageViews: 0,
    performanceScore: 0,
    pageLoadTime: '0',
    errorRate: '0',
    uptime: '0',
    avgSessionDuration: 0,
    bounceRate: '0',
    
    // Legacy stats for compatibility
    totalParticipants: 0,
    activeTeams: 0,
    completionRate: 0,
    problemsSolved: 0,
    averageScore: 0,
    totalRegistrations: 0,
    pendingRegistrations: 0,
    approvedRegistrations: 0,
    rejectedRegistrations: 0
  });
  const [realTimeStats, setRealTimeStats] = useState({
    totalTeams: 0,
    totalParticipants: 0,
    activeTeams: 0,
    completionRate: 0,
    problemsSolved: 0,
    averageScore: 0,
    totalRegistrations: 0,
    pendingRegistrations: 0,
    approvedRegistrations: 0,
    rejectedRegistrations: 0
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Load real-time data from localStorage
  useEffect(() => {
    const updateStats = () => {
      const storedTeams = localStorage.getItem('teams');
      const storedRegistrations = localStorage.getItem('registrations');
      
      if (storedTeams && storedRegistrations) {
        const teams = JSON.parse(storedTeams);
        const registrations = JSON.parse(storedRegistrations);
        
        const totalTeams = teams.length;
        const totalRegistrations = registrations.length;
        const pendingRegistrations = registrations.filter((r: any) => r.status === 'pending').length;
        const approvedRegistrations = registrations.filter((r: any) => r.status === 'approved').length;
        const rejectedRegistrations = registrations.filter((r: any) => r.status === 'rejected').length;
        const totalParticipants = approvedRegistrations;
        const activeTeams = teams.filter((team: any) => team.currentMembers > 0).length;
        
        // Calculate completion rate (mock data for now)
        const completionRate = totalRegistrations > 0 ? Math.round((approvedRegistrations / totalRegistrations) * 100) : 0;
        
        setRealTimeStats({
          totalTeams,
          totalParticipants,
          activeTeams,
          completionRate,
          problemsSolved: 127, // Mock data - would come from actual submissions
          averageScore: 78.5, // Mock data - would come from actual scores
          totalRegistrations,
          pendingRegistrations,
          approvedRegistrations,
          rejectedRegistrations
        });
      }
    };

    updateStats();
    
    // Set up interval for real-time updates
    const interval = setInterval(updateStats, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'registrations', label: 'Registration Statistics', icon: Users },
    { id: 'progress', label: 'Progress Monitoring', icon: Activity },
    { id: 'performance', label: 'Performance Metrics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gold-gradient">Dashboard Overview</h2>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400">Live Data</span>
              </div>
            </div>
            
            {/* Real-time Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card-gold p-6 border-gold-glow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Teams</p>
                    <p className="text-3xl font-bold text-accent">{sharedStats.totalTeams}</p>
                    <p className="text-xs text-green-400 mt-1">From Progress</p>
                  </div>
                  <Users className="text-accent" size={24} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card-gold p-6 border-gold-glow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Participants</p>
                    <p className="text-3xl font-bold text-blue-400">{sharedStats.participantCount}</p>
                    <p className="text-xs text-blue-400 mt-1">Team Leaders</p>
                  </div>
                  <Trophy className="text-blue-400" size={24} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card-gold p-6 border-gold-glow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Visitors</p>
                    <p className="text-3xl font-bold text-green-400">{sharedStats.currentVisitors}</p>
                    <p className="text-xs text-green-400 mt-1">Online Now</p>
                  </div>
                  <Activity className="text-green-400" size={24} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card-gold p-6 border-gold-glow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Performance</p>
                    <p className="text-3xl font-bold text-purple-400">{sharedStats.performanceScore}</p>
                    <p className="text-xs text-purple-400 mt-1">Health Score</p>
                  </div>
                  <Target className="text-purple-400" size={24} />
                </div>
              </motion.div>
            </div>

            {/* Detailed Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="glass-card-gold p-6 border-gold-glow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Departments</p>
                    <p className="text-2xl font-bold text-accent">{sharedStats.departmentCount}</p>
                    <p className="text-xs text-muted-foreground mt-1">Active</p>
                  </div>
                  <Award className="text-accent" size={20} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="glass-card-gold p-6 border-gold-glow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Today's Visitors</p>
                    <p className="text-2xl font-bold text-blue-400">{sharedStats.totalToday}</p>
                    <p className="text-xs text-muted-foreground mt-1">Total Today</p>
                  </div>
                  <BarChart3 className="text-blue-400" size={20} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glass-card-gold p-6 border-gold-glow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Page Load</p>
                    <p className="text-2xl font-bold text-green-400">{sharedStats.pageLoadTime}s</p>
                    <p className="text-xs text-muted-foreground mt-1">Seconds</p>
                  </div>
                  <Clock className="text-green-400" size={20} />
                </div>
              </motion.div>
            </div>

            {/* Live Activity Feed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="glass-card-gold p-6 border-gold-glow"
            >
              <h3 className="text-lg font-semibold mb-4 text-gold-gradient">Real-time Activity</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-3 bg-black/20 rounded-lg">
                  <p className="text-muted-foreground">New Visitors</p>
                  <p className="text-xl font-bold text-green-400">{sharedStats.newVisitors}</p>
                </div>
                <div className="p-3 bg-black/20 rounded-lg">
                  <p className="text-muted-foreground">Returning</p>
                  <p className="text-xl font-bold text-blue-400">{sharedStats.returningVisitors}</p>
                </div>
                <div className="p-3 bg-black/20 rounded-lg">
                  <p className="text-muted-foreground">Page Views</p>
                  <p className="text-xl font-bold text-purple-400">{sharedStats.pageViews}</p>
                </div>
              </div>
            </motion.div>
          </div>
        );

      case 'registrations':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gold-gradient">Registration Statistics</h2>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400">Live Form</span>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card-gold p-4 border-gold-glow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Registrations</p>
                    <p className="text-2xl font-bold text-accent">{sharedStats.totalTeams}</p>
                  </div>
                  <Users className="text-accent" size={20} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card-gold p-4 border-gold-glow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Departments</p>
                    <p className="text-2xl font-bold text-blue-400">{sharedStats.departmentCount}</p>
                  </div>
                  <Award className="text-blue-400" size={20} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card-gold p-4 border-gold-glow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Participants</p>
                    <p className="text-2xl font-bold text-green-400">{sharedStats.participantCount}</p>
                  </div>
                  <Trophy className="text-green-400" size={20} />
                </div>
              </motion.div>
            </div>
            
            {/* Google Form Embed */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card-gold p-6 border-gold-glow"
            >
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gold-gradient mb-2">Live Registration Form</h3>
                <p className="text-sm text-muted-foreground">
                  View and interact with the CITE HACKATHON 2026 registration form in real-time
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="mb-4 flex flex-wrap gap-3">
                <button
                  onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSe3Bag6hT4VLEsDPWGN6zlkuBn_PTW6Olvx1FlFFW9Ei6j1Bg/viewform', '_blank')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors text-sm"
                >
                  <Users size={16} />
                  Open Form in New Tab
                </button>
                <button
                  onClick={() => window.open('https://docs.google.com/spreadsheets/d/1FAIpQLSe3Bag6hT4VLEsDPWGN6zlkuBn_PTW6Olvx1FlFFW9Ei6j1Bg/edit', '_blank')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 text-blue-400 rounded-lg hover:bg-blue-600/20 transition-colors text-sm"
                >
                  <FileText size={16} />
                  View Responses
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/10 text-green-400 rounded-lg hover:bg-green-600/20 transition-colors text-sm"
                >
                  <Activity size={16} />
                  Refresh Data
                </button>
              </div>
              
              {/* Google Form iframe */}
              <div className="relative w-full rounded-lg overflow-hidden border border-border" style={{ height: '600px' }}>
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSe3Bag6hT4VLEsDPWGN6zlkuBn_PTW6Olvx1FlFFW9Ei6j1Bg/viewform"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
                  className="bg-background"
                  title="CITE HACKATHON 2026 Registration Form"
                >
                  Loading registration form...
                </iframe>
              </div>
              
              {/* Form Information */}
              <div className="mt-4 p-4 bg-black/20 rounded-lg">
                <h4 className="text-sm font-semibold text-accent mb-2">Form Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div>Form ID: 1FAIpQLSe3Bag6hT4VLEsDPWGN6zlkuBn_PTW6Olvx1FlFFW9Ei6j1Bg</div>
                  <div>Status: Active and Accepting Responses</div>
                  <div>Responses: Linked to Google Sheets</div>
                  <div>Last Updated: Real-time</div>
                </div>
              </div>
            </motion.div>
          </div>
        );

      case 'teams':
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚧</div>
            <h2 className="text-2xl font-bold text-gold-gradient mb-2">Coming Soon</h2>
            <p className="text-muted-foreground">This section is under development</p>
          </div>
        );

      case 'progress':
        return <ProgressMonitoringSection onDataUpdate={setSharedStats} />;

      case 'performance':
        return <PerformanceMetricsSection onDataUpdate={setSharedStats} />;

      case 'students':
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚧</div>
            <h2 className="text-2xl font-bold text-gold-gradient mb-2">Coming Soon</h2>
            <p className="text-muted-foreground">This section is under development</p>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚧</div>
            <h2 className="text-2xl font-bold text-gold-gradient mb-2">Coming Soon</h2>
            <p className="text-muted-foreground">This section is under development</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <div className="bg-black/80 backdrop-blur-xl border-b border-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-gold-gradient">Admin Dashboard</h1>
            <span className="text-sm text-muted-foreground">CITE Hackathon 2026</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-accent">Welcome, {user?.username}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="glass-card-gold p-4 border-gold-glow">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          activeSection === item.id
                            ? 'bg-accent/20 text-accent'
                            : 'text-muted-foreground hover:text-accent hover:bg-accent/10'
                        }`}
                      >
                        <Icon size={18} />
                        <span className="text-sm font-medium">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
