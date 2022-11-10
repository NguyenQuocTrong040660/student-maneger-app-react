import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { Input } from '../../components/students/components/Input/Inputs';
import { useForm } from 'react-hook-form';
import { Button } from 'react-bootstrap';
import { useEffect } from 'react';
import scheduleAPI from '../../api/scheduleAPI';
import { useSnackbar } from 'notistack';
import scheduleEvalueAPI from '../../api/scheduleEvalueAPI';
import moment from 'moment';

LectureDetails.propTypes = {};

function LectureDetails(props) {
  const { idLecture } = useParams();

  //data:schedule_id :
  const [schedule, setSchedule] = useState();

  const { enqueueSnackbar } = useSnackbar();

  //Get Now day(lấy ngày hệ thống hiện tại trên máy tính)
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + '/' + mm + '/' + dd;

  //data
  const [id, setId] = useState('');
  const [evaluateNote, setEvaluateNote] = useState('');
  const [mark1, setMark1] = useState('');
  const [mark2, setMark2] = useState('');
  const [mark3, setMark3] = useState('');
  const [homeWork, setHomeWork] = useState('');
  const [stateUpload, setStateUpload] = useState();

  //data
  useEffect(() => {
    getApiScheduleById();
  }, []);
  const getApiScheduleById = async () => {
    try {
      const rs = await scheduleAPI.getSchedule(idLecture);
      setSchedule(rs.data);
    } catch (error) {
      console.log(error);
    }
  };

  //get Evalue Lecture form schedule_id (URL:id)
  useEffect(() => {
    getScheduleEvalueBySchedule_id();
  }, []);
  const getScheduleEvalueBySchedule_id = async () => {
    try {
      const rs = await scheduleEvalueAPI.getBySchduleId(idLecture);
      console.log(rs.data);
      setId(rs.data.id);
      setEvaluateNote(rs.data.evaluateNote);
      setMark1(rs.data.mark1);
      setMark2(rs.data.mark2);
      setMark3(rs.data.mark3);
      setHomeWork(rs.data.homeWork);
      setStateUpload(true); //update
    } catch (error) {
      setStateUpload(false); //create
    }
  };

  //
  console.log(schedule);
  //handle Submit
  const onSubmit = async () => {
    const curentDate = today; //false
    const lectureDateStart = moment(schedule?.dateStart).format('yyyy-MM-DD'); //false
    var bool1 = moment(curentDate).isSame(lectureDateStart); //false
    if (bool1 === true) {
      try {
        const data = {
          id: id,
          evaluateNote: evaluateNote,
          mark1: mark1,
          mark2: mark2,
          mark3: mark3,
          homeWork: homeWork,
          schedule: schedule,
        };
        const data1 = {
          evaluateNote: evaluateNote,
          mark1: mark1,
          mark2: mark2,
          mark3: mark3,
          homeWork: homeWork,
          schedule: schedule,
        };
        if (stateUpload) {
          //update
          const rsupdate = await scheduleEvalueAPI.updatescheduleEvalue(id, data);
          enqueueSnackbar('Cập nhật Thành công!', { variant: 'success' });
        } else {
          //create
          const rs = await scheduleEvalueAPI.add(data1);
          setId(rs.data.id);
          const rses = await scheduleAPI.updateStatustActiveChecked(idLecture);
          enqueueSnackbar('Đánh giá Thành công!', { variant: 'success' });
        }
      } catch (error) {
        enqueueSnackbar('Cập nhật không thành công!', { variant: 'error' });
      }
    } else {
      enqueueSnackbar('Thời gian đánh giá - kết luận không chính xác!', { variant: 'error' });
    }
  };

  return (
    <>
      <div className="row ">
        <div className="col-md-2 btn btn-secondary " style={{ margin: '0px  5px' }}>
          Đang kết luận lớp {schedule?.clazz?.nameClazz}
        </div>
        ===>
        <div className="col-md-2 btn btn-info ">
          <Link
            to={`/home/lecture-management/check-student/${idLecture}/${id}`}
            style={{ color: 'white', textDecoration: 'none' }}
          >
            Check Hạnh Kiểm
          </Link>
        </div>
      </div>
      <br />
      <div className="container">
        <div className="row ">
          <div className="col" style={{ height: '200px', backgroundColor: 'white' }}>
            <div className="form-group">
              <lable>
                <b>Dặn dò</b>
              </lable>
              <input
                className="form-control"
                type="text"
                name="homeWork"
                value={homeWork}
                required
                onChange={(e) => setHomeWork(e.target.value)}
              />
            </div>
          </div>
          <div className="col" style={{ height: '200px', backgroundColor: 'white', marginLeft: '5px' }}>
            <div className="form-group">
              <lable>
                <b>Nhận Xét</b>
              </lable>
              <input
                className="form-control"
                type="text"
                name="evaluateNote"
                value={evaluateNote}
                required
                onChange={(e) => setEvaluateNote(e.target.value)}
              />
            </div>
          </div>
        </div>
        <br />
        <div className="col-md-12 " style={{ height: '300px', backgroundColor: 'white', marginTop: '20px' }}>
          <div className="row">
            <p style={{ color: 'red', textAlign: 'center' }}>
              <b>Môn</b> {schedule?.subject?.subjectName} -- {schedule?.clazz?.nameClazz}
            </p>
            <br />

            <h6 style={{ textAlign: 'center' }}>Tên bài: {schedule?.subjectContent}</h6>
          </div>
          <div className="form-row">
            <div className="form-group col">
              <lable>
                <b>Vệ sinh</b>
              </lable>
              <input
                className="form-control"
                type="number"
                name="mark1"
                minLength={0}
                required
                value={mark1}
                min="0"
                max="10"
                onChange={(e) => setMark1(e.target.value)}
              />
            </div>
            <div className="form-group col">
              <lable>
                <b>Nề nếp</b>
              </lable>
              <input
                className="form-control"
                type="number"
                name="mark2"
                value={mark2}
                required
                min="0"
                max="10"
                onChange={(e) => setMark2(e.target.value)}
              />
            </div>
            <div className="form-group col">
              <lable>
                <b>Học tập</b>
              </lable>
              <input
                className="form-control"
                type="number"
                name="mark3"
                value={mark3}
                required
                min="0"
                max="10"
                onChange={(e) => setMark3(e.target.value)}
              />
            </div>
          </div>
          <Button onClick={onSubmit}>Cập nhật</Button>
        </div>
      </div>
    </>
  );
}

export default LectureDetails;
