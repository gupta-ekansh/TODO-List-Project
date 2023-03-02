import React , {useEffect , useState} from 'react';
import { signOut , onAuthStateChanged } from 'firebase/auth';
import {auth , db} from '../firebase';
import {useNavigate} from 'react-router-dom';
import {uid} from "uid";
import {set,ref, onValue, getDatabase} from "firebase/database";
import { remove , update} from 'firebase/database';
import './Homepage.css';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
function Homepage() {
    const navigate = useNavigate();
    // const db = getDatabase();
    const [todo , setTodo] = useState("");
    const [todos , setTodos] = useState([]);
    const [isEdit , setIsEdit] = useState(false);
    const [tempUidd , setTempUidd] = useState('');
    const [done , setDone] = useState(false);
    useEffect(()=>{
        // console.log(auth.currentUser.email);
        auth.onAuthStateChanged(user=>{
            if(user){
                onValue(ref(db , `${auth.currentUser.uid}`), snapshot => {
                    setTodos([]);
                    const data = snapshot.val();
                    if(data !== null){
                        Object.values(data).map(todo=>{
                            setTodos((oldArray)=>[...oldArray , todo]);
                        });
                    }
                })
            }
            else if(!user){
                navigate('/')
            }
        })
    },[])
    const handleSignOut = ()=>{
        signOut(auth)
        .then(()=>{
            navigate('/');
        })
        .catch(err=>{
            alert("Some error ocfured please cheack your internet connection");
        });
    }
    const writeToDatabase = () =>{
        const uidd = uid();
        const newDb = getDatabase();
        console.log(newDb);
        set(ref(newDb,`/${auth.currentUser.uid}/${uidd}`),{
            todo: todo, 
            uidd: uidd,
        });
        setTodo("");
    };
    const handleDelete = (uid)=>{
        const newDb = getDatabase();
        remove(ref(newDb , `/${auth.currentUser.uid}/${uid}`));
    } 
    const handleUpdate = (todo) => {
        setIsEdit(true);
        setTodo(todo.todo);
        setTempUidd(todo.uidd);
    }
    const handleEditConfirm = () => {
        const newDb = getDatabase();
        update(ref(newDb , `/${auth.currentUser.uid}/${tempUidd}`),{
            todo: todo, 
            tempUidd: tempUidd
        })
        setTodo('');
        setIsEdit(false);
    }
  return (
    <div className='homepage'>
        <input 
            className='add-edit-input'
            type="text"
            placeholder='Add Todo...' 
            value={todo} 
            onChange = {(e)=>setTodo(e.target.value)}
        />
        {
            todos.map(todo => (
                <div className="todo">
                    {
                        done?(<del>{todo.todo}</del>):(<h1>{todo.todo}</h1>) 
                    }
                    <EditIcon className="button" onClick = {()=>handleUpdate(todo)}/>
                    <DeleteIcon className="button" onClick = {()=>handleDelete(todo.uidd)}/>
                    {/* <button onClick={()=>handleDelete(todo.uidd)}>Delete</button> */}
                </div>
            ))
        }
        {
            isEdit? 
            (<div>
                <button onClick={handleEditConfirm} className="update">Confirm</button>
            </div>
            ):
            (<div>
                <ControlPointIcon onClick={writeToDatabase} className="add-icon"/>
            </div>
            )
        }
        <LogoutIcon onClick = {handleSignOut} className="sign-out-button"/>
        {/* <button onClick={handleSignOut}>Sign Out</button> */}
    </div>
  )
}

export default Homepage