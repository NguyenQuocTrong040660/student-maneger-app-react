import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Students.css';
import { color, margin } from '@mui/system';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import studentAPI from '../../../api/studentAPI';
import { useEffect } from 'react';
import clazzAPI from '../../../api/clazzAPI';
import { useForm } from 'react-hook-form';
import $ from 'jquery';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import studentFamilyAPI from '../../../api/studentFamilyAPI';
import { Redirect, useHistory } from 'react-router-dom';
import { Input, Select } from '../../../components/students/components/Input/Inputs';
import { useSnackbar } from 'notistack';
import { Modal } from 'react-bootstrap';
StudentManagement.propTypes = {};

function StudentManagement(props) {
  const history = useHistory();

  const { enqueueSnackbar } = useSnackbar();
  const [show, setShow] = useState(false); //MODAL
  const [showUpdate, setShowUpdate] = useState(false); //MODAL

  const [studentsFirst, setStudentsFirst] = useState([]);
  const [students, setStudents] = useState([]);
  const [clazz, setClazz] = useState([]);

  const [errors, setErrors] = useState(false);
  console.log('FirtsStudent', students);
  console.log('FirtsClazz', clazz);

  //call api get ALL Student
  useEffect(() => {
    getStudents();
  }, [show]);

  const getStudents = () => {
    studentAPI.getAll().then((data) => {
      setStudents(data.data);
      setStudentsFirst(data.data);
    });
  };

  //end call  ALL Student

  //Call API Clazzs and handel filter Clazz
  useEffect(() => {
    getClazzs();
  }, []);

  const getClazzs = () => {
    clazzAPI.getAll().then((data) => {
      setClazz(data.data);
    });
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

  const handleClose = () => setShow(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleClickAdd = () => {
    setShow(true);
  };

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

  //handelClickStudent xu li thong tin student
  const [nameStudentClickTable, setNameStudentClickTable] = useState('');
  const handelClickStudent = (e) => {
    let datastudentTable = studentsFirst.filter((item) => item.id == e);

    const convertdatastudentTable = Object.assign({}, ...datastudentTable);
    setNameStudentClickTable(convertdatastudentTable.nameStudent);
  };

  //Handel Add student

  const { register, handleSubmit } = useForm();

  const onSubmit = async (e) => {
    try {
      const lassdata = clazz.filter((item) => item.id == e.clazzid);

      const objectClazz = Object.assign({}, ...lassdata);

      const dataStudentFamily = {
        fatherName: e.fatherName,
        motherName: e.motherName,
        email1: e.email1,
        phone1: e.phone1,
      };

      const data = await studentFamilyAPI.add(dataStudentFamily);
      const familySubmit = data.data;
      const dataStudent = {
        nameStudent: e.nameStudent,
        birthDate: e.birthDate,
        gender: e.gender,
        address: e.address,
        email: e.email,
        phone: e.phone,
        status: 'true',
        studentFamily: familySubmit,
        clazz: objectClazz,
      };

      const responseDataStudent = await studentAPI.add(dataStudent);
      setShow(false);
      enqueueSnackbar('X??? l?? th??nh c??ng', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Email ph???i duy nh???t', { variant: 'error' });
    }
  };

  return (
    <>
      <div className="row container">
        <div className="col-md-9 container  ">
          <div className="form-row d-flex align-items-center">
            <div className="col">
              <input
                className="form-control col-md-5"
                type="text"
                onChange={handelChangenNameStudent}
                placeholder="Nh???p t??? kh??a t??m ki???m"
              />
            </div>
            <div className="col-md-3">
              <select onChange={handelChangeClazz} className="custom-select " required>
                <option value="ALL"> Ch???n L???p ALL--</option>
                {clazz.map((data) => (
                  <option value={data.id}> {data.nameClazz}</option>
                ))}
              </select>
            </div>
          </div>
          <br></br>

          {/* Begin Table */}
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">DANH S??CH H???C SINH {students.length}</h6>
            </div>
            <div className="table-responsive scrol-Table">
              <table className="table table-hover" id="dataTable" width="100%" cellspacing="0">
                <thead style={{ backgroundColor: '#385ece', color: 'white' }}>
                  <tr>
                    <th>STT</th>
                    <th>M?? HS</th>
                    <th>T??N HS</th>
                    <th>?????A CH???</th>
                    <th>GI???I T??NH</th>
                    <th>S??T</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((item, index) => (
                    <tr key={item.id} onClick={(e) => handelClickStudent(item.id)}>
                      <td>{index + 1}</td>
                      <td>{`HS${item.id}`}</td>
                      <td>{item.nameStudent}</td>
                      <td>{item.address}</td>
                      <td>{item.gender ? 'Nam' : 'N???'}</td>
                      <td>{item.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* End Table */}

        {/* Begin Left */}
        <div className="col-md-3 container ">
          <div className="title-it-select">{nameStudentClickTable}</div>
          <div>
            <button type="button" className="btn btn-danger addStudentBtn" onClick={handleClickAdd}>
              <ControlPointIcon />
            </button>
            {/* Modal */}

            <Modal size="lg" show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Th??m M???i</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="modal-body">
                  <div class="container-fluid">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Input
                        type="text"
                        label="T??n h???c sinh"
                        name="nameStudent"
                        register={register}
                        required
                        pattern="[A-Za-z]"
                      />

                      <Input type="date" label="Ng??y sinh" name="birthDate" required register={register} />

                      <Select label="Gi???i t??nh" {...register('gender')} />

                      <Input type="email" label="Email li??n h???" name="email" register={register} required />

                      <Input type="text" label="phone" name="phone" register={register} required />

                      <Input type="text" label="?????a ch???" name="address" register={register} required />

                      <Input type="text" label="H??? t??n cha" name="fatherName" register={register} required />

                      <Input type="text" label="H??? t??n m???" name="motherName" register={register} required />

                      <Input type="email" label="Email gia ????nh" name="email1" register={register} required />
                      <p id="demo" style={{ color: 'red' }}></p>

                      <Input type="text" label="Phone gia ????nh" name="phone1" register={register} required />

                      <div className="form-group">
                        <label>
                          <b>Lop</b>
                        </label>
                        <select {...register('clazzid')} className="custom-select " required>
                          <option value="ALL"> Ch???n L???p ALL--</option>
                          {clazz.map((data) => (
                            <option value={data.id}> {data.nameClazz}</option>
                          ))}
                        </select>
                      </div>

                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">
                          H???y
                        </button>
                        <button type="submit" data-target="#myModal" className="btn btn-primary">
                          Submit
                        </button>

                        <input type="reset" className="btn btn-danger" />
                      </div>
                    </form>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer></Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default StudentManagement;
