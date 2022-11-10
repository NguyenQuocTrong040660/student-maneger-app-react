import React, { useRef, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ControlPoint } from '@material-ui/icons';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect } from 'react';
import datesAPI from '../../api/datesAPI';
import './Lecture.css';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import moment from 'moment/moment';
import clazzAPI from '../../api/clazzAPI';
import StorageKey from '../../constant/storage-key';
import subjectAPI from '../../api/subjectAPI';
import Button from 'react-bootstrap/Button';
import { Form, Modal, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import * as ExcelJS from 'exceljs';
import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/students/components/Input/Inputs';
import scheduleAPI from '../../api/scheduleAPI';
import teacherAPI from '../../api/teacherAPI';
import { CSVLink } from 'react-csv';
import FileSaver, { saveAs } from 'file-saver';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { useDispatch, useSelector } from 'react-redux';
import { addScheduleReducer } from '../../reducers/scheduleReducer';
import { Link, useHistory } from 'react-router-dom';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import LectureDetails from './LectureDetails';
import scheduleEvalueAPI from '../../api/scheduleEvalueAPI';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  menuPaper: {
    maxHeight: 100,
  },

  selectOption: {
    backgroundColor: 'white',
  },
}));

Lecture.propTypes = {};

function Lecture(props) {
  const history = useHistory();

  //MessAge
  const user = JSON.parse(localStorage.getItem(StorageKey.USER));
  const { enqueueSnackbar } = useSnackbar();
  const selectSize = useStyles();
  //Form
  const { register, handleSubmit } = useForm();

  //get Curentdate to callAPI =>get Week
  const [dates, setDates] = useState([]);

  const [subject, setSubject] = useState();

  const [resSchedule, setResSchedule] = useState([]);
  const [resScheduleFirst, setResScheduleFirst] = useState([]);

  const [clazz, setClazz] = useState();

  const [teachers, setTeachers] = useState();
  const [teacherSelect, setTeachersSelect] = useState('');

  const [clazzSelect, setClazzSelect] = useState('');

  const [isButton, setIsButton] = useState(''); //set State color(Yelo) buuton for Sang-Chieu-TatCa
  const [isButtonDate, setIsButtonDate] = useState(''); //set State color(Yelo) buuton for Sang-Chieu-TatCa
  const [lession, setLession] = useState();

  //state Modal=> lession
  const [lessionSelect, setLessionSelect] = useState('');

  //Call API => save value
  const [weeks, setWeeks] = useState();

  //save value when click select Week
  const [weekSelect, setWeekSelect] = useState(10);
  const [subjectSlect, setSubjectSlect] = useState('');
  const [dateSelect, setDateSelect] = useState('');

  //Model
  const [show, setShow] = useState(false);
  const [showUpdate, setshowUpdate] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  //Get Now day
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + '/' + mm + '/' + dd;

  //Call API to get Entity Dates
  useEffect(() => {
    datesAPI.getDatesByNowDay(today).then((rs) => {
      setWeekSelect(rs.data.week);
    });

    datesAPI.getWeeksForLecture().then((rs) => {
      setWeeks(rs.data);
    });

    clazzAPI.getClazzByTeacherId(user.id).then((rs) => {
      setClazz(rs.data);
    });
    getTeachers();
  }, []);

  //Cal API Date for (Chon Ngay) tu week
  useEffect(() => {
    const getDatesFromWeek = async () => {
      try {
        const response = await datesAPI.getDatesByWeek(weekSelect);
        setDates(response.data);
        console.log('DATA', response.data);
      } catch (e) {
        enqueueSnackbar('Vui lòng chọn tuần!', { variant: 'error' });
      }
    };
    getDatesFromWeek();
  }, [weekSelect]);

  //Cal API Date for (Chon Ngay) tu week

  //CALL API GET ALL TEACHER

  const getTeachers = async () => {
    try {
      const response = await teacherAPI.getALL();
      setTeachers(response.data);
    } catch (e) {
      enqueueSnackbar('loi call API Teacher!', { variant: 'error' });
    }
  };
  //END CALL API GET ALL TEACHER

  // CALL API SUBEJECTS
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
  //END CALL API SUBEJECTS

  //Call API Schedule By Week
  useEffect(() => {
    getSchedulesByWeek();
  }, [weekSelect, showUpdate, isLoad]);

  const getSchedulesByWeek = async () => {
    try {
      const response = await scheduleAPI.getSchedulesByWeek(weekSelect);
      setResSchedule(response.data);
      setResScheduleFirst(response.data);
    } catch (e) {
      console.log(e);
      enqueueSnackbar('loi call API Schedule by week!', { variant: 'error' });
    }
  };
  //END Call API Schedule By Week

  console.log(dates);
  console.log('DATE sELECT', dateSelect);
  console.log('WEEK', weekSelect);
  console.log('DATESSSS', dates);
  console.log('CLAZZ', clazz);
  console.log('CLAZZSELECT', clazzSelect);
  console.log('Subject', subject);
  console.log('SubjectSELECT', subjectSlect);
  console.log('teacherSelect', teacherSelect);

  const handleChangeWeek = (event) => {
    setWeekSelect(event.target.value);
    setDateSelect(''); //set date emty
    setIsButtonDate(''); //set date emty
  };

  const handleChangeClazz = (event) => {
    setClazzSelect(event.target.value);
    const data = event.target.value;
    if (data === '' && subjectSlect === '') {
      setResSchedule(resScheduleFirst);
    } else if (data === '' && teacherSelect !== '') {
      const clazzFilter = resScheduleFirst.filter((item) => item.idTeacher === teacherSelect.id);
      setResSchedule([...clazzFilter]);
    } else if (data !== '' && teacherSelect !== '') {
      const clazzFilter = resScheduleFirst.filter(
        (item) => item.clazz.id === data.id && item.idTeacher === teacherSelect.id
      );
      setResSchedule([...clazzFilter]);
    } else if (data === '' && subjectSlect !== '' && teacherSelect !== '') {
      const clazzFilter = resScheduleFirst.filter(
        (item) =>
          item.clazz.id === data.id && item.subject.id === subjectSlect.id && item.idTeacher === teacherSelect.id
      );
      setResSchedule([...clazzFilter]);
    } else if (data !== '' && subjectSlect === '') {
      const clazzFilter = resScheduleFirst.filter((item) => item.clazz.id === data.id);
      setResSchedule([...clazzFilter]);
    } else if (data !== '' && subjectSlect !== '') {
      const clazzFilter = resScheduleFirst.filter(
        (item) => item.clazz.id === data.id && item.subject.id === subjectSlect.id
      );
      setResSchedule([...clazzFilter]);
    } else if (data !== '' && subjectSlect !== '' && teacherSelect !== '') {
      const clazzFilter = resScheduleFirst.filter(
        (item) =>
          item.clazz.id === data.id && item.subject.id === subjectSlect.id && item.idTeacher === teacherSelect.id
      );
      setResSchedule([...clazzFilter]);
    }
  };

  const handleChangeSubject = (event) => {
    setSubjectSlect(event.target.value);
    const data = event.target.value;
    if (data.id == 12 && clazzSelect !== '') {
      const subjectFilter = resScheduleFirst.filter((item) => item.clazz.id === clazzSelect.id);
      setResSchedule([...subjectFilter]);
    } else if (data === '' && teacherSelect !== '') {
      const subjectFilter = resScheduleFirst.filter((item) => item.idTeacher === teacherSelect.id);
      setResSchedule([...subjectFilter]);
    } else if (data !== '' && teacherSelect !== '') {
      const subjectFilter = resScheduleFirst.filter(
        (item) => item.idTeacher === teacherSelect.id && item.subject.id === data.id
      );
      setResSchedule([...subjectFilter]);
    } else if (data !== '' && clazzSelect === '') {
      const subjectFilter = resScheduleFirst.filter((item) => item.subject.id === data.id);
      setResSchedule([...subjectFilter]);
    } else if (data !== '' && clazzSelect !== '') {
      const subjectFilter = resScheduleFirst.filter(
        (item) => item.subject.id === data.id && item.clazz.id === clazzSelect.id
      );
      setResSchedule([...subjectFilter]);
    } else if (data !== '' && clazzSelect !== '' && teacherSelect !== '') {
      const subjectFilter = resScheduleFirst.filter(
        (item) => item.subject.id === data.id && item.clazz.id === clazzSelect.id && item.idTeacher === teacherSelect.id
      );
      setResSchedule([...subjectFilter]);
    }
  };

  const handleChangeTeacher = (event) => {
    setTeachersSelect(event.target.value);
    const data = event.target.value;
    if (data === '' && clazzSelect === '' && subjectSlect === '') {
      setResSchedule(resScheduleFirst);
    } else if (data !== '' && clazzSelect === '' && subjectSlect === '') {
      const subjectFilter = resScheduleFirst.filter((item) => item.idTeacher === data.id);
      setResSchedule([...subjectFilter]);
    } else if (data !== '' && clazzSelect !== '' && subjectSlect !== '') {
      const subjectFilter = resScheduleFirst.filter(
        (item) => item.idTeacher === data.id && item.clazz.id === clazzSelect.id && item.subject.id === subjectSlect.id
      );
      setResSchedule([...subjectFilter]);
    }
  };

  //Handel When Click Choose Date
  const handelClickDate = (item, index) => {
    setDateSelect(item);
    setIsButtonDate(index);
    const data = item.id;
    if (data === '' && clazzSelect === '' && subjectSlect === '') {
      setResSchedule(resScheduleFirst);
    } else if (data !== '' && clazzSelect !== '' && subjectSlect === '') {
      const subjectFilter = resScheduleFirst.filter(
        (item) => item.dates.id === data && item.clazz.id === clazzSelect.id
      );
      setResSchedule([...subjectFilter]);
    } else if (data !== '' && clazzSelect !== '' && subjectSlect !== '') {
      const subjectFilter = resScheduleFirst.filter(
        (item) => item.dates.id === data && item.clazz.id === clazzSelect.id && item.subject.id === subjectSlect.id
      );
      setResSchedule([...subjectFilter]);
    } else {
      const subjectFilter = resScheduleFirst.filter((item) => item.dates.id === data);
      setResSchedule([...subjectFilter]);
    }
  };

  //Set even State Color Buton Sang-Chieu-Tatca

  const handelSessionS = () => {
    setLession([{ lession: 1 }, { lession: 2 }, { lession: 3 }, { lession: 4 }, { lession: 5 }]);
    setIsButton('Sang');

    if (clazzSelect === '' && dateSelect === '' && subjectSlect == '') {
      const CHIEU = resScheduleFirst.filter((item) => item.lession < 6);
      setResSchedule([...CHIEU]);
    } else if (clazzSelect !== '' && subjectSlect !== '' && dateSelect !== '' && teacherSelect !== '') {
      const subjectFilter = resScheduleFirst.filter(
        (item) =>
          item.lession < 6 &&
          item.clazz.id == clazzSelect.id &&
          item.subject.id == subjectSlect.id &&
          item.dates.id == dateSelect.id &&
          item.idTeacher == teacherSelect.id
      );
      setResSchedule([...subjectFilter]);
    } else if (clazzSelect !== '' && subjectSlect !== '' && dateSelect !== '') {
      const subjectFilter = resScheduleFirst.filter(
        (item) =>
          item.lession < 6 &&
          item.clazz.id === clazzSelect.id &&
          item.subject.id === subjectSlect.id &&
          item.dates.id === dateSelect.id
      );
      setResSchedule([...subjectFilter]);
    } else if (clazzSelect !== '' && dateSelect !== '') {
      const subjectFilter = resScheduleFirst.filter(
        (item) => item.lession < 6 && item.clazz.id === clazzSelect.id && item.dates.id === dateSelect.id
      );
      setResSchedule([...subjectFilter]);
    }
  };

  const dataToFilter = [clazzSelect, subjectSlect, teacherSelect, dateSelect];
  console.log(dataToFilter);

  const handelSessionC = () => {
    setLession([{ lession: 6 }, { lession: 7 }, { lession: 8 }, { lession: 9 }, { lession: 10 }]);
    setIsButton('Chieu');

    if (clazzSelect === '' && dateSelect === '') {
      const CHIEU = resScheduleFirst.filter((item) => item.lession > 5);
      setResSchedule([...CHIEU]);
    } else if (clazzSelect !== '' && subjectSlect !== '' && dateSelect !== '' && teacherSelect !== '') {
      const subjectFilter = resScheduleFirst.filter(
        (item) =>
          item.lession > 5 &&
          item.clazz.id === clazzSelect.id &&
          item.subject.id === subjectSlect.id &&
          item.dates.id === dateSelect.id &&
          item.idTeacher === teacherSelect.id
      );
      setResSchedule([...subjectFilter]);
    } else if (clazzSelect !== '' && subjectSlect !== '' && dateSelect !== '') {
      const subjectFilter = resScheduleFirst.filter(
        (item) =>
          item.lession > 5 &&
          item.clazz.id === clazzSelect.id &&
          item.subject.id === subjectSlect.id &&
          item.dates.id === dateSelect.id
      );
      setResSchedule([...subjectFilter]);
    } else if (clazzSelect !== '' && dateSelect !== '') {
      const subjectFilter = resScheduleFirst.filter(
        (item) => item.lession > 5 && item.clazz.id === clazzSelect.id && item.dates.id === dateSelect.id
      );
      setResSchedule([...subjectFilter]);
    }
  };

  const handelSessionAll = () => {
    setLession([
      { lession: 1 },
      { lession: 2 },
      { lession: 3 },
      { lession: 4 },
      { lession: 5 },
      { lession: 6 },
      { lession: 7 },
      { lession: 8 },
      { lession: 9 },
      { lession: 10 },
    ]);
    setIsButton('TatCa');
  };
  const handleClose = () => setShow(false);
  const handleCloseUpdate = () => setshowUpdate(false);

  const handleShow = (e) => {
    const curentDate = today; //Ngày hiện tại
    const lectureDateStart = moment(dateSelect.entryDate).format('yyyy-MM-DD'); //Ngày chọn
    var bool1 = moment(curentDate).isBefore(lectureDateStart); //true - false

    if (lession === undefined) {
      enqueueSnackbar('Chọn buổi trước!', { variant: 'error' });
      setShow(false);
    } else if (dateSelect === '') {
      enqueueSnackbar('Chọn ngày phù hợp!', { variant: 'error' });
      setShow(false);
    } else if (subjectSlect === '') {
      enqueueSnackbar('Chọn môn trước!', { variant: 'error' });
      setShow(false);
    } else if (clazzSelect === '') {
      enqueueSnackbar('Chọn lớp trước!', { variant: 'error' });
      setShow(false);
    } else if (teacherSelect === '') {
      enqueueSnackbar('Chọn giáo viên trước!', { variant: 'error' });
      setShow(false);
    } else if (
      clazzSelect !== '' &&
      subjectSlect !== '' &&
      dateSelect !== '' &&
      bool1 === false &&
      lession !== undefined &&
      teacherSelect !== ''
    ) {
      enqueueSnackbar('Chọn ngày phù hợp!', { variant: 'error' });
      setShow(false);
    } else if (
      clazzSelect !== '' &&
      subjectSlect !== '' &&
      dateSelect !== '' &&
      lession !== undefined &&
      teacherSelect !== ''
    ) {
      setShow(true);
    }
  };

  console.log(resScheduleFirst);

  //modal submit
  const handelModalLession = (event) => {
    setLessionSelect(event.target.value);
  };

  //form Modal
  //Add Lecture (Thêm báo giảng)
  // Requierd: Phải thực hiện trước ngày báo giảng
  const onSubmit = async (data) => {
    try {
      const dataShedule = {
        subject: subjectSlect,
        dates: dateSelect,
        clazz: clazzSelect,
        subjectContent: data.subjectContent,
        lession: data.lession,
        lessionPPCT: data.lessionPPCT,
        dateStart: dateSelect.entryDate,
        note: data.note,
        status: true,
        idTeacher: teacherSelect.id,
        nameTeacher: teacherSelect.teacherName,
      };

      const rs = await scheduleAPI.Add(dataShedule);
      console.log(rs.data);
      setResSchedule([...resSchedule, rs.data]);

      setShow(false);
      enqueueSnackbar('Thêm thành công!', { variant: 'success' });
    } catch (e) {
      enqueueSnackbar('Thêm không thành công!', { variant: 'error' });
    }
  };

  // BEGIN Update(Cập nhật lịch báo giảng)
  //Required: Phải thực hiện trước ngày báo giảng(giảng dạy)
  const [scheduleUpdate, setScheduleUpdate] = useState();
  const handleEditSchedule = (item) => {
    setScheduleUpdate(item);
    console.log(scheduleUpdate);

    if (scheduleUpdate !== undefined) {
      setshowUpdate(true);
    }
  };

  const handelSubmit = async (event) => {
    const curentDate = today; //false
    const lectureDateStart = moment(scheduleUpdate.dateStart).format('yyyy-MM-DD'); //false
    var bool1 = moment(curentDate).isBefore(lectureDateStart); //false

    if (bool1 === true) {
      try {
        const res = await scheduleAPI.updateSchedule(scheduleUpdate.id, scheduleUpdate);
        console.log(res.data);
        setshowUpdate(false);
        enqueueSnackbar('Cập nhật thành công!', { variant: 'success' });
      } catch (e) {
        enqueueSnackbar('Không thành công!', { variant: 'error' });
      }
    } else {
      enqueueSnackbar(`Cập nhật phải thực hiện trước ngày ${lectureDateStart} !`, { variant: 'error' });
    }
  };
  //END Update(Cập nhật lịch báo giảng)

  //Handel Export Lecture
  const headers = [
    {
      label: 'Thu/Ngay/Thang',
      style: { font: { sz: '18', bold: true } },
      width: { wpx: 125 },
      key: 'dateStart',
    },
    {
      label: 'Buoi',
      key: 'lession',
    },
  ];

  const csvLink = {
    headers: headers,
    data: resSchedule,
    filename: 'csvfile.csv',
  };
  const tableRef = useRef(null);

  const dispatch = useDispatch();
  const onClickExport = async () => {
    const action = await addScheduleReducer(resSchedule);
    dispatch(action);
    console.log('action', action);

    history.push('/view-export-schedule-lecture');
  };
  const scheduleExport = useSelector((state) => state.scheduleExport);
  const usersss = useSelector((state) => state.user);
  console.log('REDUX USER', usersss, scheduleExport);
  console.log('REDUX scheduleExport', scheduleExport);

  //Handle Delete (Xóa báo giảng)
  // Yêu cầu: Phải xóa trước ngày (startdate-dạy)
  const handleDeleteSchedule = async (e) => {
    const curentDate = today; //false
    const lectureDateStart = moment(e.dateStart).format('yyyy-MM-DD'); //false
    var bool1 = moment(curentDate).isBefore(lectureDateStart); //false
    if (bool1 === true) {
      try {
        const rs = await scheduleAPI.deleteSchedule(e.id);
        enqueueSnackbar('Xoá thành công', { variant: 'success' });
        setIsLoad(!isLoad);
      } catch (error) {
        enqueueSnackbar('Xoá Không thành công', { variant: 'error' });
      }
    } else {
      enqueueSnackbar(`Xóa phải thực hiện trước ngày ${lectureDateStart} !`, { variant: 'error' });
    }
  };
  //End Handel  Delete (Xóa báo giảng)

  //handle SDB
  const onClickExportSDB = () => {
    try {
      if (clazzSelect === '') {
        enqueueSnackbar('Click chọn lớp!', { variant: 'error' });
      } else if (clazzSelect !== '' && weekSelect !== undefined) {
        history.push(`/view-report-sdb/${weekSelect}/${clazzSelect.id}`);
      }
    } catch (error) {
      enqueueSnackbar('Click chọn lớp va tuần !!', { variant: 'error' });
    }
  };

  //End Handel Export Lecture

  function renderSwitch(param) {
    switch (param) {
      case 'Monday':
        return 'Thu 2';
      case 'Tuesday':
        return 'Thu 3';
      case 'Wednesday':
        return 'Thu 4';
      case 'Thursday':
        return 'Thu 5';
      case 'Friday':
        return 'Thu 6';
      case 'Saturday':
        return 'Thu 7';
      case 'Sunday':
        return 'CN';
      default:
        return '';
    }
  }

  return (
    <>
      <div className="row container">
        <div className="col-md-9 container  ">
          <div className="form-row d-flex align-items-center">
            <div className="col-md-3">
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="custom-select">
                <InputLabel id="demo-select-small">Tuần</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={weekSelect}
                  onChange={handleChangeWeek}
                  MenuProps={{ classes: { paper: selectSize.menuPaper } }}
                >
                  {weeks?.map((item, index) => (
                    <MenuItem key={index} value={item.weekYear}>
                      {item.weekYear}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="col-md-3">
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="custom-select">
                <InputLabel id="demo-select-small">Chọn Lớp</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={clazzSelect}
                  onChange={handleChangeClazz}
                >
                  {clazz?.map((item, index) => (
                    <MenuItem key={index} value={item.clazz}>
                      {item.clazz.nameClazz}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="col-md-3">
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="custom-select">
                <InputLabel id="demo-select-small">Chọn Môn</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={subjectSlect}
                  onChange={handleChangeSubject}
                >
                  {subject?.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item.subjectName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-md-3">
              <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="custom-select">
                <InputLabel id="demo-select-small">Giáo Viên</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={teacherSelect}
                  onChange={handleChangeTeacher}
                  MenuProps={{ classes: { paper: selectSize.menuPaper } }}
                >
                  {teachers?.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item.teacherName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <br></br>

          {/* Begin Table */}
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">DANH SÁCH BÁO GIẢNG {resSchedule.length}</h6>
            </div>
            <div className="table-responsive scrol-Table">
              <table className="table table-hover" id="dataTable" width="100%" cellspacing="0" ref={tableRef}>
                <thead style={{ backgroundColor: '#385ece', color: 'white' }}>
                  <tr>
                    <th>CHECK VP</th>
                    <th>NỘI DUNG</th>
                    <th>LỚP</th>
                    <th>MÔN</th>
                    <th>BUỔI</th>
                    <th>Tiết</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {resSchedule?.map((item, index) => (
                    <tr key={item.id}>
                      <td>
                        <span>
                          <Link to={`/home/lecture-management/${item.id}`}>
                            <CheckCircleIcon style={item.status ? { color: '#FF9900' } : { color: 'green' }} />
                          </Link>
                        </span>
                      </td>
                      <td>{item.subjectContent}</td>
                      <td>{item.clazz.nameClazz}</td>
                      <td>{item.subject.subjectName}</td>
                      <td>
                        {item.lession > 5
                          ? `CHIEU ${moment(item.dateStart).format('MM/DD')}`
                          : `SANG ${moment(item.dateStart).format('MM/DD')}`}
                      </td>
                      <td>{item.lession}</td>
                      <td>
                        <span onClick={(e) => handleEditSchedule(item)}>
                          <SettingsIcon style={{ color: '#FF9900' }} />
                        </span>

                        <span
                          onClick={(e) => {
                            if (
                              window.confirm(
                                `Bạn muốn xóa lịch dạy môn ${item?.subject?.subjectName} Ngày ${moment(
                                  item.dateStart
                                ).format('MM/DD')}  ?`
                              )
                            ) {
                              handleDeleteSchedule(item);
                            }
                          }}
                        >
                          <DeleteIcon style={{ color: 'red' }} />
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
        <div className="col-md-3 container ">
          <div style={{ width: '100%', height: 'auto', backgroundColor: 'white' }}>
            <h6>Tùy Chọn</h6>

            <Button
              variant="contained"
              // onClick={onDownload}
              onClick={onClickExport}
              style={{ borderRadius: '45px', marginRight: '5px' }}
              className={' btn btn-outline-secondary'}
            >
              Xuất Báo Giảng
            </Button>

            <Button
              onClick={onClickExportSDB}
              className={' btn btn-outline-secondary'}
              variant="contained"
              style={{ borderRadius: '45px' }}
              color="error"
            >
              Xuất Sổ ĐB
            </Button>
          </div>

          <br />
          <br />
          <div className="container-fuild" style={{ width: '100%', height: '250px', backgroundColor: 'white' }}>
            <h6>Chọn Ngày</h6>

            {dates.map((item, index) => (
              <button
                className={
                  isButtonDate === index ? 'buttonTrue btn btn-outline-secondary' : 'btn btn-outline-secondary'
                }
                key={index}
                onClick={(e) => {
                  handelClickDate(item, index);
                }}
                size="small"
                style={{ borderRadius: '45px', margin: '5px' }}
              >
                {renderSwitch(moment(item?.entryDate).format('dddd'))} {moment(item.entryDate).format('DD/MM')}
              </button>
            ))}
          </div>

          <br />
          <div style={{ width: '100%', height: 'auto', backgroundColor: 'white' }}>
            <h6>Buổi</h6>

            <button
              type="button"
              onClick={handelSessionS}
              className={
                isButton === 'Sang'
                  ? 'buttonTrue btn btn-outline-secondary col-md-4'
                  : 'btn btn-outline-secondary  col-md-4'
              }
            >
              Sáng
            </button>
            <button
              type="button"
              onClick={handelSessionC}
              className={
                isButton === 'Chieu'
                  ? 'buttonTrue btn btn-outline-secondary col-md-4'
                  : 'btn btn-outline-secondary  col-md-4'
              }
            >
              Chiều
            </button>

            <button
              type="button"
              onClick={handelSessionAll}
              className={
                isButton === 'TatCa'
                  ? 'buttonTrue btn btn-outline-secondary col-md-4'
                  : 'btn btn-outline-secondary  col-md-4'
              }
            >
              Tất Cả
            </button>
          </div>

          <br />
          <div>
            <Button
              onClick={handleShow}
              style={{ borderRadius: '45px', height: '50px', backgroundColor: 'red' }}
              variant="contained"
              color="success"
            >
              <ControlPoint />
            </Button>
          </div>
        </div>

        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Chỉnh sửa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row container">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-row">
                  <div className="col-md-6">
                    <label>
                      <b>Tiết</b>
                    </label>
                    <select {...register('lession')} className="custom-select" required>
                      <option value="ALL"> Chọn Tiết--</option>
                      {lession?.map((item, index) => (
                        <option key={index} value={item.lession}>
                          {item.lession}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6">
                    <Input type="number" label="Tiết PPCT" name="lessionPPCT" required register={register} />
                  </div>
                </div>

                <div>
                  <Input type="text" label="Nội dung" name="subjectContent" required register={register} />
                </div>

                <div>
                  <Input type="text" label="Dặn dò" name="note" required register={register} />
                </div>
                <Button variant="danger" onClick={handleClose}>
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

        <Modal size="lg" show={showUpdate} onHide={handleCloseUpdate}>
          <Modal.Header closeButton>
            <Modal.Title>Chỉnh Sửa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="selectoption">
                    <b>Tiết</b>
                  </label>
                  <select
                    id="selectoption"
                    name="lession"
                    value={scheduleUpdate?.lession}
                    onChange={(e) => setScheduleUpdate({ ...scheduleUpdate, lession: e.target.value })}
                    className="form-control "
                    required
                  >
                    <option value={scheduleUpdate?.lession} selected>
                      {scheduleUpdate?.lession}
                    </option>
                    <option value="1">1</option>
                    <option value="2"> 2</option>
                    <option value="3"> 3</option>
                    <option value="4"> 4</option>
                    <option value="5"> 5</option>
                    <option value="6"> 6</option>
                    <option value="7"> 7</option>
                    <option value="8"> 8</option>
                    <option value="9"> 9</option>
                    <option value="10"> 10</option>
                  </select>
                </div>

                <div className="form-group col-md-6">
                  <lable htmlFor="ppct">
                    <b>Tiết PPCT</b>
                  </lable>
                  <input
                    id="ppct"
                    className=" form-control "
                    type="number"
                    label="Tiết PPCT"
                    name="lessionPPCT"
                    value={scheduleUpdate?.lessionPPCT}
                    onChange={(e) => setScheduleUpdate({ ...scheduleUpdate, lessionPPCT: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  <b>Nội dung</b>
                </label>
                <input
                  className="form-control"
                  label="Nội dung"
                  name="subjectContent"
                  value={scheduleUpdate?.subjectContent}
                  onChange={(e) => setScheduleUpdate({ ...scheduleUpdate, subjectContent: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>
                  <b>Dặn dò</b>
                </label>
                <input
                  className="form-control "
                  label="Dặn dò"
                  name="note"
                  value={scheduleUpdate?.note}
                  onChange={(e) => setScheduleUpdate({ ...scheduleUpdate, note: e.target.value })}
                />
              </div>
              <Button variant="danger" onClick={handleCloseUpdate}>
                Hủy bỏ
              </Button>
              <button className="btn btn-primary" onClick={(e) => handelSubmit(e)}>
                Save
              </button>
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Lecture;
