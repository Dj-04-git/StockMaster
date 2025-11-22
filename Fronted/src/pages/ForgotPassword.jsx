import React from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  return (
    <div className="hero min-h-screen bg-gradient-to-r from-emerald-500 to-emerald-700">
      <div className="hero-content flex-col mx-auto">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-white">Forgot Password?</h1>
          <p className="py-6 text-white">
            No worries! Enter your email address below and we'll send you a link to reset your password.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="email" className="input input-bordered" required />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Reset Password</button>
            </div>
            <div className="form-control mt-4">
              <p className="text-sm text-center">
                Remember your password? <Link to="/login" className="link link-hover text-blue-500">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
