import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { useParams } from 'react-router-dom';
import clazzAPI from '../../api/clazzAPI';
import scheduleAPI from '../../api/scheduleAPI';
import scheduleEvalueDetailAPI from '../../api/scheduleEvalueDetailAPI';
ViewReportSDB.propTypes = {};

function ViewReportSDB(props) {
  const { week, clazz } = useParams();
  const [reportSDB, setReportSDB] = useState();
  const [detailSchedule, setDetailSchedule] = useState();
  const [clazzSelect, setClazzSelect] = useState();
  const { enqueueSnackbar } = useSnackbar();

  //BEGIN CALL API SDB
  useEffect(() => {
    getAllSDB();
  }, []);

  const getAllSDB = async () => {
    try {
      const rs = await scheduleAPI.reportSDB(week, clazz);
      setReportSDB(rs.data);
    } catch (error) {
      enqueueSnackbar('Lỗi call API get SDB!!', { variant: 'error' });
    }
  };
  //END CALL API SDB

  //BEGIN CALL API DETAIL EVALUE
  useEffect(() => {
    getAllDetailValue();
  }, []);

  const getAllDetailValue = async () => {
    try {
      const rs = await scheduleEvalueDetailAPI.getAll();
      setDetailSchedule(rs.data);
    } catch (error) {
      enqueueSnackbar('Lỗi call danh gia chi tiet-vi pham!!', { variant: 'error' });
    }
  };
  //END CALL API DETAIL EVALUE
  useEffect(() => {
    getClazzByID();
  }, []);

  const getClazzByID = async () => {
    try {
      const rs = await clazzAPI.getClazz(clazz);
      setClazzSelect(rs.data);
    } catch (error) {
      enqueueSnackbar('Lỗi call Clazz', { variant: 'error' });
    }
  };
  //END CALL API DETAIL EVALUE

  console.log(reportSDB);
  console.log(detailSchedule);
  function renderSwitch(param) {
    switch (param) {
      case 'Monday':
        return 'T2';
      case 'Tuesday':
        return 'T3';
      case 'Wednesday':
        return 'T4';
      case 'Thursday':
        return 'T5';
      case 'Friday':
        return 'T6';
      case 'Saturday':
        return 'T7';
      case 'Sunday':
        return 'CN';
      default:
        return '';
    }
  }

  const tableRef = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'SDB',
    sheet: 'SDB',
  });

  return (
    <>
      <h3>VIEW TABLE EXCEL SDB</h3>
      <button onClick={onDownload}> Export excel </button>

      <table className="table table-border" ref={tableRef}>
        <thead style={{ textAlign: 'center' }}>
          <tr>
            <th colSpan={12} scope="col">
              TUẦN HỌC THỨ {week} LỚP {clazzSelect?.nameClazz}
            </th>
          </tr>
          <tr>
            <th scope="col">Thứ,ngày,tháng</th>
            <th scope="col">Buổi</th>
            <th scope="col">Tiết TKB</th>
            <th scope="col">Môn học</th>
            <th scope="col">Tiết PPCT</th>
            <th scope="col">Đầu bài, chủ đề/nội dung công việc</th>
            <th scope="col">Nhận xét của giáo viên</th>

            <th scope="col">Nề nếp</th>
            <th scope="col">Vệ sinh</th>
            <th scope="col">Học tập</th>
            <th scope="col">Vi phạm</th>
            <th scope="col">Nhiệm vụ về nhà</th>
            <th scope="col">"GVBM kí tên "</th>
          </tr>
        </thead>
        <tbody>
          {reportSDB?.map((item, index) => (
            <tr key={index}>
              <td>
                {renderSwitch(moment(item?.entryDate).format('dddd'))} /{moment(item?.entryDate).format('DD/MM')}
              </td>
              <td>{item?.lession > 5 ? 'CHIỀUU' : 'SÁNG'}</td>
              <td>{item?.lession}</td>
              <td>{item?.subjectName}</td>
              <td>{item?.lessionPPCT}</td>
              <td>{item?.subjectContent}</td>
              <td>{item?.evaluateNote}</td>
              <td>{item?.mark1}</td>
              <td>{item?.mark2}</td>
              <td>{item?.mark3}</td>

              <td>
                {detailSchedule?.map((detail) => {
                  if (item.idEvalue === detail.scheduleEvaluate.id && detail.offence.status === false) {
                    return `- ${detail.studentName}:${detail?.offence.offenceName}`;
                  }
                })}
              </td>
              <td>{item?.homeWork}</td>
              <td>
                {item?.evaluateNote == null && item?.homeWork == null && item?.mark1 == null ? 'X' : item?.nameTeacher}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ViewReportSDB;
