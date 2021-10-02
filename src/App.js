import { useEffect } from 'react';
import firebase from 'firebase';
import './App.css';
import Header from './components/Header/Header';
import MainScreen from './components/MainScreen/MainScreen';
import { useStateValue } from './context/UserState';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Landing from './components/Landing/Landing';



function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        })
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        })
      }
    })
    
    return () => { unsubscribe() }
  }, [])


  return (
      <div className="App">
          <Router>
            <Header />
            <Switch>
            {user ?
              <>
                <Route path="/" exact>
                    {/* <Header /> */}
                    <MainScreen />
                </Route>
                <Route path="/messages/:id">
                    {/* <Header /> */}
                    <MainScreen />
                </Route>
              </>
              :
              <>
                <Route path="/" exact >
                  <Landing />
                </Route>
                <Route path="/login" exact >
                  <Login />
                </Route>
              </>
            }
            </Switch>
          </Router>
      </div>
    
  );
}

export default App;
