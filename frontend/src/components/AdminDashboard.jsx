import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Area, AreaChart
} from 'recharts';
import {
  Bell, Menu, X, Home, PieChart, Users, Settings,
  HelpCircle, LogOut, Search, ChevronDown, 
  TrendingUp, Package, DollarSign, UserCheck
} from 'lucide-react';
import ProductForm from './ProductForm';
import UserTable from './UserTable';
import AdminProductTable from './AdminProductTable';
import HeroImageUploadForm from './HeroImageUploadForm';
import HeroImageTable from './HeroImageTable';

// Sample Monthly Laptop Sales Data
const salesData = [
  { month: 'Jan', percentage: 20, revenue: 12000 },
  { month: 'Feb', percentage: 35, revenue: 18000 },
  { month: 'Mar', percentage: 50, revenue: 24000 },
  { month: 'Apr', percentage: 40, revenue: 21000 },
  { month: 'May', percentage: 60, revenue: 32000 },
  { month: 'Jun', percentage: 70, revenue: 38000 },
  { month: 'Jul', percentage: 80, revenue: 45000 },
  { month: 'Aug', percentage: 75, revenue: 42000 },
  { month: 'Sep', percentage: 90, revenue: 52000 },
  { month: 'Oct', percentage: 85, revenue: 48000 },
  { month: 'Nov', percentage: 95, revenue: 56000 },
  { month: 'Dec', percentage: 100, revenue: 62000 },
];

const statsCards = [
  { title: 'Total Sales', value: '$449,000', icon: DollarSign, trend: '+12.5%', color: 'bg-blue-500' },
  { title: 'Active Users', value: '2,345', icon: UserCheck, trend: '+5.2%', color: 'bg-green-500' },
  { title: 'Total Products', value: '128', icon: Package, trend: '+3.1%', color: 'bg-purple-500' },
  { title: 'Growth Rate', value: '15.2%', icon: TrendingUp, trend: '+2.4%', color: 'bg-orange-500' },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="animate-pulse space-y-6">
      <div className="h-8 w-72 bg-gray-200 rounded"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-6 h-32"></div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-6 h-96"></div>
        ))}
      </div>
    </div>
  );

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'addItems', label: 'Add Items', icon: PieChart },
    { id: 'regUsers', label: 'Reg Users', icon: Users },
    { id: 'showItems', label: 'Show Items', icon: Settings },
    { id: 'addHeroImages', label: 'Add Hero Images', icon: HelpCircle },
  ];

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
  };

  const MenuItem = ({ item }) => (
    <div
      className={`px-4 py-3 flex items-center gap-3 rounded-lg cursor-pointer transition-all duration-300 ease-in-out
        ${activeMenu === item.id 
          ? 'bg-white text-indigo-700 shadow-lg transform scale-105' 
          : 'text-white hover:bg-white/10'}`}
      onClick={() => setActiveMenu(item.id)}
    >
      <item.icon size={20} />
      {sidebarOpen && <span className="font-medium">{item.label}</span>}
    </div>
  );

  const StatCard = ({ stat }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 transition-transform duration-300 hover:transform hover:scale-105">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{stat.title}</p>
          <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
          <span className="text-green-500 text-sm font-medium">{stat.trend}</span>
        </div>
        <div className={`${stat.color} p-3 rounded-lg bg-opacity-10`}>
          <stat.icon size={24} className={stat.color.replace('bg-', 'text-')} />
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => {
    if (loading) {
      return <LoadingSkeleton />;
    }

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, John! 👋</h2>
          <p className="text-gray-600">
            Here's what's happening with your store today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Monthly Sales Performance</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#4f46e5" 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Growth Rate (%)</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="percentage" 
                    stroke="#4f46e5" 
                    strokeWidth={2}
                    dot={{ fill: '#4f46e5' }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen w-screen bg-gray-50">
      {/* Sidebar */}
      <div 
        className={`${sidebarOpen ? 'w-64' : 'w-20'} 
        bg-gradient-to-b from-indigo-600 to-indigo-800
        text-white transition-all duration-300 ease-in-out
        fixed h-full z-30 shadow-xl`}
      >
        <div className="p-4 flex items-center justify-between">
          {sidebarOpen && <h1 className="text-xl font-bold">Lap Galaxy</h1>}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="mt-8 px-2 space-y-2">
          {menuItems.map(item => (
            <MenuItem key={item.id} item={item} />
          ))}
          
          <div className="pt-8">
            <div
              onClick={handleLogout}
              className="px-4 py-3 flex items-center gap-3 text-white rounded-lg hover:bg-white/10 cursor-pointer transition-all duration-200"
            >
              <LogOut size={20} />
              {sidebarOpen && <span>Logout</span>}
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-20">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-500 hover:text-indigo-600 focus:outline-none transition-colors duration-200">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
              </button>
              
              <div className="relative">
                <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold shadow-lg">
                    JS
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-medium">John Smith</span>
                    <ChevronDown size={16} className={`transform transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50">Settings</a>
                    <hr className="my-2" />
                    <a href="#" onClick={handleLogout} className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">Logout</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          {activeMenu === 'dashboard' && renderDashboard()}
          {activeMenu === 'addItems' && <ProductForm />}
          {activeMenu === 'regUsers' && <UserTable />}
          {activeMenu === 'showItems' && <AdminProductTable />}
          {activeMenu === 'addHeroImages' && (
            <div className="space-y-6">
              <HeroImageUploadForm />
              <HeroImageTable />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
