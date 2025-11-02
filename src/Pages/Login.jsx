import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
  const { signInUser, signWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInUser(email, password)
      .then((res) => {
        console.log(res.user);
        {
          location.state ? navigate(location.state) : navigate("/");
        }
      })
      .catch((err) => console.log(err.code));
  };

  const handleGoogleLogIn = () => {
    signWithGoogle()
      .then((res) => {
        {
          location.state ? navigate(location.state) : navigate("/");
        }
        console.log(res.user);
      })
      .catch((err) => console.log(err.code));
  };
  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl my-3 mx-auto">
      <div className="card-body">
        <div className="text-center">
          <h1 className="font-bold text-2xl">Log In</h1>
          <p>
            Don't have an Account?{" "}
            <Link className="text-gradient-primary" to={"/register"}>
              Register Now
            </Link>
          </p>
        </div>
        <form onSubmit={handleLogIn}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              className="input"
              placeholder="Email"
              name="email"
            />
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              name="password"
            />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-primary mt-4">Login</button>
          </fieldset>
        </form>
        <p className="text-center font-semibold text-xl">or </p>

        {/* Google */}
        <button
          onClick={handleGoogleLogIn}
          className="btn bg-white text-black border-[#e5e5e5]"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
