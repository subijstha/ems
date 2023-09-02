import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';


function App() {
  return (
    <div>
      <Router>
        <div className="container">
          <HeaderComponent />
          <div className="container">
            <Routes>
              <Route path="/" exact element={<ListEmployeeComponent />} ></Route>
              <Route path="/employees" element={<ListEmployeeComponent />} ></Route>
              <Route path="/add-employee" element={<CreateEmployeeComponent />}></Route>
              <Route path="/update-employee/:id" element={<UpdateEmployeeComponent />}></Route>
            </Routes>

          </div>
          <FooterComponent />
        </div>
      </Router>
    </div>

  );
}

export default App;

