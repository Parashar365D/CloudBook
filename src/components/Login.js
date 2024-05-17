import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login(props) {

  const [login, setLogin] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  useEffect(() => {
    props.setProgress(100);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.setProgress(0);
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: login.email, password: login.password })
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      props.setProgress(50);
      props.showAlert("Logged in Successfully", "success");
      props.setProgress(100);
      navigate("/");
    }
    else {
      props.showAlert("Please try to login with correct credentials", "danger");
    }
  };

  const onChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  return (
    <>
    <div className='container text-center my-3 ' style={{ width: "340px", padding: "1rem", backgroundColor: "white", borderRadius: "2rem", overflow: "hidden", boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.3)" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input type="email" className="form-control" value={login.email} name="email" onChange={onChange} id="floatingInput" placeholder="name@example.com" required />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" value={login.password} name="password" onChange={onChange} id="floatingPassword" placeholder="Password" required />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <p><Link className="link-opacity-7-hover signup" to="/signup">Forgot password?</Link></p>
        <button className='btn btn-primary' style={{ width: "50%" }}>LOGIN</button>
        <p className='my-2'>Don't have an account? <Link className='signup' to="/signup">Signup</Link></p>
        <div className="hr-sect my-3">OR</div>
        <Link className='btn border border-secondary' target='blank' to="https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Faccounts.google.com%2F&followup=https%3A%2F%2Faccounts.google.com%2F&ifkv=AaSxoQzP-SOBucPyhgvIojNqlsLpPFvoVOiOlxGN7yy71ueI2PIDO4BKTIF-fYfL_cheKNWif-UtYw&passive=1209600&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S1694893149%3A1714286223837778&theme=mn&ddm=0" style={{ width: "219px" }}><i className="fa-brands fa-google mx-3"></i>Login with Google</Link>
        <Link className='btn btn-primary my-2' to="https://facebook.com" target='blank'><i className="fa-brands fa-facebook mx-3"></i>Login with Facebook</Link>
      </form>
    </div>
    </>
  );
}
