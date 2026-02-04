import { useState } from 'react';
import './App.css';

function App() {
  const [activeView, setActiveView] = useState('visualization');
  const [loadingStates, setLoadingStates] = useState({
    viz1: true,
    viz2: true,
    viz3: true,
  });

  const handleIframeLoad = (vizId) => {
    setLoadingStates(prev => ({ ...prev, [vizId]: false }));
  };

  const visualizations = [
    {
      id: 'viz1',
      title: 'Figure 1: Algorithm Performance Comparison',
      subtitle: 'Grouped bar chart comparing 4 algorithms across 4 metrics',
      src: `${import.meta.env.BASE_URL}Figure_1_Algorithm_Comparison.html`,
    },
    {
      id: 'viz2',
      title: 'Figure 2: Language Representation Shift',
      subtitle: 'Before/after language distribution (46.1% → 75% Kazakh)',
      src: `${import.meta.env.BASE_URL}Figure_2_Language_Shift.html`,
    },
    {
      id: 'viz3',
      title: 'Figure 3: Cross-Validation Stability',
      subtitle: 'Metric distribution across 5 data folds',
      src: `${import.meta.env.BASE_URL}Figure_3_CrossValidation_Stability.html`,
    }
  ];

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <h2>Fairness-Aware Dashboard</h2>
        </div>
        
        <nav className="nav-menu">
          <button
            className={`nav-button ${activeView === 'home' ? 'active' : ''}`}
            onClick={() => setActiveView('home')}
          >
            <span className="nav-icon">🏠</span>
            Home
          </button>
          <button
            className={`nav-button ${activeView === 'visualization' ? 'active' : ''}`}
            onClick={() => setActiveView('visualization')}
          >
            <span className="nav-icon">📊</span>
            Visualizations
          </button>
        </nav>

        {/* Metrics in Sidebar */}
        <div className="sidebar-metrics">
          <h3>Key Metrics</h3>
          <div className="metric-item">
            <div className="metric-value">75%</div>
            <div className="metric-label">Kazakh Rep.</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">85%</div>
            <div className="metric-label">Emerging</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">98%</div>
            <div className="metric-label">Engagement</div>
          </div>
        </div>
      </aside>

      {/* Main Content - Now Scrollable */}
      <main className="main-content">
        {activeView === 'home' ? (
          <div className="home-view">
            <h1>Fairness-Aware Recommendation System</h1>
            <p className="research-context">
              This dashboard presents findings from a fairness-aware recommendation system 
              for Kazakhstani gaming content on YouTube. The system addresses systematic 
              underrepresentation of Kazakh-language videos and emerging creators through 
              post-processing re-ranking algorithms.
            </p>
            <div className="dataset-info">
              <h2>Dataset Overview</h2>
              <ul>
                <li><strong>Total Videos:</strong> 700</li>
                <li><strong>Channels:</strong> 7 (215K-1.48M subscribers)</li>
                <li><strong>Languages:</strong> Kazakh (46.1%), Russian (43.1%), Mixed (8.6%), English (2.1%)</li>
                <li><strong>Period:</strong> September-October 2025</li>
              </ul>
            </div>
            <button 
              className="cta-button"
              onClick={() => setActiveView('visualization')}
            >
              View Visualizations →
            </button>
          </div>
        ) : (
          <div className="visualization-container">
            {visualizations.map((viz, index) => (
              <div key={viz.id} className="viz-section">
                <div className="viz-header">
                  <h3>{viz.title}</h3>
                  <p>{viz.subtitle}</p>
                </div>
                <div className="viz-wrapper">
                  {loadingStates[viz.id] && (
                    <div className="loading">
                      <div className="spinner"></div>
                      <div>Loading visualization...</div>
                    </div>
                  )}
                  <iframe
                    src={viz.src}
                    title={viz.title}
                    onLoad={() => handleIframeLoad(viz.id)}
                    style={{ display: loadingStates[viz.id] ? 'none' : 'block' }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
