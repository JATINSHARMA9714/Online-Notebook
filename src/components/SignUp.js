import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function SignUp(props) {
  const {showAlert}=props
  const host = "http://localhost:8000"
  const navigate=useNavigate();
  const [credentials, setCredentials] = useState({ name:"",email:"",password:""})
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const response = await fetch(`${host}/api/user/create`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
  });
  const json=await response.json();
  // console.log(json);
  if(json.success){
      localStorage.setItem('token',json.message)
      // console.log(json.message);
      navigate('/')
      showAlert("SignUp Success","success")
  }
  else{
      showAlert("Invalid Credentials","danger")
  }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <h2 className='text-light'>SignUp</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label text-light">Name</label>
          <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label text-light">Email Address</label>
          <input type="email" className="form-control" id="email" name='email' onChange={onChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label text-light">Password</label>
          <input type="password" className="form-control" id="password" name='password' onChange={onChange}/>
        </div>
        <button type="submit" className="btn btn-light">Submit</button>
      </form>
    </div>
  )
}
