import React, { useState } from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ControlPoint } from '@material-ui/icons';
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

import AddIcon from '@mui/icons-material/Add';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/students/components/Input/Inputs';

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
  //MessAge

  const { enqueueSnackbar } = useSnackbar();
  const selectSize = useStyles();
  //Form
  const { register, handleSubmit } = useForm();

  //get Curentdate to callAPI =>get Week
  const [dates, setDates] = useState([]);

  const [subject, setSubject] = useState();

  const [clazz, setClazz] = useState();

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

  const user = JSON.parse(localStorage.getItem(StorageKey.USER));

  const [age, setAge] = React.useState('');

  //Model
  const [show, setShow] = useState(false);

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
    getSubject();
  }, []);

  const getSubject = async () => {
    try {
      const response = await subjectAPI.getAll();
      setSubject(response.data);
    } catch (e) {
      enqueueSnackbar('Vui lòng chọn tuần!', { variant: 'error' });
    }
  };

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

  console.log(dates);
  console.log('WEEK', weekSelect);
  console.log('DATESSSS', dates);
  console.log('CLAZZ', clazz);
  console.log('CLAZZSELECT', clazzSelect);
  console.log('Subject', subject);
  console.log('SubjectSELECT', subjectSlect);

  const handleChangeWeek = (event) => {
    setWeekSelect(event.target.value);
    setDateSelect(''); //set date emty
    setIsButtonDate(''); //set date emty
  };

  const handleChangeClazz = (event) => {
    setClazzSelect(event.target.value);
  };

  const handleChangeSubject = (event) => {
    setSubjectSlect(event.target.value);
  };

  //Handel When Click Choose Date
  const handelClickDate = (item, index) => {
    setDateSelect(item.entryDate);
    setIsButtonDate(index);
  };

  //Set even State Color Buton Sang-Chieu-Tatca

  const handelSessionS = () => {
    setLession([{ lession: 1 }, { lession: 2 }, { lession: 3 }, { lession: 4 }, { lession: 5 }]);
    setIsButton('Sang');
  };

  const handelSessionC = () => {
    setLession([{ lession: 6 }, { lession: 7 }, { lession: 8 }, { lession: 9 }, { lession: 10 }]);
    setIsButton('Chieu');
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
  const handleShow = (e) => {
    if (lession === undefined) {
      enqueueSnackbar('Chọn buổi trước!', { variant: 'error' });
      setShow(false);
    } else if (dateSelect === '') {
      enqueueSnackbar('Chọn ngày trước!', { variant: 'error' });
      setShow(false);
    } else if (subjectSlect === '') {
      enqueueSnackbar('Chọn môn trước!', { variant: 'error' });
      setShow(false);
    } else if (clazzSelect === '') {
      enqueueSnackbar('Chọn lớp trước!', { variant: 'error' });
      setShow(false);
    } else if (clazzSelect !== '' && subjectSlect !== '' && dateSelect !== '' && lession !== undefined) {
      setShow(true);
    }
  };

  console.log(dateSelect);

  //modal submit
  const handelModalLession = (event) => {
    setLessionSelect(event.target.value);
  };

  //form Modal
  const onSubmit = (data) => {
    console.log(data);
  };

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
          </div>
          <br></br>

          {/* Begin Table */}
          <div class="card shadow mb-4">
            <div class="card-header py-3">
              <h6 class="m-0 font-weight-bold text-primary">DANH SÁCH HỌC SINH </h6>
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
                  {/* {students.map((item, index) => (
                    <tr key={item.id} onClick={(e) => handelClickStudent(item.id)}>
                      <td>{index + 1}</td>
                      <td>{`HS${item.id}`}</td>
                      <td>{item.nameStudent}</td>
                      <td>{item.address}</td>
                      <td>{item.gender ? 'Nam' : 'Nữ'}</td>
                      <td>{item.phone}</td>
                    </tr>
                  ))} */}

                  <tr>
                    <td>1</td>
                    <td>HS01</td>
                    <td>HS01</td>
                    <td>HS01</td>
                    <td>Nam</td>
                    <td>Nu</td>
                  </tr>
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

            <Button variant="contained" style={{ borderRadius: '45px', marginRight: '5px' }}>
              Xuất Báo Giảng
            </Button>
            <Button variant="contained" style={{ borderRadius: '45px' }} color="error">
              Xuất Sổ ĐB
            </Button>
          </div>

          <br />
          <br />
          <div className="container-fuild" style={{ width: '100%', height: '200px', backgroundColor: 'white' }}>
            <h6>Chọn Ngày</h6>

            {dates.map((item, index) => (
              <button
                className={isButtonDate === index ? 'buttonTrue btn' : 'btn'}
                key={index}
                onClick={(e) => {
                  handelClickDate(item, index);
                }}
                size="small"
                style={{ borderRadius: '45px', margin: '5px' }}
              >
                {item.nameDay} {moment(item.entryDate).format('MM/DD')}
              </button>
            ))}
          </div>

          <br />
          <div style={{ width: '100%', height: 'auto', backgroundColor: 'white' }}>
            <h6>Buổi</h6>

            <button
              type="button"
              onClick={handelSessionS}
              className={isButton === 'Sang' ? 'buttonTrue btn col-md-4' : 'btn  col-md-4'}
            >
              Sáng
            </button>
            <button
              type="button"
              onClick={handelSessionC}
              className={isButton === 'Chieu' ? 'buttonTrue btn col-md-4' : 'btn  col-md-4'}
            >
              Chiều
            </button>

            <button
              type="button"
              onClick={handelSessionAll}
              className={isButton === 'TatCa' ? 'buttonTrue btn col-md-4' : 'btn  col-md-4'}
            >
              Tất Cả
            </button>
          </div>

          <br />
          <div style={{ width: '100%', height: 'auto', backgroundColor: 'white' }}>
            <Button onClick={handleShow} style={{ borderRadius: '45px' }} variant="contained" color="success">
              <ControlPoint />
            </Button>
          </div>
        </div>

        <Modal size="lg" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
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
      </div>
    </>
  );
}

export default Lecture;
