import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fal } from '@fortawesome/pro-light-svg-icons'

import Landing from './components/Landing';
import Home from "./components/Dashboard/Home/Home";
import OrgsDashboard from "./components/Dashboard/Orgs/OrgsDashboard";

import "./App.css";

library.add(fal)

function App() {
  return (
    <div className="App">
      <HelmetProvider>
        <Router>
          <Helmet>
            <title>BADGER</title>
            <meta property="og:title" content="BADGER" />
            <meta name="twitter:title" content="BADGER" />

            <meta name="description" content="Badge-ify the roles that control the gates of your on-chain organization." />
            <meta property="og:description" content="Badge-ify the roles that control the gates of your on-chain organization." />
            <meta name="twitter:description" content="Badge-ify the roles that control the gates of your on-chain organization." />
          </Helmet>

        
          <Routes>
            <Route exact path="/" element={<Landing />} />

            {/* Dashboard pages */}
            <Route exact path="/dashboard/" element={<Home />} />
            <Route path="/organizations/:address" element={ <OrgsDashboard /> } />
            
            {/* <Route path="/org/:id" element={<OrgDashboard /> } /> */}
          </Routes>
          {/* <Footer /> */}
        </Router>
      </HelmetProvider>
    </div>
  );
}

export default App;
