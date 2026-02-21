
import React, { useState } from 'react';
import { DataProvider } from './context/DataContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import TaskBoard from './pages/TaskBoard';
import TrackRecord from './pages/TrackRecord';
import Goals from './pages/Goals';
import Team from './pages/Team';
import Modal from './components/Modal';

function App() {
  const [currentView, setCurrentView] = useState('Dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'Dashboard': return <Dashboard />;
      case 'Task Board': return <TaskBoard />;
      case 'Reports': return <TrackRecord />;
      case 'Goals & Targets': return <Goals />;
      case 'Team': return <Team />;
      default: return <Dashboard />;
    }
  };

  return (
    <DataProvider>
      <Layout currentView={currentView} onNavigate={setCurrentView}>
        {renderView()}
      </Layout>
      <Modal />
    </DataProvider>
  );
}

export default App;

