import React, { useEffect } from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider,onAuthStateChanged } from "firebase/auth";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import "../style/Login.css";

const provider = new GoogleAuthProvider();
const auth = getAuth();


export const Login = () => {
    const history = useHistory();
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              history.push('/home');
            } else {
              console.log("no user is currently signed in");
            }
          });
    }, [])
    const signIn = ()=>{
        signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        history.push('/home');
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        
      });
    }
    return (
        <div className='login'>

          <header>
              <h3>Chat App</h3>
          </header>

          <section>
                <button onClick={signIn} className='sign-in'>
                    LOGIN
                </button>
          </section>

        </div>
    )
}
