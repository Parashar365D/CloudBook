import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup(props) {

  useEffect(() => {
    props.setProgress(100); // Use setProgress here
  }, []);

  const [signup, setSignup] = useState({ name: "", email: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.setProgress(0);
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: signup.name, email: signup.email, password: signup.password })
    });
    const json = await response.json();
    if (json.success) {
      props.setProgress(30)
      localStorage.setItem("token", json.authtoken);
      props.setProgress(70);
      props.showAlert("Account Created Successfully", "success");
      props.setProgress(100);
      navigate("/login");
    }
    else {
      props.showAlert("Invalide Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  return (
    <div className='container text-center my-3' style={{ width: "340px", padding: "1rem", backgroundColor: "white", borderRadius: "2rem", overflow: "hidden", boxShadow: "3px 3px 3px rgba(0, 0, 0, 0.3)" }}>
      <h2>SignUp</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} minLength={3} placeholder="Name" required />
          <label htmlFor="name">Full Name</label>
        </div>
        <div className="form-floating">
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} placeholder="email" required />
          <label htmlFor="email">email</label>
        </div>
        <div className="form-floating my-3">
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={8} placeholder="Password" required />
          <label htmlFor="password">password</label>
        </div>
        <button className='btn btn-primary' style={{ width: "50%" }}>SIGN UP</button>
        <p className='my-1'>Already have an account? <Link className='signup' to="/login">Login</Link></p>
        <div className="hr-sect my-3">OR</div>
        <Link className='btn border border-secondary' target='blank' to="https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Faccounts.google.com%2F&followup=https%3A%2F%2Faccounts.google.com%2F&ifkv=AaSxoQzP-SOBucPyhgvIojNqlsLpPFvoVOiOlxGN7yy71ueI2PIDO4BKTIF-fYfL_cheKNWif-UtYw&passive=1209600&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S1694893149%3A1714286223837778&theme=mn&ddm=0" style={{ width: "219px" }}><i className="fa-brands fa-google mx-3"></i>Login with Google</Link>
        <Link className='btn btn-primary my-2' to="https://facebook.com" target='blank'><i className="fa-brands fa-facebook mx-3"></i>Login with Facebook</Link>
      </form>
    </div>
  );
}
