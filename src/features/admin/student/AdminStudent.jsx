import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useEffect } from 'react';
import clazzAPI from '../../../api/clazzAPI';
import moment from 'moment';
import { Button, Modal } from 'react-bootstrap';
import { Input } from '../../../components/students/components/Input/Inputs';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
AdminStudent.propTypes = {};

function AdminStudent(props) {
  const { enqueueSnackbar } = useSnackbar();
  //Form
  const { register, handleSubmit } = useForm();

  const [clazz, setClazz] = useState();
  const [show, setShow] = useState(false); //MODAL
  const [showUpdate, setShowUpdate] = useState(false); //MODAL
  //Delete Clazz By Id
  const [isloadAPI, setIsloadAPI] = useState(false);
  //Dataupdate
  const [clazzUpdate, setClazzUpdate] = useState();
  const [nameClazz, setNameClazz] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  //ENd Dataupdate
  useEffect(() => {
    clazzAPI.getAll().then((rs) => {
      setClazz(rs.data);
    });
  }, [show, showUpdate, isloadAPI]);

  const handleClose = () => setShow(false);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleClickAdd = () => {
    setShow(true);
  };
  const onSubmit = async (e) => {
    try {
      const data = {
        nameClazz: e.nameClazz,
        startDate: e.startDate,
        endDate: e.endDate,
        status: true,
      };

      console.log(data);
      const res = await clazzAPI.add(data);

      setShow(false);
      enqueueSnackbar('Thêm thành công', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Xử lí thất bại!', { variant: 'error' });
    }
  };

  //Update Modal
  const handleEditClazzItem = (e) => {
    setClazzUpdate(e);
    if (clazzUpdate !== undefined) {
      setShowUpdate(true);
    }
  };

  //Submit
  const onSubmitUpdate = async (e) => {
    try {
      const rs = await clazzAPI.update(clazzUpdate.id, clazzUpdate);
      console.log(rs.data);
      setShowUpdate(false);
      enqueueSnackbar('Thành công!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Thất bại!', { variant: 'error' });
    }
  };

  //Delete Clazz By Id
  const handleDeleteClazzItem = async (e) => {
    try {
      const rs = await clazzAPI.deleteClazz(e.id, e);

      enqueueSnackbar('Thành công!', { variant: 'success' });
      setIsloadAPI(!isloadAPI);
    } catch (error) {
      enqueueSnackbar('Thất bại!', { variant: 'error' });
    }
  };

  return (
    <>
      <div className="row container">
        <div className="col-md-9 container  ">
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
                <h6 className="m-0 font-weight-bold text-primary">DANH SÁCH LỚP HỌC {clazz?.length} </h6>
                <button className="btn btn-outline-warning" onClick={handleClickAdd}>
                  Thêm Mới
                </button>
              </span>
            </div>
            <div className="table-responsive scrol-Table">
              <table className="table table-hover" id="dataTable" width="100%" cellspacing="0">
                <thead style={{ backgroundColor: '#385ece', color: 'white' }}>
                  <tr>
                    <th>STT</th>
                    <th>TÊN LỚP</th>
                    <th>NGÀY BĐ</th>
                    <th>NGÀY KT</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {clazz?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item?.nameClazz}</td>
                      <td>{moment(item.startDate).format('DD/MM/yyyy')}</td>
                      <td>{moment(item.endDate).format('DD/MM/yyyy')}</td>
                      <td>
                        <span onClick={(e) => handleEditClazzItem(item)}>
                          <SettingsIcon style={{ color: '#FF9900' }} />
                        </span>
                      </td>
                      <td>
                        <span>
                          <DeleteIcon
                            onClick={(e) => {
                              if (window.confirm(`Xóa lớp ${item?.nameClazz}?`)) {
                                handleDeleteClazzItem(item);
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
                  <Input type="text" label="Tên lớp" name="nameClazz" required register={register} />
                </div>
              </div>

              <div>
                <Input type="date" label="Ngày BĐ" name="startDate" required register={register} />
              </div>

              <div>
                <Input type="date" label="Ngày KT" name="endDate" required register={register} />
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
                <b>Tên Lớp</b>
              </label>
              <input
                className="form-control"
                label="Tên Lớp"
                name="nameClazz"
                value={clazzUpdate?.nameClazz}
                onChange={(e) => setClazzUpdate({ ...clazzUpdate, nameClazz: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>
                <b>Ngày BĐ</b>
              </label>
              <input
                className="form-control "
                label="Ngày KT"
                name="startDate"
                value={moment(clazzUpdate?.startDate).format('DD/MM/yyyy')}
                onChange={(e) => setClazzUpdate({ ...clazzUpdate, startDate: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>
                <b>Ngày KT</b>
              </label>
              <input
                className="form-control "
                label="Ngày KT"
                name="endDate"
                value={moment(clazzUpdate?.endDate).format('DD/MM/yyyy')}
                onChange={(e) => setClazzUpdate({ ...clazzUpdate, endDate: e.target.value })}
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

export default AdminStudent;
