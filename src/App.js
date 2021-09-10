import { useEffect } from 'react';
import firebase from 'firebase';
import './App.css';
import Header from './components/Header/Header';
import MainScreen from './components/MainScreen/MainScreen';
import { useStateValue } from './context/UserState';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import { SidebarContextProvider } from './context/SidebarToggle';



function App() {
  const [{ user }, dispatch] = useStateValue();

  console.log(user)
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
            <Switch>
            {user ?
              <>
                <Route path="/" exact>
                  <SidebarContextProvider >
                    <Header />
                    <MainScreen />
                  </SidebarContextProvider>
                </Route>
                <Route path="/messages/:id">
                  <SidebarContextProvider >
                    <Header />
                    <MainScreen />
                  </SidebarContextProvider>
                </Route>
              </>
              :
              <Route path="/" exact >
                <Login />
              </Route>
            }
            </Switch>
          </Router>
      </div>
    
  );
}

export default App;
