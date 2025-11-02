import { Link } from 'react-router-dom';
import SailingIcon from '@mui/icons-material/Sailing';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import CompassCalibrationIcon from '@mui/icons-material/CompassCalibration';
import './NotFound.css';
const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        {/* Animated Background */}
        <div className="ocean-background">
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>

        {/* Main Content */}
        <div className="not-found-content">
          <div className="error-code">
            <span className="code-digit">4</span>
            <SailingIcon className="code-icon" />
            <span className="code-digit">4</span>
          </div>

          <div className="error-message">
            <h1>Lost at Sea!</h1>
            <p>
              The page you're looking for has sailed off into uncharted waters. 
              Don't worry, even the best navigators sometimes lose their way.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <h2>Chart a New Course</h2>
            <div className="action-buttons">
              <Link to="/" className="action-btn primary">
                <HomeIcon />
                Return to Home Port
              </Link>
              <Link to="/book-series" className="action-btn secondary">
                <CompassCalibrationIcon />
                Explore the Book Series
              </Link>
              <button 
                onClick={() => window.history.back()} 
                className="action-btn outline"
              >
                <SearchIcon />
                Go Back to Previous Page
              </button>
            </div>
          </div>

          {/* Search Suggestion */}
          <div className="search-suggestion">
            <p>Or search for what you're looking for:</p>
            <div className="search-box">
              <input 
                type="text" 
                placeholder="Search across the seven seas..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    // Implement search functionality here
                    alert('Search functionality would go here!');
                  }
                }}
              />
              <SearchIcon className="search-icon" />
            </div>
          </div>

          {/* Fun Facts */}
          <div className="fun-facts">
            <h3>Did you know?</h3>
            <div className="facts-grid">
              <div className="fact-card">
                <SailingIcon />
                <p>Captain Bartley's ship, the Victora, has sailed over 10,000 nautical miles in our stories!</p>
              </div>
              <div className="fact-card">
                <CompassCalibrationIcon />
                <p>The crew once navigated through a storm using only the stars as their guide.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="decorative-elements">
          <div className="floating-ship"></div>
          <div className="floating-compass"></div>
          <div className="floating-treasure"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;