import './App.css';
//import firebase from 'firebase/app';
import 'firebase/auth';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import RedirectRoute from './RedirectRoute';
import Header from './Header';
import SearchBar from './Search';
import Login from './Login';
import Signup from './Signup';



function App() {

  

  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <Router>
          <Switch>
            <RedirectRoute exact path="/" component={SearchBar} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
