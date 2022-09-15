import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Students.css';
import { color, margin } from '@mui/system';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import studentAPI from '../../api/studentAPI';
import { useEffect } from 'react';
import clazzAPI from '../../api/clazzAPI';
import { useForm } from 'react-hook-form';
import { Input, Select } from './components/Input/Inputs';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
Students.propTypes = {};

function Students(props) {
  const [studentsFirst, setStudentsFirst] = useState([]);
  const [students, setStudents] = useState([]);
  const [clazz, setClazz] = useState([]);
  console.log(students);
  console.log(clazz);

  //call api get ALL Student
  useEffect(() => {
    getStudents();
  }, []);

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
    let data = e.target.value;
    console.log(data);
    if (data == 'ALL') {
      setStudents(studentsFirst);
    } else {
      let clazzFilter = studentsFirst.filter((filter) => filter.id == data);
      setStudents([...clazzFilter]);
    }
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

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
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
                placeholder="Nhập từ khóa tìm kiếm"
              />
            </div>
            <div className="col-md-3">
              <select onChange={handelChangeClazz} className="custom-select " required>
                <option value="ALL"> Chọn Lớp ALL--</option>
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
              <h6 class="m-0 font-weight-bold text-primary">DANH SÁCH HỌC SINH {students.length}</h6>
            </div>
            <div className="table-responsive scrol-Table">
              <table className="table table-hover" id="dataTable" width="100%" cellspacing="0">
                <thead style={{ backgroundColor: '#385ece', color: 'white' }}>
                  <tr>
                    <th>STT</th>
                    <th>MÃ HS</th>
                    <th>TÊN HS</th>
                    <th>ĐỊA CHỈ</th>
                    <th>GIỚI TÍNH</th>
                    <th>SĐT</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{`HS${item.id}`}</td>
                      <td>{item.nameStudent}</td>
                      <td>{item.address}</td>
                      <td>{item.gender ? 'Nam' : 'Nữ'}</td>
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
          <div className="title-it-select">Nguyễn Quốc Trọng</div>
          <div>
            <button
              type="button"
              className="btn btn-danger addStudentBtn"
              data-toggle="modal"
              data-target="#exampleModalCenter"
            >
              <ControlPointIcon />
            </button>
            {/* Modal */}
            <div
              className="modal fade"
              id="exampleModalCenter"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="exampleModalCenterTitle"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">
                      THÊM HỌC SINH
                    </h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <div class="container-fluid">
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                          type="text"
                          label="Tên học sinh"
                          name="nameStudent"
                          register={register}
                          pattern="[A-Za-z]"
                        />

                        <Input type="date" label="Ngày sinh" name="birthDate" register={register} />

                        <Select label="Giới tính" {...register('gender')} />

                        <Input type="email" label="Email liên hệ" name="email" register={register} />

                        <Input type="text" label="phone" name="phone" register={register} />

                        <Input type="text" label="Địa chỉ" name="address" register={register} />

                        <Input type="text" label="Họ tên cha" name="fatherName" register={register} />

                        <Input type="text" label="Họ tên mẹ" name="motherName" register={register} />

                        <Input type="email" label="Email gia đình" name="email" register={register} />

                        <Input type="text" label="Phone gia đình" name="phone" register={register} />

                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">
                            Hủy
                          </button>
                          <input type="submit" className="btn btn-primary" />

                          <input type="reset" className="btn btn-danger" />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Students;
