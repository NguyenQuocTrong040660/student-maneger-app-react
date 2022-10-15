import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Input, Select } from '../../../components/students/components/Input/Inputs';
import { useForm } from 'react-hook-form';
import teacherAPI from '../../../api/teacherAPI';
import { useSnackbar } from 'notistack';
import moment from 'moment/moment';

import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
Teacher.propTypes = {};

function Teacher(props) {
  const { enqueueSnackbar } = useSnackbar();

  const [teachers, setTeachers] = useState(); //MODAL
  const [teachersUpdate, setTeachersUpdate] = useState(); //MODAL
  const [show, setShow] = useState(false); //MODAL
  const [showUpdate, setShowUpdate] = useState(false); //MODAL

  const [isloadAPI, setIsloadAPI] = useState(false); //UseEffef

  const { register, handleSubmit } = useForm();
  const handleClose = () => setShow(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleClickAdd = () => {
    setShow(true);
  };

  //Call api
  useEffect(() => {
    getAllTeacher();
  }, [show, showUpdate, isloadAPI]);

  const getAllTeacher = async (e) => {
    try {
      const rs = await teacherAPI.getALL();
      setTeachers(rs.data);
    } catch (error) {
      enqueueSnackbar('Get All Teacher Thất bại!', { variant: 'error' });
    }
  };

  //submit teacher
  const onSubmit = async (e) => {
    try {
      const data = {
        teacherName: e.teacherName,
        birthDate: e.birthDate,
        gender: e.gender,
        address: e.address,
        email: e.email,
        password: e.password,
        phone: e.phone,
        status: true,
        role: ['ROLE_USER'],
      };

      const rs = await teacherAPI.add(data);
      setShow(false);
      enqueueSnackbar('Thêm thành công', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Thất bại!', { variant: 'error' });
    }
  };

  //handle Edit
  const handleEdit = (e) => {
    console.log(e);
    setTeachersUpdate(e);
    if (teachersUpdate !== undefined) {
      setShowUpdate(true);
    }
  };

  const onSubmitUpdate = async (e) => {
    console.log(teachersUpdate);
    try {
      const rs = await teacherAPI.update(teachersUpdate.id, teachersUpdate);
      setShowUpdate(false);
      enqueueSnackbar('Xử lý thành công', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Thất bại!', { variant: 'error' });
    }
  };

  const handleDelete = async (e) => {
    console.log(e);
    try {
      const rs = await teacherAPI.deleteTeacher(e.id, e);
      enqueueSnackbar('Xử lý thành công', { variant: 'success' });
      setIsloadAPI(!isloadAPI);
    } catch (error) {
      enqueueSnackbar('Thất bại!', { variant: 'error' });
    }
  };

  return (
    <>
      <div className="row container">
        <div className="col-md-12 container  ">
          <div className="form-row d-flex align-items-center">
            <div className="col">
              <input className="form-control col-md-5" type="text" placeholder="Nhập từ khóa tìm kiếm" />
            </div>
            <div className="col">
              <button className="btn btn-outline-warning" onClick={handleClickAdd}>
                Thêm Mới
              </button>
            </div>
          </div>
          <br></br>

          {/* Begin Table */}
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <span>
                <h6 className="m-0 font-weight-bold text-primary">DANH SÁCH GIÁO VIÊN </h6>
              </span>
            </div>
            <div className="table-responsive scrol-Table">
              <table className="table table-hover" id="dataTable" width="100%" cellspacing="0">
                <thead style={{ backgroundColor: '#385ece', color: 'white' }}>
                  <tr>
                    <th>STT</th>
                    <th>HỌ TÊN </th>
                    <th>NGÀY SINH</th>
                    <th>GIỚI TÍNH</th>
                    <th>ĐỊA CHỈ</th>
                    <th>EMAIL</th>
                    <th>SĐT</th>

                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {teachers?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.teacherName}</td>
                      <td> {moment(item.birthDate).format('DD/MM/yyyy')}</td>
                      <td>{item.gender ? 'Nam' : 'Nữ'}</td>
                      <td>{item.address}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>

                      <td>
                        <span onClick={(e) => handleEdit(item)}>
                          <SettingsIcon style={{ color: '#FF9900' }} />
                        </span>
                      </td>
                      <td>
                        <span>
                          <DeleteIcon
                            onClick={(e) => {
                              if (window.confirm(`Xóa giáo viên ${item?.teacherName}?`)) {
                                handleDelete(item);
                              }
                            }}
                            style={{ color: 'red' }}
                          />
                        </span>
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
        <div className="col-md-3 container "></div>
      </div>
      <Modal size="md" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm Mới</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-row">
                <div className="col">
                  <Input type="text" label="Họ tên" name="teacherName" required register={register} />
                </div>
              </div>

              <div>
                <Input type="date" label="Ngày sinh" name="birthDate" required register={register} />
              </div>
              <div>
                <Select label="Giới tính" {...register('gender')} />
              </div>

              <div>
                <Input type="text" label="Địa chỉ" name="address" required register={register} />
              </div>

              <div>
                <Input type="email" label="Email" name="email" required register={register} />
              </div>

              <div>
                <Input type="password" label="Mật khẩu" name="password" required register={register} />
              </div>
              <div>
                <Input type="number" label="Phone" name="phone" required register={register} />
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

      <Modal size="md" show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Chỉnh sửa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row container">
            <div className="form-group">
              <label>
                <b>Họ Tên</b>
              </label>
              <input
                className="form-control"
                label="Tên Lớp"
                name="nameClazz"
                value={teachersUpdate?.teacherName}
                onChange={(e) => setTeachersUpdate({ ...teachersUpdate, teacherName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>
                <b>Ngày Sinh</b>
              </label>
              <input
                type="text"
                className="form-control "
                label="Ngày sinh"
                name="birthDate"
                value={moment(teachersUpdate?.birthDate).format('DD/MM/yyyy')}
                onChange={(e) => setTeachersUpdate({ ...teachersUpdate, birthDate: e.target.value })}
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="selectoption">
                <b>Giới tính</b>
              </label>
              <select
                id="selectoption"
                name="gender"
                value={teachersUpdate?.gender}
                onChange={(e) => setTeachersUpdate({ ...teachersUpdate, gender: e.target.value })}
                className="form-control "
                required
              >
                <option value={teachersUpdate?.gender} selected>
                  {teachersUpdate?.gender == '1' ? 'Nam' : 'Nữ'}
                </option>
                <option value="true">Nam</option>
                <option value="false"> Nữ</option>
              </select>
            </div>

            <div className="form-group">
              <label>
                <b>Địa chỉ</b>
              </label>
              <input
                className="form-control "
                label="Ngày KT"
                name="address"
                value={teachersUpdate?.address}
                onChange={(e) => setTeachersUpdate({ ...teachersUpdate, address: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>
                <b>Email</b>
              </label>
              <input
                type="email"
                className="form-control "
                name="email"
                value={teachersUpdate?.email}
                onChange={(e) => setTeachersUpdate({ ...teachersUpdate, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>
                <b>Phone</b>
              </label>
              <input
                className="form-control "
                name="phone"
                value={teachersUpdate?.phone}
                onChange={(e) => setTeachersUpdate({ ...teachersUpdate, phone: e.target.value })}
              />
            </div>

            <span>
              <button style={{ marginRight: '10px' }} className="btn-danger btn" onClick={handleCloseUpdate}>
                Hủy bỏ
              </button>
              <button className="btn-primary btn " onClick={(e) => onSubmitUpdate(e)}>
                Hoàn tất
              </button>
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
}

export default Teacher;
