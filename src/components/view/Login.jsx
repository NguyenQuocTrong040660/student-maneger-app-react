import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { login } from './userSlice';
import LinearProgress from '@mui/material/LinearProgress';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';

Login.propTypes = {};

function Login(props) {
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
        <div className="col-md-6">
          <div className="card o-hidden border-0 shadow-lg my-5">
            {/* Nested Row within Card Body */}

            <div className="p-5">
              <div className="text-center">
                <h1 className="h4 text-gray-900 mb-4">QUẢN LÝ HỌC SINH</h1>
              </div>
              <div className="text-center">
                <img src="http://14.238.90.66:8080/qlhs/logo_tbd.png" alt="#" width="100px" height="100px" />
              </div>
              <br />
              <div className="form-group">
                <input
                  type="text"
                  name="email"
                  className="form-control form-control-user"
                  id="exampleInputEmail"
                  aria-describedby="emailHelp"
                  placeholder="Tên đăng nhập"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  className="form-control form-control-user"
                  id="exampleInputPassword"
                  placeholder="mật khẩu"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button onClick={(e) => handelSubmit(e)} className="btn btn-primary btn-user btn-block">
                Đăng nhập
              </button>
              <hr />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
