import React from 'react'
import {useState} from 'react';
import {Link} from 'react-router-dom';
import app from './firebase';
import { getDatabase, ref, onValue} from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider,onAuthStateChanged } from "firebase/auth";
import { useHistory } from 'react-router-dom';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import "../style/join.css";

export const Join = () => {

    const auth = getAuth();
    const { uid, photoURL } = auth.currentUser;

    const db = getDatabase();
    const history = useHistory();

    const [groupName, setgroupName] = useState('');
    const [password, setpassword] = useState('');

    const changeGroupName=(e)=>{
        // console.log(e.target.value);
        setgroupName(e.target.value);
    }
    const changePassword=(e)=>{
        // console.log(e.target.value);
        setpassword(e.target.value);
    }
    const submitted = (e)=>{
        e.preventDefault();
        if(!password || !groupName)
        alert("Please provide both entries !!");
        else
        {
            // console.log(app);
            const dbref = ref(db,'rooms/');
            onValue(dbref,(snapshot)=>{
                const data = snapshot.val();
                // console.log(data);
                const len = Object.keys(data).length;
                // console.log(len);
                Object.keys(data).map((id)=>{
                    // console.log(data[id].groupName,data[id].password,groupName,password);
                    if(data[id].groupName === groupName && data[id].password === password)
                    {
                        // console.log("matched");
                        history.push('/about/'+id+'/'+groupName+'/'+password);
                    }
                })
                alert("use correct credentials");
            },{
                onlyOnce : true
            })
        }
    }
    return (
        <div className='join'>
            <header>
            <h3>Chat App</h3>
            <h1><img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} /></h1>
            <Link to='/'>
                <button className="sign-out" onClick={()=>auth.signOut()}>Sign Out</button>
            </Link>
        </header>

      <section>
            <form onSubmit={submitted}>
                <input type="text" value={groupName} onChange={changeGroupName} placeholder='Enter Group Name'></input>
                <br/>
                <input type="password" value={password} onChange={changePassword} placeholder='Enter Group Password '></input>
                <br/>
                <button type="submit" className='submit'>Join</button>
                <br/>
            </form>
      </section>
            
        </div>
    )
}
