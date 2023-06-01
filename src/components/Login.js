import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Login = (props) => {
    const{showAlert}=props;
    const host = "http://localhost:8000"
    const [credentials, setCredentials] = useState({ email:"",password:""})
    let navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response = await fetch(`${host}/api/user/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json=await response.json();
        if(json.success){
            localStorage.setItem('token',json.authToken)
            // console.log(json.authToken);
            showAlert("Login Successfull","success")
            navigate('/')
        }
        else{
            showAlert("Invalid Credentials","danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    
      }
    return (
        <div className='container text-light'>
            <h2>LOGIN</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 text-light">
                    <label htmlFor="email" className="form-label text-light">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password"  className="form-label text-light">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onChange} minLength={3}/>
                </div>
                <button type="submit" className="btn btn-light">Submit</button>
            </form>
        </div>
    )
}

export default Login