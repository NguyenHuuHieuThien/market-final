
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes,Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { publicRoutes } from './route';
import HomePage from './layout/Home';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Switch> */}
          {publicRoutes.map((routes, index) => {
            const Page = routes.component;
            return (
              <Route
                key={index}
                path={routes.path}
                element={
                  <Page />
                }
              />          
            );
          })}
            <Route
                path="/*"
                element={
                  <HomePage />
                }
              />          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
