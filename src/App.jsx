import { useState } from 'react';
import './App.css';
import Paper from './Paper';

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
          <p className="tagline">YouTube Gaming Content</p>
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
          <button
            className={`nav-button ${activeView === 'paper' ? 'active' : ''}`}
            onClick={() => setActiveView('paper')}
          >
            <span className="nav-icon">📄</span>
            Paper
          </button>
        </nav>

        {/* Research Overview */}
        <div className="sidebar-section">
          <h3>Research Overview</h3>
          <div className="info-card">
            <div className="info-label">Focus</div>
            <div className="info-value">Provider-side fairness in multilingual gaming content</div>
          </div>
          <div className="info-card">
            <div className="info-label">Method</div>
            <div className="info-value">Post-processing re-ranking with boost factors</div>
          </div>
          <div className="info-card">
            <div className="info-label">Dataset</div>
            <div className="info-value">700 videos, 7 channels (Sept-Oct 2025)</div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="sidebar-section">
          <h3>Key Results</h3>
          <div className="metric-item">
            <div className="metric-value">75%</div>
            <div className="metric-label">Kazakh Rep.</div>
            <div className="metric-detail">1.63× lift</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">85%</div>
            <div className="metric-label">Emerging</div>
            <div className="metric-detail">2.98× lift</div>
          </div>
          <div className="metric-item">
            <div className="metric-value">98%</div>
            <div className="metric-label">Engagement</div>
            <div className="metric-detail">Retention</div>
          </div>
        </div>

        {/* Algorithm Parameters */}
        <div className="sidebar-section">
          <h3>Algorithm Setup</h3>
          <div className="info-card">
            <div className="info-label">Kazakh Boost</div>
            <div className="info-value">1.25×</div>
          </div>
          <div className="info-card">
            <div className="info-label">Emerging Boost</div>
            <div className="info-value">1.25×</div>
          </div>
          <div className="info-card">
            <div className="info-label">Threshold</div>
            <div className="info-value">&lt;600K subs</div>
          </div>
          <div className="info-card">
            <div className="info-label">Channel Limit</div>
            <div className="info-value">2 per channel</div>
          </div>
        </div>

        {/* Language Distribution */}
        <div className="sidebar-section">
          <h3>Dataset Languages</h3>
          <div className="lang-bar">
            <div className="lang-item" style={{width: '46.1%', background: '#1f77b4'}}>
              <span>KZ 46%</span>
            </div>
            <div className="lang-item" style={{width: '43.1%', background: '#ff7f0e'}}>
              <span>RU 43%</span>
            </div>
            <div className="lang-item" style={{width: '8.6%', background: '#2ca02c'}}>
              <span>Mix 9%</span>
            </div>
            <div className="lang-item" style={{width: '2.2%', background: '#d62728'}}>
              <span>EN 2%</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
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
              <h2>Research Highlights</h2>
              <ul>
                <li><strong>Objective:</strong> Address language-based and creator-size inequities in YouTube gaming recommendations</li>
                <li><strong>Approach:</strong> Post-processing re-ranking with multiplicative boost factors (1.25× for Kazakh content and emerging creators)</li>
                <li><strong>Key Achievement:</strong> 75% Kazakh representation and 85% emerging creator representation while maintaining 98% engagement retention</li>
                <li><strong>Validation:</strong> Cross-validation confirmed stability (CV &lt;0.05 for all primary metrics)</li>
              </ul>
            </div>

            <div className="dataset-info">
              <h2>Dataset Overview</h2>
              <ul>
                <li><strong>Total Videos:</strong> 700</li>
                <li><strong>Channels:</strong> 7 (215K-1.48M subscribers)</li>
                <li><strong>Languages:</strong> Kazakh (46.1%), Russian (43.1%), Mixed (8.6%), English (2.1%)</li>
                <li><strong>Period:</strong> September-October 2025</li>
                <li><strong>Average Views:</strong> 143,004 per video</li>
                <li><strong>Average Engagement:</strong> 0.0330 (3.3%)</li>
              </ul>
            </div>

            <div className="dataset-info">
              <h2>Methodology</h2>
              <ul>
                <li><strong>Stage 1:</strong> Content-Based Filtering (TF-IDF vectorization, 100 features)</li>
                <li><strong>Stage 2:</strong> Collaborative Filtering (engagement rate, view counts, recency)</li>
                <li><strong>Stage 3:</strong> Fairness-Aware Re-Ranking (boost factors + channel diversity penalties)</li>
                <li><strong>Optimization:</strong> Grid search across 324 parameter configurations</li>
              </ul>
            </div>

            <button 
              className="cta-button"
              onClick={() => setActiveView('visualization')}
            >
              View Visualizations →
            </button>
          </div>
        ) : activeView === 'paper' ? (
          <Paper />
        ) : (
          <div className="visualization-container">
            {visualizations.map((viz) => (
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