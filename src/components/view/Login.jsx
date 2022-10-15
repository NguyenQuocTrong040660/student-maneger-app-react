import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from './userSlice';
import LinearProgress from '@mui/material/LinearProgress';
import { unwrapResult } from '@reduxjs/toolkit';
function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //trả về một tham chiếu tới dispatch function trong redux store(Uerslice==App/store).

  const dispatch = useDispatch();

  const handelSubmit = async (values) => {
    try {
      const data = { email, password };

      //nhan payload tu userSlice reudx
      const action = login(data);
      console.log('action', action);
      const resultAction = await dispatch(action);
      const user = unwrapResult(resultAction);

      console.log('user', user);
      history.push('/home');
    } catch (error) {
      history.push('/login');
    }
  };

  return (
    <div className="container">
      {/* Outer Row */}
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* Nested Row within Card Body */}
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image">
                  <img src="/img/image-login-register.jpg" alt="img" width="468px" height="453.98px" />
                </div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">CMS Student Management</h1>
                    </div>

                    <div className="form-group">
                      <input
                        type="text"
                        name="email"
                        className="form-control form-control-user"
                        id="exampleInputEmail"
                        aria-describedby="emailHelp"
                        placeholder="Enter email..."
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        name="password"
                        className="form-control form-control-user"
                        id="exampleInputPassword"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <button onClick={(e) => handelSubmit(e)} className="btn btn-primary btn-user btn-block">
                      Login
                    </button>
                    <hr />

                    <div className="text-center">
                      <a
                        href="/oauth2/authorization/google"
                        className="btn btn-google btn-user btn-block"
                        style={{ borderRadius: 45 }}
                      >
                        <i className="fab fa-google fa-fw" /> Login with Google
                      </a>
                      <hr />
                      <a className="small" href="/register">
                        Create an Account!
                      </a>
                    </div>
                    <div className="text-center" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
