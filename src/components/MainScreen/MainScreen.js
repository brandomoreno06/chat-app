import React, { useEffect } from 'react';
import './MainScreen.css';
import ChatScreen from '../Chatscreen/ChatScreen';
import Sidebar from '../Sidebar/Sidebar';
import { useStateValue } from '../../context/UserState';
import getUserConversations from '../../utils/getUserConversations';
import getConversationDetails from '../../utils/getConversationDetails';
import getChatOtherUsers from '../../utils/getChatOtherUsers';
import { getFriends, getFriendsDetails } from '../../utils/getFriends';
import Sidebar2 from '../Sidebar2/Sidebar2';
import getAllUsers from '../../utils/getAllUsers';


const MainScreen = (props) => {
  const [{ 
    user,
    conversations,
    conversationDetails,
    friends,
  }, dispatch] = useStateValue();


  useEffect(() => {
    getUserConversations(user, dispatch);
    getFriends(user, dispatch);
    getAllUsers(user, dispatch);
  }, [])


  useEffect(() => {
    getConversationDetails(user, conversations, dispatch);
  }, [conversations])


  useEffect(() => {
    getChatOtherUsers(user, conversationDetails, dispatch)
  }, [conversationDetails])


  useEffect(() => {
    getFriendsDetails(user, friends, dispatch);
  }, [friends])


  return (
    <div className="mainScreen">
      <Sidebar/>
      <ChatScreen />
      <Sidebar2 />
    </div>
  )
}
 
 
 
export default MainScreen   ;
 