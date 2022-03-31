import React, { useEffect } from 'react'
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getAuth, signInWithPopup, GoogleAuthProvider,onAuthStateChanged } from "firebase/auth";
import "../style/Home.css";





export const Home = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();

    const { uid, photoURL } = auth.currentUser;

    const history = useHistory();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
            } else {
            //   console.log("no user is currently signed in");
              history.push('/');
            }
          });
    }, [])
    return (
        <div className='home' align="center"> 


        <header>
            <h3>Chat App</h3>
            <h1><img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} /></h1>
            <Link to='/'>
                <button className="sign-out" onClick={()=>auth.signOut()}>Sign Out</button>
            </Link>
            
        </header>

      <section>
            <h2>Already have chatroom name and password ?</h2>
            <h2>Join Here</h2>
            <Link to="/join">
                <button className='submit'>
                    Join Group
                </button>
            </Link>
            <br/>

            <h2>Don't have chatroom name and password ?</h2>
            <h2>Create Here</h2>
            <Link to="/create">
                <button className='submit'>
                    Create Group
                </button>
            </Link>
      </section>

        </div>
    )
}