import logo from './logo.svg';
import './App.css';
import EmployeeRegistration from './registration/employeeRegistration'
import EmployeeTable from './table/EmployeeTable'
import EditEmployee from './employee/editEmployee'
import ViewEmployee from './employee/viewEmployee'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './navbar/NavBars';


function App() {
  return (

    <Router>
    <div className="App">
      <Navbar />

      <Switch>
        <Route exact path="/" component={EmployeeTable} />
        <Route exact path="/table" component={EmployeeTable} />
        <Route exact path="/employee/add" component={EmployeeRegistration} />
        <Route exact path="/employee/edit/:id" component={EditEmployee} />
          <Route exact path="/employee/:id" component={ViewEmployee} />
        
      </Switch>
    </div>
  </Router>
    
   
  );
}

export default App;
