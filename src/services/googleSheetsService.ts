// Google Sheets service for fetching real data from the spreadsheet

// Since we can't use server-side API keys in frontend, we'll use a public CSV export approach
const SPREADSHEET_ID = '1LWbro6edrct9HxdDbpnSwc_0JQRcOuOFPtXeOQrMnio';
const SHEET_ID = '0'; // Default first sheet

export interface TeamData {
  timestamp: string;
  teamName: string;
  department: string;
  teamLeaderName: string;
  email: string;
  mobileNumber: string;
}

export interface SheetStats {
  totalTeams: number;
  departmentCount: number;
  participantCount: number;
  lastUpdated: string;
  departments: string[];
  teams: TeamData[];
}

// Convert CSV string to array of objects
const parseCSV = (csvText: string): TeamData[] => {
  const lines = csvText.split('\n').filter(line => line.trim());
  if (lines.length <= 1) return []; // Only header or empty
  
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
  const data: TeamData[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
    
    if (values.length >= headers.length && values[1]) { // Ensure team name exists
      data.push({
        timestamp: values[0] || '',
        teamName: values[1] || '',
        department: values[2] || '',
        teamLeaderName: values[3] || '',
        email: values[4] || '',
        mobileNumber: values[5] || ''
      });
    }
  }
  
  return data;
};

// Fetch data from Google Sheets via CSV export
export const fetchSheetData = async (): Promise<SheetStats> => {
  try {
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${SHEET_ID}`;
    
    const response = await fetch(csvUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch sheet data');
    }
    
    const csvText = await response.text();
    const teams = parseCSV(csvText);
    
    // Calculate statistics
    const departments = [...new Set(teams.map(team => team.department).filter(dept => dept))];
    const totalTeams = teams.length;
    const departmentCount = departments.length;
    const participantCount = totalTeams; // Assuming 1 participant per team registration
    
    return {
      totalTeams,
      departmentCount,
      participantCount,
      lastUpdated: new Date().toLocaleString('en-US', { 
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      departments,
      teams
    };
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    // Return empty stats on error
    return {
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
    };
  }
};

// Alternative approach using CORS proxy if needed
export const fetchSheetDataWithProxy = async (): Promise<SheetStats> => {
  try {
    // Using a CORS proxy service (you might need to set up your own for production)
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${SHEET_ID}`;
    
    const response = await fetch(proxyUrl + csvUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch sheet data via proxy');
    }
    
    const csvText = await response.text();
    const teams = parseCSV(csvText);
    
    const departments = [...new Set(teams.map(team => team.department).filter(dept => dept))];
    
    return {
      totalTeams: teams.length,
      departmentCount: departments.length,
      participantCount: teams.length,
      lastUpdated: new Date().toLocaleString('en-US', { 
        timeZone: 'Asia/Kolkata',
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      departments,
      teams
    };
  } catch (error) {
    console.error('Error fetching sheet data via proxy:', error);
    return {
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
    };
  }
};
