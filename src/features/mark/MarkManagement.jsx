import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { color, margin } from '@mui/system';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import studentAPI from '../../api/studentAPI';
import { useEffect } from 'react';
import clazzAPI from '../../api/clazzAPI';
import { useForm } from 'react-hook-form';
import $ from 'jquery';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import studentFamilyAPI from '../../api/studentFamilyAPI';
import { Redirect, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import subjectAPI from '../../api/subjectAPI';
import { Button, Modal } from 'react-bootstrap';
MarkManagement.propTypes = {};

function MarkManagement(props) {
  const history = useHistory();

  const { enqueueSnackbar } = useSnackbar();
  const [studentsFirst, setStudentsFirst] = useState([]);
  const [students, setStudents] = useState([]);
  const [clazz, setClazz] = useState([]);
  const [ismodel, setIsmodel] = useState(false);

  const [subject, setSubject] = useState();

  console.log('FirtsStudent', students);
  console.log('FirtsClazz', clazz);
  const [show, setShow] = useState(false); //MODAL

  const [isloadAPI, setIsloadAPI] = useState(false); //UseEffef

  const handleClose = () => setShow(false);

  //call api get ALL Student
  useEffect(() => {
    getStudents();
  }, [ismodel]);

  const getStudents = () => {
    studentAPI.getAll().then((data) => {
      setStudents(data.data);
      setStudentsFirst(data.data);
    });
  };
  //end call  ALL Student

  //Call Api All Subject
  useEffect(() => {
    getSubject();
  }, []);

  const getSubject = async () => {
    try {
      const response = await subjectAPI.getAll();
      setSubject(response.data);
    } catch (e) {
      enqueueSnackbar('loi call API Subject!', { variant: 'error' });
    }
  };

  console.log(subject);

  //end Subject

  //Call API Clazzs and handel filter Clazz
  useEffect(() => {
    getClazzs();
  }, []);

  const getClazzs = () => {
    try {
      clazzAPI.getAll().then((data) => {
        setClazz(data.data);
      });
    } catch (e) {
      console.log(e);
    }
  };

  //Begin handel filter Clazz
  const handelChangeClazz = (e) => {
    const data = e.target.value;
    console.log(data);

    if (data === 'ALL') {
      setStudents(studentsFirst);
    } else {
      const clazzFilter = studentsFirst.filter((item) => item.clazz.id == data);

      setStudents([...clazzFilter]);
    }
    console.log(students);
  };

  //End handel filter Clazz

  //Handel Search nameStudent

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

  //Handel Search nameStudent

  //Handel Add student

  const { register, handleSubmit } = useForm();

  //hanleClick Student
  const handelClickStudent = (e) => {
    console.log(e);
  };

  //handel handelChangeSemester

  const handelChangeSemester = (e) => {
    console.log(e.target.value);
  };

  const handleAddMark = (e) => {
    console.log('Mark', e);
    setShow(true);
  };

  const onSubmit = (e) => {
    console.log(e);
  };

  return (
    <>
      <div className="row container">
        <div className="col-md-3">
          <input
            className="form-control"
            type="text"
            onChange={handelChangenNameStudent}
            placeholder="Nhập từ khóa tìm kiếm"
          />
        </div>
        <div className="col-md-3">
          <select onChange={handelChangeSemester} className="custom-select " required>
            <option value="ALL">Học kỳ All--</option>
            <option value="1">Học kỳ 1</option>
            <option value="2">Học kỳ 2</option>
          </select>
        </div>

        <div className="col-md-3">
          <select onChange={handelChangeClazz} className="custom-select " required>
            <option value="ALL"> Chọn Lớp All--</option>
            {clazz.map((data) => (
              <option value={data.id}> {data.nameClazz}</option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <select onChange={handelChangeClazz} className="custom-select " required>
            <option value="ALL"> Chọn Môn All--</option>
            {subject?.map((data) => (
              <option value={data.id}> {data.subjectName}</option>
            ))}
          </select>
        </div>

        <div>
          <br />
        </div>
        <div className="col-md-5 container  ">
          {/* Begin Table */}
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">DANH SÁCH HỌC SINH {students.length}</h6>
            </div>
            <div className="table-responsive scrol-Table">
              <table className="table table-hover" id="dataTable" width="100%" cellspacing="0">
                <thead style={{ backgroundColor: '#385ece', color: 'white' }}>
                  <tr>
                    <th>STT</th>
                    <th>MÃ HS</th>
                    <th>TÊN HS</th>
                    <th>SL ĐIỂM</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((item, index) => (
                    <tr key={item.id} onClick={(e) => handelClickStudent(item.id)}>
                      <td>{index + 1}</td>
                      <td>{`HS${item.id}`}</td>
                      <td>{item.nameStudent}</td>
                      <td>0</td>
                      <td onClick={(e) => handleAddMark(item.id)}>
                        <ControlPointIcon style={{ color: 'blue' }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* End Table */}

        {/* Begin Left */}

        <div className="col-md-7 container ">
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">DANH SÁCH HỌC SINH {students.length}</h6>
            </div>
            <div className="table-responsive scrol-Table">
              <table className="table table-hover" id="dataTable" width="100%" cellspacing="0">
                <thead style={{ backgroundColor: '#385ece', color: 'white' }}>
                  <tr>
                    <th>HỦY</th>
                    <th>MÔN HỌC</th>
                    <th>ĐIỂM</th>
                    <th>LOẠI</th>
                    <th>HỆ SỐ</th>
                    <th>HỌC KÌ</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((item, index) => (
                    <tr key={item.id} onClick={(e) => handelClickStudent(item.id)}>
                      <td>{index + 1}</td>
                      <td>{`HS${item.id}`}</td>
                      <td>{item.nameStudent}</td>
                      <td>
                        <ControlPointIcon style={{ color: 'blue' }} />
                      </td>

                      <td>
                        <ControlPointIcon style={{ color: 'blue' }} />
                      </td>
                      <td>
                        <ControlPointIcon style={{ color: 'blue' }} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ghi Điểm Nguyễn Quốc Huy - Hk1</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <lable>
                  <b>Giáo Viên</b>
                </lable>
                <h6>Nguyen Quoc Huy</h6>
              </div>

              <div className="form-group">
                <label>
                  <b>Lop</b>
                </label>
                <select {...register('clazzid')} className="custom-select " required>
                  <option value="ALL"> Chọn Lớp ALL--</option>
                  {clazz?.map((data) => (
                    <option value={data.id}> {data.nameClazz}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>
                  <b>Lop</b>
                </label>
                <select {...register('roleClazz')} className="custom-select " required>
                  <option value="Quản nhiệm">Quản nhiệm</option>
                  <option value="Bộ môn">Bộ môn</option>
                </select>
              </div>

              <Button variant="danger" style={{ marginRight: '10px' }} onClick={handleClose}>
                Hủy bỏ
              </Button>
              <Button variant="primary" type="submit">
                Hoàn tất
              </Button>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default MarkManagement;
