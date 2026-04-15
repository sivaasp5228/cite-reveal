import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Trophy, FileText, Target, Activity } from 'lucide-react';
import { fetchSheetData, fetchSheetDataWithProxy, type SheetStats } from '@/services/googleSheetsService';

interface ProgressMonitoringSectionProps {
  onDataUpdate?: (data: any) => void;
}

const ProgressMonitoringSection = ({ onDataUpdate }: ProgressMonitoringSectionProps) => {
  const [sheetData, setSheetData] = useState<SheetStats>({
    totalTeams: 0,
    departmentCount: 0,
    participantCount: 0,
    lastUpdated: new Date().toLocaleString('en-US', { 
      timeZone: 'Asia/Kolkata',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }),
    departments: [],
    teams: []
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch real data from Google Sheets
  const fetchAndUpdateData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Try direct CSV export first
      let data = await fetchSheetData();
      
      // If direct method fails, try with proxy
      if (data.totalTeams === 0 && data.teams.length === 0) {
        data = await fetchSheetDataWithProxy();
      }
      
      setSheetData(data);
      setIsLoading(false);
      
      // Update parent component with new data
      if (onDataUpdate) {
        onDataUpdate(prev => ({
          ...prev,
          totalTeams: data.totalTeams,
          departmentCount: data.departmentCount,
          participantCount: data.participantCount,
          lastUpdated: data.lastUpdated
        }));
      }
    } catch (err) {
      console.error('Error fetching sheet data:', err);
      setError('Failed to fetch data from Google Sheet');
      setIsLoading(false);
    }
  };

  // Initial data fetch and real-time updates
  useEffect(() => {
    fetchAndUpdateData();
    const interval = setInterval(fetchAndUpdateData, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gold-gradient">Progress Monitoring</h2>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-green-400">Live Data</span>
        </div>
      </div>
      
      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-600/10 border border-red-600/20 rounded-lg"
        >
          <p className="text-red-400 text-sm">{error}</p>
        </motion.div>
      )}
      
      {/* Real-time Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card-gold p-6 border-gold-glow"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Teams</p>
              <p className="text-3xl font-bold text-accent">
                {isLoading ? '...' : sheetData.totalTeams}
              </p>
              <p className="text-xs text-green-400 mt-1">
                {sheetData.totalTeams > 0 ? 'Registered teams' : 'No teams yet'}
              </p>
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
              <p className="text-sm text-muted-foreground">Departments</p>
              <p className="text-3xl font-bold text-blue-400">
                {isLoading ? '...' : sheetData.departmentCount}
              </p>
              <p className="text-xs text-blue-400 mt-1">Active departments</p>
            </div>
            <Award className="text-blue-400" size={24} />
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
              <p className="text-sm text-muted-foreground">Participants</p>
              <p className="text-3xl font-bold text-green-400">
                {isLoading ? '...' : sheetData.participantCount}
              </p>
              <p className="text-xs text-green-400 mt-1">Team leaders registered</p>
            </div>
            <Trophy className="text-green-400" size={24} />
          </div>
        </motion.div>
      </div>
      
      {/* Google Sheet Embed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card-gold p-6 border-gold-glow"
      >
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gold-gradient mb-2">Team Progress Spreadsheet</h3>
          <p className="text-sm text-muted-foreground">
            Real-time view of team registrations and progress tracking
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Last updated: {sheetData.lastUpdated}
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="mb-4 flex flex-wrap gap-3">
          <button
            onClick={() => window.open('https://docs.google.com/spreadsheets/d/1LWbro6edrct9HxdDbpnSwc_0JQRcOuOFPtXeOQrMnio/edit?usp=sharing', '_blank')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-colors text-sm"
          >
            <FileText size={16} />
            Open Spreadsheet
          </button>
          <button
            onClick={() => window.open('https://docs.google.com/spreadsheets/d/1LWbro6edrct9HxdDbpnSwc_0JQRcOuOFPtXeOQrMnio/export?format=xlsx', '_blank')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600/10 text-green-400 rounded-lg hover:bg-green-600/20 transition-colors text-sm"
          >
            <Target size={16} />
            Export Data
          </button>
          <button
            onClick={fetchAndUpdateData}
            disabled={isLoading}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 text-blue-400 rounded-lg hover:bg-blue-600/20 transition-colors text-sm disabled:opacity-50"
          >
            <Activity size={16} />
            {isLoading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>
        
        {/* Google Sheet iframe */}
        <div className="relative w-full rounded-lg overflow-hidden border border-border" style={{ height: '600px' }}>
          <iframe
            src="https://docs.google.com/spreadsheets/d/1LWbro6edrct9HxdDbpnSwc_0JQRcOuOFPtXeOQrMnio/edit?usp=sharing"
            width="100%"
            height="100%"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            className="bg-background"
            title="CITE Hackathon 2026 Progress Tracking"
          >
            Loading progress tracking spreadsheet...
          </iframe>
        </div>
        
        {/* Department Breakdown */}
        {sheetData.departments.length > 0 && (
          <div className="mt-4 p-4 bg-black/20 rounded-lg">
            <h4 className="text-sm font-semibold text-accent mb-2">Department Breakdown</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              {sheetData.departments.map((dept, index) => (
                <div key={index} className="text-muted-foreground">
                  {dept}
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Data Insights */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-black/20 rounded-lg">
            <h4 className="text-sm font-semibold text-accent mb-2">Registration Analytics</h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Total registrations:</span>
                <span className="text-accent font-semibold">{sheetData.totalTeams}</span>
              </div>
              <div className="flex justify-between">
                <span>Department coverage:</span>
                <span className="text-blue-400 font-semibold">{sheetData.departmentCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Registration rate:</span>
                <span className="text-green-400 font-semibold">
                  {sheetData.totalTeams > 0 ? 'Active' : 'Pending'}
                </span>
              </div>
            </div>
          </div>
          <div className="p-4 bg-black/20 rounded-lg">
            <h4 className="text-sm font-semibold text-accent mb-2">System Status</h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Data source:</span>
                <span className="text-accent font-semibold">Google Sheets</span>
              </div>
              <div className="flex justify-between">
                <span>Sync status:</span>
                <span className="text-green-400 font-semibold">
                  {isLoading ? 'Syncing...' : 'Connected'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Last sync:</span>
                <span className="text-yellow-400 font-semibold">{sheetData.lastUpdated}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProgressMonitoringSection;
