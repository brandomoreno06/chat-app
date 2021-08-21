import { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import MainScreen from './components/MainScreen/MainScreen';
import { useStateValue } from './context/UserState';
import getUserConversations from './utils/getUserConversations';
import getConversationDetails from './utils/getConversationDetails';
import getChatOtherUsers from './utils/getChatOtherUsers';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getFriends, getFriendsDetails } from './utils/getFriends';


function App() {
  const [{ 
    user,
    conversations,
    conversationDetails,
    friends,
  }, dispatch] = useStateValue();


  useEffect(() => {
    getUserConversations(user, dispatch);
    getFriends(user, dispatch);
  }, [])


  useEffect(() => {
    getConversationDetails(conversations, dispatch);
  }, [conversations])


  useEffect(() => {
    getChatOtherUsers(user, conversationDetails, dispatch)
  }, [conversationDetails])

  useEffect(() => {
    getFriendsDetails(friends, dispatch)
  }, [friends])


  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/messages/:id">
            <Header />
            <MainScreen />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
