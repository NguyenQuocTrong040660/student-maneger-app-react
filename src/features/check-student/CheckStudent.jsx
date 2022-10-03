import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './CheckStudent.css';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import studentAPI from '../../api/studentAPI';
import clazzAPI from '../../api/clazzAPI';
import StorageKey from '../../constant/storage-key';
import { useHistory, useParams } from 'react-router-dom';
import { wait } from '@testing-library/user-event/dist/utils';
import offenceAPI from '../../api/offenceAPI';
import AddIcon from '@mui/icons-material/Add';
import FormCheckOffence from '../components/CheckStudents/FormCheckOffence';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Alert, Snackbar } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import axiosClient from '../../api/axiosClient';
import DeleteIcon from '@mui/icons-material/Delete';
import checkVPAPI from '../../api/checkVPAPI';
import datesAPI from '../../api/datesAPI';
CheckStudent.propTypes = {};

function CheckStudent(props) {
  const history = useHistory();
  const [studentsFirst, setStudentsFirst] = useState([]);
  const [studentsSelect, setStudentsFirstSelect] = useState([]);
  const [students, setStudents] = useState([]);
  const [clazz, setClazz] = useState([]);

  const [offence, setOffence] = useState([]);
  const [offenceFirst, setOffenceFirst] = useState([]);

  //Model
  const [show, setShow] = useState(false);

  //End State Model

  const user = JSON.parse(localStorage.getItem(StorageKey.USER));

  console.log('studentsFirst', studentsFirst);

  //gave param id from Check VP student
  const { keyID } = useParams();

  useEffect(() => {
    getClazzIdHaveRoleCharmain();
  }, []);

  const getClazzIdHaveRoleCharmain = async () => {
    try {
      const ClazzTeacher = await clazzAPI.getClazzTeacher(keyID);
      const idClazz = ClazzTeacher.data.clazz.id;

      await clazzAPI.getClazz(idClazz).then((res) => {
        setClazz(res.data);
      });

      const data = await studentAPI.getStudentByClazz(idClazz).then((res) => {
        setStudentsFirst(res.data);
        setStudents(res.data);
      });
    } catch (error) {
      history.push('/home');
    }
  };

  //State Class

  console.log('FirtsClazz', clazz.id);

  //Call API Offence

  useEffect(() => {
    getOffences();
  }, []);

  console.log(offence);
  const getOffences = async () => {
    try {
      await offenceAPI.getAll().then((data) => {
        setOffence(data.data);
        setOffenceFirst(data.data);
      });
    } catch (error) {
      history.push('/home');
    }
  };

  //Handel Student

  const handelChangenNameStudent = (e) => {
    let name = e.target.value;
    let values = new RegExp(`${name.toString().toLowerCase()}`);
    console.log(values);

    let resultfilter = [];

    studentsFirst.map((item) => {
      if (
        values.test(item.nameStudent.toString().toLowerCase()) ||
        values.test(item.address.toString().toLowerCase()) ||
        values.test(item.phone.toString().toLowerCase())
      ) {
        resultfilter.push(item);
      } else {
        setStudents(studentsFirst);
      }
    });
    setStudents(resultfilter);
  };

  //handelChangenNameOffence
  const handelChangenNameOffence = (e) => {
    let nameOffence = e.target.value;

    let values = new RegExp(`${nameOffence.toString().toLowerCase()}`);

    let resultfilterOffence = [];

    offenceFirst.map((item) => {
      if (values.test(item.offenceName.toString().toLowerCase())) {
        resultfilterOffence.push(item);
      } else {
        setOffence(offenceFirst);
      }
    });
    setOffence(resultfilterOffence);
  };

  //handel filter Ofence Status
  const [checkStudent, setCheckStudent] = useState({}); //luu value khi click vao table 1
  const [checkOffence, setCheckOffence] = useState({}); //luu value khi click vao table 1
  const [dates, setDAtes] = useState();

  console.log('checkOffence', checkOffence);

  useEffect(() => {
    handelClickStudent();
  }, []);

  //Get Now day
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + '/' + mm + '/' + dd;

  //Call API to get Entity Dates
  useEffect(() => {
    datesAPI.getDatesByNowDay(today).then((rs) => {
      setDAtes(rs.data);
    });
  }, []);

  //END Call API to get Entity Dates

  const handelClickStudent = (e) => {
    setCheckStudent(e);
  };
  console.log(checkStudent);

  // Beginhandel When Click buuton positive negative ALL
  const handelStatusOffence = (e) => {
    const values = e.target.value;
    if (values > 0) {
      const dataFiltertrue = offenceFirst.filter((item) => item.status === true);
      setOffence([...dataFiltertrue]);
    } else if (values < 0) {
      const dataFilterfalse = offenceFirst.filter((item) => item.status === false);
      setOffence([...dataFilterfalse]);
    } else {
      setOffence(offenceFirst);
    }
  };

  // End handel When Click buuton positive negative ALL

  //MessAge

  const { enqueueSnackbar } = useSnackbar();
  //MessAge

  //Modal
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    console.log('value ID cua Offend ', e);
    setCheckOffence(e);
    if (checkStudent !== undefined) {
      setShow(true);
    }
    if (checkStudent === undefined) {
      enqueueSnackbar('Click chọn học sinh để đánh giá!!', { variant: 'error' });
      setShow(false);
    }
  };

  //state save result response from call(postdata) check vp
  const [rsCheckvp, setRsCheckvp] = useState([]);
  console.log('rsCheckvp', rsCheckvp);
  //End state save result response from call(postdata) check vp

  //Begin handel when Click to Post data (Submit form modal)
  const handlePostCheckVP = async () => {
    try {
      const dataCheckVP = {
        offenceId: checkOffence.id, //rs call api
        offenceMark: checkOffence.markOffence,
        dateId: dates.id,
        student: checkStudent, //du lieu khi click vao student
        status: 'true',
      };
      console.log(dataCheckVP);

      const res = await checkVPAPI.add(dataCheckVP);
      if (res.status === 200) {
        console.log('result Check', res.data);
        setRsCheckvp([...rsCheckvp, res.data]);
        setShow(false);
        enqueueSnackbar('Đánh giá thành cônng!', { variant: 'success' });
      }
    } catch (e) {
      enqueueSnackbar('Đánh giá thất bại!', { variant: 'error' });
      setShow(false);
    }
  };

  //End

  //Begin Xóa CheckVP
  const handleDeleteCheckVP = async (values) => {
    try {
      const rs = await checkVPAPI.deleteById(values);
      const dataFilter = rsCheckvp.filter((item) => item.id !== values); //loai bo ptu vua xoa trong State
      console.log('dataFilterRsCheckVP DELETE', dataFilter);
      setRsCheckvp(dataFilter);
      enqueueSnackbar('Xóa thành cônng!', { variant: 'success' });
    } catch (e) {
      enqueueSnackbar('Xóa không thành công!', { variant: 'error' });
    }
  };

  //End Xóa CheckVP

  //Modal

  return (
    <>
      <div className="row container">
        <div className="col-md-3">
          <select className="custom-select" required>
            <option value={clazz.id}>
              {clazz.nameClazz}-{user.name}
            </option>
          </select>
        </div>

        <div className="col-md-3">
          <input className="form-control" onChange={handelChangenNameStudent} type="text" placeholder="Tìm học sinh" />
        </div>

        <div className="col-md-3">
          <input className="form-control " onChange={handelChangenNameOffence} type="text" placeholder="Tìm nội dung" />
        </div>

        <div className="col-md-3">
          <button
            type="button"
            id="btn"
            onClick={(e) => handelStatusOffence(e)}
            className="btn col-md-3 active colorWhite"
            value="0"
            data-bs-toggle="button"
          >
            Tất cả
          </button>
          <button
            type="button"
            value="1"
            onClick={(e) => handelStatusOffence(e)}
            className="btn col-md-5 active colorWhite"
            data-bs-toggle="button"
          >
            Điểm cộng
          </button>
          <button
            type="button"
            value="-1"
            onClick={(e) => handelStatusOffence(e)}
            className="btn col-md-4 active colorWhite"
            data-bs-toggle="button"
          >
            Điểm trừ
          </button>
        </div>
      </div>
      <br></br>
      {/*Table 1 */}
      <div className="row container">
        <div className="col-md-3 container  ">
          {/* main table */}
          <div className="card shadow mb-4">
            <div className="card-header py-3 titleTable">
              <h6 className="m-0 font-weight-bold ">DANH SÁCH HỌC SINH {students.length}</h6>
            </div>
            <div className="table-responsive scrol-Table">
              <table className="table table-hover" id="dataTable" width="100%" cellspacing="0">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>TÊN HS</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((item, index) => (
                    <tr key={item.id} onClick={(e) => handelClickStudent(item)}>
                      <td>{index + 1}</td>
                      <td>{item.nameStudent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/*  Table 2*/}
        <div className="col-md-5 container  ">
          {/* Begin Table */}
          <div className="card shadow mb-4">
            <div className="card-header py-3 titleTable">
              <h6 className="m-0 font-weight-bold">
                ĐÁNH GIÁ <span>{checkStudent?.nameStudent ? checkStudent.nameStudent : ''}</span>
              </h6>
            </div>
            <div className="table-responsive scrol-Table">
              <table className="table table-hover" id="dataTable" width="100%" cellspacing="0">
                <thead>
                  <tr>
                    <th>HỦY</th>
                    <th>TÊN HS</th>
                    <th>NỘI DUNG</th>
                  </tr>
                </thead>
                <tbody>
                  {rsCheckvp.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>
                          <span
                            className="btn btn-outline-danger"
                            onClick={(e) => {
                              handleDeleteCheckVP(item.id);
                            }}
                          >
                            <DeleteIcon style={{ color: 'red' }} />
                          </span>
                        </td>
                        <td>{item.student.nameStudent}</td>
                        <td>
                          {offence.map((items) => {
                            if (item.offenceId === items.id) {
                              return items.offenceName;
                            }
                          })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/*  Table 3*/}
        <div className="col-md-4 container  ">
          <div class="card shadow mb-4">
            <div class="card-header py-3 titleTable">
              <h6 class="m-0 font-weight-bold ">NỘI DUNG {offence.length}</h6>
            </div>
            <div className="table-responsive scrol-Table">
              <table className="table table-hover cursor-pointer" id="dataTable" width="100%" cellspacing="0">
                <thead>
                  <tr>
                    <th> </th>
                    <th>Nội Dung</th>
                    <th>Điểm</th>
                  </tr>
                </thead>
                <tbody>
                  {offence.map((item, index) => (
                    <tr key={item.id} onClick={(e) => handleShow(item)}>
                      <td>
                        <span className={item.status ? 'positiveMark' : 'nagativeMark'}>
                          <AddIcon />
                        </span>
                      </td>
                      <td>{item.offenceName}</td>
                      <td style={{ textAlign: 'center' }} className={item.status ? 'positiveMark' : 'nagativeMark'}>
                        {item.markOffence}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              ĐÁNH GIÁ <span style={{ color: 'red' }}>{checkStudent?.nameStudent ? checkStudent.nameStudent : ''}</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Nội dung xử lí </h6>
            <div>
              <span className={checkOffence.status ? 'positiveMark' : 'nagativeMark'}>
                <AddIcon />
              </span>
              {checkOffence.offenceName}
            </div>

            <h6>Điểm</h6>
            <span
              style={{ color: 'white' }}
              className={checkOffence.status ? 'positiveMark btn-primary btn-sm' : 'btn-sm nagativeMark btn-danger'}
            >
              {checkOffence.markOffence}
            </span>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Hủy bỏ
            </Button>
            <Button variant="primary" onClick={handlePostCheckVP}>
              Hoàn tất
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default CheckStudent;
