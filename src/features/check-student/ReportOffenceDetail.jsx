import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { InputLabel, Select } from '@mui/material';

import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import datesAPI from '../../api/datesAPI';
import StorageKey from '../../constant/storage-key';
import { useSnackbar } from 'notistack';
import clazzAPI from '../../api/clazzAPI';
import studentAPI from '../../api/studentAPI';
import { useRef } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import scheduleEvalueDetailAPI from '../../api/scheduleEvalueDetailAPI';
ReportOffenceDetail.propTypes = {};

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

function ReportOffenceDetail(props) {
  //Call API => save value
  const [weeks, setWeeks] = useState();

  //save value when click select Week
  const [weekSelect, setWeekSelect] = useState(10);

  const [studentsFirst, setStudentsFirst] = useState([]);
  const [students, setStudents] = useState([]);

  //MessAge
  const user = JSON.parse(localStorage.getItem(StorageKey.USER));
  const { enqueueSnackbar } = useSnackbar();
  const selectSize = useStyles();

  const [clazz, setClazz] = useState();
  const [clazzSelect, setClazzSelect] = useState('');
  const [evalueDetail, setEvalueDetail] = useState();

  const [reportSDB, setReportSDB] = useState();

  //Get Now day
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + '/' + mm + '/' + dd;

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
  }, []);

  const handleChangeWeek = (event) => {
    setWeekSelect(event.target.value);
  };
  //Begin handel filter Clazz
  const handelChangeClazz = async (e) => {
    const data = e.target.value;
    console.log(data);

    try {
      const rs = await studentAPI.getStudentByClazz(data);
      setStudents(rs.data);
      setStudentsFirst(rs.data);
    } catch (error) {
      enqueueSnackbar('Error Call API Student By Clazz!', { variant: 'error' });
    }
  };

  useEffect(() => {
    getAllOffenDetail();
  }, []);
  const getAllOffenDetail = async () => {
    try {
      const rs = await scheduleEvalueDetailAPI.getAll();
      setEvalueDetail(rs.data);
    } catch (error) {
      enqueueSnackbar('Error Call API Offence Detail!', { variant: 'error' });
    }
  };

  console.log('evalueDetail', evalueDetail);
  console.log('students', students);
  console.log('reportSDB', reportSDB);

  const tableRef = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'thong-ke-vi-pham',
    sheet: 'sheet1',
  });

  //Tính điểm tổng + -
  const count_mark_offence = (idstudent, weekSelect, evalueDetail) => {
    let sum = 100;
    evalueDetail.forEach((element) => {
      if (idstudent == element.student_id && element.scheduleEvaluate.schedule.dates.week == weekSelect) {
        sum = sum + element.offence.markOffence;
      }
    });
    return sum;
  };

  return (
    <>
      <div className="row container">
        <div className="col-md-12 container ">
          Thống kê chi tiết vi phạm của lớp giảng dạy
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
              <select onChange={handelChangeClazz} className="custom-select " required>
                <option>All</option>
                {clazz?.map((data) => (
                  <option value={data?.clazz.id}> {data?.clazz.nameClazz}</option>
                ))}
              </select>
            </div>

            <div className="col-md-3 btn">
              <span onClick={onDownload}>Export EXcel</span>
            </div>
          </div>
        </div>
        <div className="col-md-12">
          <table className="table " ref={tableRef}>
            <tr style={{ fontWeight: 'bold', textAlign: 'center' }}>
              <td colSpan={6}>THỐNG KÊ CHI TIẾT VI PHẠM CỦA HỌC SINH</td>
            </tr>
            <tr style={{ fontWeight: 'bold', textAlign: 'center' }}>
              <td colSpan={2}>LỚP : {clazzSelect}</td>
              <td colSpan={4}>TUAN : {weekSelect}</td>
            </tr>
            <tr style={{ fontWeight: 'bold', textAlign: 'center' }}>
              <td>STT</td>
              <td>HỌ VÀ TÊN</td>
              <td>NỘI DUNG ĐIỂM CỘNG</td>
              <td>NỘI DUNG ĐIỂM TRỪ</td>
              <td>TỔNG</td>
              <td>HẠNH KIỂM</td>
            </tr>

            {students?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.nameStudent}</td>
                  <td>
                    {evalueDetail?.map((evalue) => {
                      if (
                        item.id === evalue.student_id &&
                        evalue.offence.status === true &&
                        evalue.scheduleEvaluate.schedule.dates.week == weekSelect
                      ) {
                        return `${evalue?.offence.offenceName} (${evalue?.offence.markOffence}); `;
                      }
                    })}
                  </td>
                  <td>
                    {evalueDetail?.map((evalue) => {
                      if (
                        item.id === evalue.student_id &&
                        evalue.offence.status === false &&
                        evalue.scheduleEvaluate.schedule.dates.week == weekSelect
                      ) {
                        return `${evalue?.offence.offenceName} (${evalue?.offence.markOffence}); `;
                      }
                    })}
                  </td>
                  <td>{count_mark_offence(item?.id, weekSelect, evalueDetail)}</td>
                  <td>
                    {count_mark_offence(item?.id, weekSelect, evalueDetail) > 95
                      ? 'TỐT'
                      : count_mark_offence(item?.id, weekSelect, evalueDetail) > 80
                      ? 'KHÁ'
                      : 'TRUNG BÌNH'}
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
}

export default ReportOffenceDetail;
