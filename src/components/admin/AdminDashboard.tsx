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

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
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
            <h2 className="text-2xl font-bold text-gold-gradient">Dashboard Overview</h2>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card-gold p-6 border-gold-glow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Teams</p>
                    <p className="text-3xl font-bold text-accent">{realTimeStats.totalTeams}</p>
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
                    <p className="text-sm text-muted-foreground">Total Participants</p>
                    <p className="text-3xl font-bold text-accent">{realTimeStats.totalParticipants}</p>
                  </div>
                  <Trophy className="text-accent" size={24} />
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
                    <p className="text-sm text-muted-foreground">Active Teams</p>
                    <p className="text-3xl font-bold text-accent">{realTimeStats.activeTeams}</p>
                  </div>
                  <Activity className="text-accent" size={24} />
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
                    <p className="text-sm text-muted-foreground">Total Registrations</p>
                    <p className="text-3xl font-bold text-accent">{realTimeStats.totalRegistrations}</p>
                  </div>
                  <Users className="text-accent" size={24} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="glass-card-gold p-6 border-gold-glow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending Approvals</p>
                    <p className="text-3xl font-bold text-yellow-400">{realTimeStats.pendingRegistrations}</p>
                  </div>
                  <Clock className="text-yellow-400" size={24} />
                </div>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="glass-card-gold p-6 border-gold-glow"
            >
              <h3 className="text-lg font-semibold mb-4 text-gold-gradient">Live Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-3 bg-black/20 rounded-lg">
                  <p className="text-muted-foreground">Approved Students</p>
                  <p className="text-xl font-bold text-green-400">{realTimeStats.approvedRegistrations}</p>
                </div>
                <div className="p-3 bg-black/20 rounded-lg">
                  <p className="text-muted-foreground">Pending Approval</p>
                  <p className="text-xl font-bold text-yellow-400">{realTimeStats.pendingRegistrations}</p>
                </div>
                <div className="p-3 bg-black/20 rounded-lg">
                  <p className="text-muted-foreground">Rejected Students</p>
                  <p className="text-xl font-bold text-red-400">{realTimeStats.rejectedRegistrations}</p>
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
