import React , {useState , useEffect} from 'react';
import { signInWithEmailAndPassword , onAuthStateChanged, createUserWithEmailAndPassword} from 'firebase/auth';
import { auth } from "../firebase";
import {useNavigate} from 'react-router-dom';
import './Welcome.css'


function Welcome() {
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [isRegistering , setIsRegistering] = useState(false);
    const [registerInformation , setRegisterInformation] = useState({
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: ''
    })
    const navigate = useNavigate();

    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            if(user){
                navigate("/homepage");
            }
        });
    },[])

    const handleEmailChange = (e) =>{
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleSignIn = () =>{
        signInWithEmailAndPassword(auth , email , password).then(()=>{
            navigate('/homepage')
        }).catch((err)=>{
            alert("Some error occured please check your internet connection");
        })
    }
    const handleRegister = () =>{
        if(registerInformation.email !== registerInformation.confirmEmail){
            alert("email and confirm email not same");
            return;
        };
        if(registerInformation.password !== registerInformation.confirmPassword){
            alert("password and confirm password not same");
            return;
        }
        createUserWithEmailAndPassword(auth , registerInformation.email , registerInformation.password).then(()=>{
            navigate('/homepage')
        }).catch((err)=>{
            alert("Some error occured please check your internet connection");
        })
    }
  return (
    <div className="welcome">
        <h1 className="heading">TODO List</h1>
        <div className="login-register-container">
            {isRegistering ?
                (<div>
                    <div>
                    <input 
                        type="email" 
                        placeholder='Email' 
                        value={registerInformation.email} 
                        onChange = {(e)=>
                            setRegisterInformation({
                                ...registerInformation , 
                                email: e.target.value
                            })
                        }
                    />
                    </div>
                    <div>
                    <input 
                        type="email" 
                        placeholder='Confirm Email' 
                        value={registerInformation.confirmEmail}
                        onChange = {(e)=>
                            setRegisterInformation({
                                ...registerInformation , 
                                confirmEmail: e.target.value
                            })
                        }
                    />
                    </div>
                    <div>
                    <input 
                        type="password" 
                        placeholder='Password' 
                        value ={registerInformation.password}
                        onChange = {(e)=>
                            setRegisterInformation({
                                ...registerInformation , 
                                password: e.target.value
                            })
                        }
                    />
                    </div>
                    <div>
                    <input 
                        type="password" 
                        placeholder='Confirm Password ' 
                        value={registerInformation.confirmPassword}
                        onChange = {(e)=>
                            setRegisterInformation({
                                ...registerInformation , 
                                confirmPassword: e.target.value
                            })
                        }
                    />
                    </div>
                    <button onClick = {handleRegister}>Register</button>
                    {/* <a href="">Create an account</a> */}
                    <button onClick={()=>setIsRegistering(false)}>Go Back</button>
                </div>)
                :
                (
                <div><div><input type="email" onChange = {handleEmailChange} value = {email} placeholder = "Enter Email"/></div>
                <div><input type="password" onChange = {handlePasswordChange} value = {password} placeholder = "Enter password"/></div>
                <div><button  className = "sign-in-button"onClick = {handleSignIn}>Sign In</button></div>
                {/* <a href="">Create an account</a> */}
                <div><button className = "create-account-button"onClick={()=>setIsRegistering(true)}>Create an account</button></div>
                 </div>)
            }
        </div>
    </div>
  )
}

export default Welcome;