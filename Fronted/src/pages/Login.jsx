import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="hero min-h-screen bg-gradient-to-r from-emerald-500 to-emerald-700">
      <div className="hero-content flex-col lg:flex-row-reverse mx-auto">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Welcome back! Log in to access your StockMaster dashboard and manage your inventory.
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" placeholder="password" className="input input-bordered" required />
              <label className="label">
                <Link to="/forgot-password" className="label-text-alt link link-hover">Forgot password?</Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <div className="form-control mt-4">
              <p className="text-sm text-center">
                Don't have an account? <Link to="/register" className="link link-hover text-blue-500">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
