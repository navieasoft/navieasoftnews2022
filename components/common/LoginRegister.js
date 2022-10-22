import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import useStore from "../context/useStore";
import {
  facebookLogin,
  googleLogin,
  handleLogin,
  handleRegister,
  passwordResetEmail,
} from "../../services/client/loginRegister";

const LoginRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState(true);
  const [error, setError] = useState("");
  const store = useStore();
  const [payload, setPayload] = useState(() => {
    return {
      name: "",
      email: "",
      password: "",
      rePassword: "",
    };
  });

  function handleChange(e) {
    const name = e.target.name;
    setPayload((prev) => {
      return { ...prev, [name]: e.target.value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (login) {
      handleLogin(payload.email, payload.password, store, setError);
    } else {
      if (payload.password !== payload.rePassword) {
        setError("Please check your password carefully");
      } else if (payload.password < 6) {
        setError("Password should be at least 6 charecters");
      } else {
        handleRegister(
          payload.email,
          payload.password,
          payload.name,
          store,
          setError
        );
      }
    }
  }

  return (
    <div
      onClick={() => store?.setShowLoginRegister(false)}
      className='login-register-container'
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => handleSubmit(e)}
        className='login-form'
      >
        <h3 className='mb-5'>Please {login ? "Login" : "Register"}</h3>

        {!login && (
          <input
            required
            name='name'
            type='text'
            onChange={(e) => handleChange(e)}
            placeholder='Enter your full name'
          />
        )}
        <input
          required
          name='email'
          type='email'
          onChange={(e) => handleChange(e)}
          placeholder='Enter your email'
        />
        <div className='relative w-full'>
          <input
            name='password'
            required
            onChange={(e) => handleChange(e)}
            type={showPassword ? "text" : "password"}
            placeholder={`Enter ${login ? "your" : "a"} password`}
          />
          <div
            onClick={() => setShowPassword((prev) => !prev)}
            className='absolute top-2/4 right-5 -translate-y-2/4 cursor-pointer'
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </div>
        </div>

        {!login && (
          <input
            name='rePassword'
            required
            onChange={(e) => handleChange(e)}
            type='password'
            placeholder='Confirm password'
          />
        )}

        {/* showing error */}
        <p className='text-red-400'>
          {error.replace("Firebase: Error (auth/", "").replace(")", "")}
        </p>

        {/* showing forget password */}
        {error.includes("wrong-password") && (
          <p
            onClick={() => passwordResetEmail(payload.email, store, setError)}
            className='cursor-pointer text-purple-500 text-left w-full'
          >
            Forgot password?
          </p>
        )}

        <button className='btn' type='submit'>
          {login ? "Login" : "Register"}
        </button>

        <p>----------Or---------</p>

        <div className='flex gap-5'>
          <button
            onClick={() => googleLogin(setError, store)}
            type='button'
            className='btn space-x-2'
          >
            <FontAwesomeIcon icon={faGoogle} />
            <span>Google</span>
          </button>
          <button
            onClick={() => facebookLogin(setError, store)}
            type='button'
            className='btn space-x-2'
          >
            <FontAwesomeIcon icon={faFacebook} />
            <span>Facebook</span>
          </button>
        </div>

        <p>
          {login ? "New here?" : "Already have account"}{" "}
          <span
            onClick={() => setLogin((prev) => !prev)}
            className='underline text-blue-400 cursor-pointer'
          >
            {login ? "Create an account" : "Login here"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginRegister;
