import React, { useRef, useState } from 'react';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signOut } from "firebase/auth";

import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/compat/app';
import "../style/chatroom.css";
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Link } from 'react-router-dom';

firebase.initializeApp({
  apiKey: "AIzaSyCPCsmbERQz3GoWx9JC1-BsknLpMjUsKgY",
  authDomain: "groupchat-30f16.firebaseapp.com",
  databaseURL: "https://groupchat-30f16-default-rtdb.firebaseio.com",
  projectId: "groupchat-30f16",
  storageBucket: "groupchat-30f16.appspot.com",
  messagingSenderId: "731942771911",
  appId: "1:731942771911:web:35c5c8f8d179039ac6f2e2"

})


const auth = firebase.auth();
const auth2 = getAuth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

const Chatroom = () => {
  const popUpstyling = {
    display : "none"
  }
  const { uid, photoURL } = auth.currentUser;
    const history = useHistory();
    const [user] = useAuthState(auth);
    const userDetail = auth2.currentUser;
    // console.log(userDetail);

    const {groupName,password} = useParams();

    const showPopup = ()=>{
      // console.log("popup")
      
      if(document.getElementById("popUp").style.display === "none")
      {
        document.getElementById("popUp").style.display = "block";
        document.getElementById("btn").innerHTML = "Hide Credentials"   
      }
      else
      {
        document.getElementById("popUp").style.display = "none";
        document.getElementById("btn").innerHTML = "Show Credentials"   
      }
    }
    return (
    <div className="classroom">
      <header>
        <button id="btn" onClick={showPopup}>Show Credential</button>
        <div id="popUp" style={popUpstyling}>
          groupid: {groupName},
          password : {password}

        </div>
        <h1><img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} /></h1>
        <Link to='/'>
        <button className="sign-out" onClick={()=>auth.signOut()}>Sign Out</button>
        </Link>
      </header>

      <section>
        {/* {user ? <ChatRoom /> : <SignIn />} */}
        <ChatRoom/>
      </section>

    </div>
  );
}


function ChatRoom() {
  const dummy = useRef();
  const {groupId} = useParams();
    // console.log(groupId);
  const gid = groupId;
  const messagesRef = firestore.collection(gid+'/'+gid+'/messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="say something nice" />

      <button type="submit" className='send' disabled={!formValue}>🕊️</button>

    </form>
  </>)
}


function ChatMessage(props) {
  // console.log(props.message);
  const { text, uid, photoURL } = props.message;
  // const timevar = props.message.createdAt.toDate();
  // const d = new Date();
  // console.log(timevar);

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'}/>
      <p>{text}</p>
      {/* {timevar} */}
    </div>
  </>)
}


export default Chatroom;
