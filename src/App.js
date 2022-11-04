
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { publicRoutes } from './route';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
