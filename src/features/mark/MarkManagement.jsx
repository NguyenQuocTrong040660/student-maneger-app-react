import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { color, margin } from '@mui/system';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import studentAPI from '../../api/studentAPI';
import { useEffect } from 'react';
import clazzAPI from '../../api/clazzAPI';
import { useForm } from 'react-hook-form';
import './MarkManagement.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import studentFamilyAPI from '../../api/studentFamilyAPI';
import { Redirect, useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import subjectAPI from '../../api/subjectAPI';
import { Button, Modal } from 'react-bootstrap';
import { Input } from '../../components/students/components/Input/Inputs';
import markTypeAPI from '../../api/markTypeAPI';
import markAPI from '../../api/markAPI';

import DeleteIcon from '@mui/icons-material/Delete';
import StorageKey from '../../constant/storage-key';
import { isLabelWithInternallyDisabledControl } from '@testing-library/user-event/dist/utils';
MarkManagement.propTypes = {};

function MarkManagement(props) {
  const history = useHistory();

  const { enqueueSnackbar } = useSnackbar();
  const [studentsFirst, setStudentsFirst] = useState([]);
  const [students, setStudents] = useState([]);
  const [studentSelect, setStudentSelect] = useState();
  const [clazz, setClazz] = useState([]);
  const [markType, setMarkType] = useState([]);
  const [mark, setMarks] = useState([]);

  const [subject, setSubject] = useState();
  const [subjectSelect, setSubjectSelect] = useState();

  const [semesterSelect, setSemesterSelect] = useState();

  console.log('FirtsStudent', students);
  console.log('FirtsClazz', clazz);
  const [show, setShow] = useState(false); //MODAL

  const [isloadAPI, setIsloadAPI] = useState(false); //UseEffef

  const handleClose = () => setShow(false);
  //MessAge
  const user = JSON.parse(localStorage.getItem(StorageKey.USER));
  //call api get ALL Student

  //end call  ALL Student

  //Call Api All Subject
  useEffect(() => {
    getSubject();
  }, [isloadAPI]);

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
    clazzAPI.getClazzByTeacherId(user.id).then((rs) => {
      setClazz(rs.data);
    });
  }, []);
  console.log(clazz);

  //END
  //CALL API MarkTypeAPI
  useEffect(() => {
    getMarkType();
  }, []);

  const getMarkType = async () => {
    try {
      const rs = await markTypeAPI.getAll();
      setMarkType(rs.data);
    } catch (error) {
      console.log(error);
    }
  };
  //END CALL API MarkTypeAPI

  //CALL API MARKS
  useEffect(() => {
    getMarks();
  }, [show, isloadAPI]);

  const getMarks = async () => {
    try {
      const rs = await markAPI.getAll();
      setMarks(rs.data);
    } catch (error) {
      enqueueSnackbar('Call API Mark that Bai!', { variant: 'error' });
    }
  };
  console.log(mark);

  //END

  //Begin handel filter Clazz
  const handelChangeClazz = async (e) => {
    const data = e.target.value;
    console.log(data);

    try {
      const rs = await studentAPI.getStudentByClazz(data);
      setStudents(rs.data);
      setStudentsFirst(rs.data);
      setResMarkDetail();
    } catch (error) {
      enqueueSnackbar('Error Call API Student By Clazz!', { variant: 'error' });
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

  const handelChangeSubject = (e) => {
    const data = e.target.value;
    const subjectData = subject.filter((item) => item.id == data);
    const objectSubject = Object.assign({}, ...subjectData);
    setSubjectSelect(objectSubject);
    setResMarkDetail(); //clear ket qua Diem chi tiet
  };

  //Handel Search nameStudent

  //Handel Add student

  const { register, handleSubmit } = useForm();

  //hanleClick Student
  const [resMarkDetail, setResMarkDetail] = useState([]);

  const handelClickStudent = (e) => {
    try {
      if (semesterSelect === undefined) {
        enqueueSnackbar('Click ch???n h???c k???!', { variant: 'error' });
      } else if (subjectSelect === undefined) {
        enqueueSnackbar('Click ch???n m??n h???c!', { variant: 'error' });
      } else {
        markAPI.getAllMarkByConditions(subjectSelect.id, semesterSelect, e).then((res) => {
          setResMarkDetail(res.data);
        });
      }
    } catch (error) {
      enqueueSnackbar('Errror Click Student!', { variant: 'error' });
    }
  };

  console.log('resMarkDetail', resMarkDetail);

  //handel handelChangeSemester

  const handelChangeSemester = (e) => {
    setSemesterSelect(e.target.value);
    setResMarkDetail(); //clear ket qua Diem chi tiet
  };

  const handleAddMark = (e) => {
    setStudentSelect(e);
    if (semesterSelect === undefined) {
      enqueueSnackbar('Click ch???n h???c k???!', { variant: 'error' });
    } else if (subjectSelect === undefined) {
      enqueueSnackbar('Click ch???n m??n h???c!', { variant: 'error' });
    } else {
      setShow(true);
    }
  };

  const onSubmit = async (e) => {
    try {
      const dataMarkType = markType.filter((item) => item.id == e.markType);
      const objectMarkType = Object.assign({}, ...dataMarkType);
      const data = {
        subjectId: subjectSelect.id,
        mark: e.mark,
        semester: semesterSelect,
        student: studentSelect,
        markType: objectMarkType,
        status: true,
      };
      const rs = await markAPI.addMark(data);
      enqueueSnackbar('Th??nh c??ng!', { variant: 'success' });
      const res = await markAPI.getAllMarkByConditions(subjectSelect.id, semesterSelect, rs.data.student.id);
      setResMarkDetail(res.data);
      setShow(false);
    } catch (error) {
      enqueueSnackbar('Kh??ng th??nh c??ng!', { variant: 'error' });
    }
  };

  //handle So luong Diem

  /*T???o h??m ?????m s??? l???n ghi ??i???m theo m??n- h???c k?? - c???a h???c sinh ???? */
  const count_element_in_array = (idstudent, subjectId, semesster, mark) => {
    let count = 0;
    mark.forEach((element) => {
      if (element.semester == semesster && element.subjectId == subjectId && element.student.id == idstudent) {
        count++;
      }
    });
    return count;
  };

  const handleDeleteMarkDetail = async (e) => {
    try {
      const rs = await markAPI.delete(e);
      const dataFilter = resMarkDetail.filter((item) => item.id !== e); //loai bo ptu vua xoa trong State
      setResMarkDetail(dataFilter);
      setIsloadAPI(!isloadAPI);
      console.log(isloadAPI);
      enqueueSnackbar('Th??nh c??ng!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Kh??ng th??nh c??ng!', { variant: 'error' });
    }
  };

  return (
    <>
      <div className="row container">
        <div className="col-md-3">
          <lable>
            <b>T??m ki???m theo t??n</b>
          </lable>
          <input
            className="form-control"
            type="text"
            onChange={handelChangenNameStudent}
            placeholder="Nh???p t??? kh??a t??m ki???m"
          />
        </div>
        <div className="col-md-3">
          <lable>
            <b>H???c K???</b>
          </lable>
          <select onChange={handelChangeSemester} className="custom-select " required>
            <option>All</option>
            <option value="1">H???c k??? 1</option>
            <option value="2">H???c k??? 2</option>
          </select>
        </div>

        <div className="col-md-3">
          <lable>
            <b>L???p</b>
          </lable>
          <select onChange={handelChangeClazz} className="custom-select " required>
            <option>All</option>
            {clazz?.map((data) => (
              <option value={data?.clazz.id}> {data?.clazz.nameClazz}</option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <lable>
            <b>M??n h???c</b>
          </lable>
          <select onChange={handelChangeSubject} className="custom-select " required>
            <option>All</option>
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
              <h6 class="m-0 font-weight-bold text-primary">DANH S??CH H???C SINH {students.length}</h6>
            </div>
            <div className="table-responsive scrol-Table">
              <table className="table table-hover" id="dataTable" width="100%" cellspacing="0">
                <thead style={{ backgroundColor: '#385ece', color: 'white' }}>
                  <tr>
                    <th>STT</th>
                    <th>M?? HS</th>
                    <th>T??N HS</th>
                    <th>SL ??I???M</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {students?.map((item, index) => (
                    <tr key={item.id} onClick={(e) => handelClickStudent(item.id)}>
                      <td>{index + 1}</td>
                      <td>{`HS${item.id}`}</td>
                      <td>{item?.nameStudent}</td>
                      <td>
                        <span className="circle">
                          {count_element_in_array(item?.id, subjectSelect?.id, semesterSelect, mark)}
                        </span>
                      </td>
                      <td onClick={(e) => handleAddMark(item)}>
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
              <h6 class="m-0 font-weight-bold text-primary">??I???M CHI TI???T</h6>
            </div>
            <div className="table-responsive scrol-Table">
              <table className="table table-hover" id="dataTable" width="100%" cellspacing="0">
                <thead style={{ backgroundColor: '#385ece', color: 'white' }}>
                  <tr>
                    <th>H???Y</th>
                    <th>M??N H???C</th>
                    <th>??I???M</th>
                    <th>LO???I</th>
                    <th>H??? S???</th>
                    <th>H???C K??</th>
                  </tr>
                </thead>
                <tbody>
                  {resMarkDetail?.map((item) => (
                    <tr
                      key={item.id}
                      onClick={(e) => {
                        if (window.confirm(`X??a ??i???m m??n ${subjectSelect?.subjectName}?`)) {
                          handleDeleteMarkDetail(item.id);
                        }
                      }}
                    >
                      <td>
                        <DeleteIcon style={{ color: 'red' }} />
                      </td>
                      <td>{subjectSelect?.subjectName}</td>
                      <td>{item?.mark}</td>
                      <td>{item?.markType.markTypeName}</td>
                      <td>{item?.markType.markNumber}</td>
                      <td>{item?.semester}</td>
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
          <Modal.Title>
            Ghi ??i???m {studentSelect?.nameStudent} m??n {subjectSelect?.subjectName} - HK{semesterSelect}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-row">
                <div className="col-md-4">
                  <Input type="number" label="S??? ??i???m" name="mark" required register={register} />
                </div>
                <div className="form-group col-md-8">
                  <label>
                    <b>Lo???i ??i???m</b>
                  </label>
                  <select {...register('markType')} className="custom-select " required>
                    <option value="ALL"> Ch???n ALL--</option>
                    {markType?.map((data) => (
                      <option value={data.id}> {data.markTypeName}</option>
                    ))}
                  </select>
                </div>
              </div>

              <Button variant="danger" style={{ marginRight: '10px' }} onClick={handleClose}>
                H???y b???
              </Button>
              <Button variant="primary" type="submit">
                Ho??n t???t
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
