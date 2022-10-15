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
import { ControlPoint } from '@mui/icons-material';
import clazzAPI from '../../../api/clazzAPI';
import teacherClazzAPI from '../../../api/teacherClazzAPI';
TeacherClazz.propTypes = {};

function TeacherClazz(props) {
  const { enqueueSnackbar } = useSnackbar();

  const [clazz, setClazz] = useState([]);
  const [teachers, setTeachers] = useState(); //List table
  const [responsibleTeacher, setResponsibleTeacher] = useState(); //Data responsible Teacher
  const [responsibleTeacherUpdate, setResponsibleTeacherUpdate] = useState(); //MODAL
  const [show, setShow] = useState(false); //MODAL
  const [showUpdate, setShowUpdate] = useState(false); //MODAL

  const [isloadAPI, setIsloadAPI] = useState(false); //UseEffef

  const { register, handleSubmit } = useForm();
  const handleClose = () => setShow(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleClickAdd = (e) => {
    setResponsibleTeacher(e);
    if (responsibleTeacher !== undefined) {
      setShow(true);
    }
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

  //Call API Clazzs and handel filter Clazz
  useEffect(() => {
    getClazzs();
  }, []);

  const getClazzs = () => {
    clazzAPI.getAll().then((data) => {
      setClazz(data.data);
    });
  };

  //submit teacher
  const onSubmit = async (e) => {
    try {
      const lassdata = clazz.filter((item) => item.id == e.clazzid);
      const objectClazz = Object.assign({}, ...lassdata);
      const data = {
        id: { clazzId: e.clazzid, teacherId: responsibleTeacher.id },
        clazz: objectClazz,
        roleClazz: e.roleClazz,
      };
      const rs = await teacherClazzAPI.add(data);
      console.log(rs);
      enqueueSnackbar('Thành công!', { variant: 'success' });
      setShow(false);
    } catch (error) {
      enqueueSnackbar('Không thành công!', { variant: 'error' });
    }
  };

  //handle Edit
  const handleEdit = (e) => {
    setResponsibleTeacherUpdate(e);
    if (responsibleTeacherUpdate !== undefined) {
      setShowUpdate(true);
    }
  };

  const onSubmitUpdate = async (e) => {
    try {
      console.log(responsibleTeacherUpdate);
      const rs = await teacherClazzAPI.update(responsibleTeacherUpdate);
      console.log(rs.data);
      enqueueSnackbar('Cập nhật Thành công!', { variant: 'success' });
      setShowUpdate(false);
    } catch (error) {
      enqueueSnackbar('Cập nhật Không thành công!', { variant: 'error' });
    }
  };

  const handleDelete = async (e) => {
    try {
      console.log(e);
      const rs = await teacherClazzAPI.deleteTeacherClazz(e);
      enqueueSnackbar('Xoá Thành công!', { variant: 'success' });
      setIsloadAPI(!isloadAPI);
    } catch (error) {
      enqueueSnackbar('Xóa không thành công!', { variant: 'error' });
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
                    <th>GIỚI TÍNH</th>
                    <th>EMAIL</th>
                    <th>PHỤ TRÁCH</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {teachers?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.teacherName}</td>
                      <td>{item.gender ? 'Nam' : 'Nữ'}</td>
                      <td>{item.email}</td>
                      <td>
                        {item?.clazzTeacher?.map((items) => (
                          <tr style={{ bgColor: 'gray' }}>
                            <td>{items?.clazz?.nameClazz}</td>
                            <td>{items?.roleClazz}</td>
                            <td>
                              <span onClick={(e) => handleEdit(items)}>
                                <SettingsIcon style={{ color: '#FF9900' }} />
                              </span>

                              <span>
                                <DeleteIcon
                                  onClick={(e) => {
                                    if (
                                      window.confirm(`Xóa phụ trách${items?.clazz?.nameClazz} ${items?.roleClazz}?`)
                                    ) {
                                      handleDelete(items.id);
                                    }
                                  }}
                                  style={{ color: 'red' }}
                                />
                              </span>
                            </td>
                          </tr>
                        ))}
                      </td>

                      <td>
                        <span onClick={(e) => handleClickAdd(item)}>
                          <ControlPoint style={{ color: '#FF9900' }} />
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
          <Modal.Title>Thêm Phụ Trách</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <lable>
                  <b>Giáo Viên</b>
                </lable>
                <h6>{responsibleTeacher?.teacherName}</h6>
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

      <Modal size="md" show={showUpdate} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Cập nhật vai trò Phụ trách</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row container">
            <div className="form-group col-md-6">
              <label htmlFor="selectoption">
                <b>Vai trò</b>
              </label>
              <select
                id="selectoption"
                name="Vai trò"
                value={responsibleTeacherUpdate?.roleClazz}
                onChange={(e) =>
                  setResponsibleTeacherUpdate({ ...responsibleTeacherUpdate, roleClazz: e.target.value })
                }
                className="form-control "
                required
              >
                <option value={responsibleTeacherUpdate?.roleClazz} selected>
                  {responsibleTeacherUpdate?.roleClazz}
                </option>
                <option value="Quản nhiệm">Quản nhiệm</option>
                <option value="Bộ môn">Bộ môn</option>
              </select>
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

export default TeacherClazz;
