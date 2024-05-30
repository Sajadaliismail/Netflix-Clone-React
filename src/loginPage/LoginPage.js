import './App.css';
import { useNavigate } from 'react-router-dom';
function LoginPage() {
  
  return (
    <>
    <Headers />
    <Contents />
    </>
  )
}


function Contents() {

  return (
    <>
   <div className="content-container">
      <div className="content">
        <h1 style={{fontWeight:'bolder',fontSize:'3rem'}} className='fw-bolder'>Unlimited movies, TV shows and more</h1>
        <h5 style={{fontWeight:'bolder'}} className='fw-bolder'>Watch anywhere. Cancel anytime.</h5>
        <h5 style={{fontWeight:'bolder'}} className='fw-bolder'>Ready to watch? Enter your email to create or restart your membership.</h5>
        <input className='form-control' style={{width:'350px'}} placeHolder='Email' type="email" />      
      </div>
    </div>    
    </>
  );
}


function Headers(){
  const navigate = useNavigate()

  function handleRoute(){

navigate('/home')
  }
  return (
    <>
    <div className='header'>
    <img style={{width:'150px'}} src="./nf-logo.png" alt="" />
    <div>
      <select className='selectLangugae' name="" id="">
        <option className='options' value="english">English</option>
        <option  className='options' value="hindi">हिन्दी</option>
      </select>
    <button onClick={handleRoute} className='loginBtn'>Sign in</button>
    </div>
    </div>
    </>
  )
}

export default LoginPage;
