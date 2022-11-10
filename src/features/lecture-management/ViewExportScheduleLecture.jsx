import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import moment from 'moment/moment';
import { useRef } from 'react';
import { useDownloadExcel } from 'react-export-table-to-excel';

ViewExportScheduleLecture.propTypes = {};

function ViewExportScheduleLecture(props) {
  const scheduleExport = useSelector((state) => state.scheduleExport);
  const data = scheduleExport.newList;
  const [resSchedule, setResSchedule] = useState(data[0]);

  const tableRef = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Schedule',
    sheet: 'Schedule',
  });

  console.log('DATA[0]', resSchedule);

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

  return (
    <>
      <h3>VIEW TABLE EXCEL</h3>
      <button onClick={onDownload}> Export excel </button>

      <table className="table" ref={tableRef}>
        <thead style={{ textAlign: 'center' }}>
          <tr>
            <th colSpan={9} scope="col">
              LỊCH BÁO GIẢNG
            </th>
          </tr>

          <tr>
            <th colSpan={9} scope="col">
              TUẦN {resSchedule[0]?.dates.week}
            </th>
          </tr>

          <tr>
            <th scope="col">Thứ,ngày,tháng</th>
            <th scope="col">Buổi</th>
            <th scope="col">Môn</th>
            <th scope="col">Tiết TKB</th>
            <th scope="col">Lớp</th>
            <th scope="col">Tiết PPCT</th>
            <th scope="col">Nội dung dạy</th>
            <th scope="col">Ghi chú</th>
          </tr>
        </thead>
        <tbody>
          {resSchedule?.map((item, index) => (
            <tr key={index}>
              <th>
                {renderSwitch(moment(item?.dateStart).format('dddd'))} /{moment(item?.dateStart).format('DD/MM')}
              </th>
              <td>{item?.lession > 5 ? 'CHIỀUU' : 'SÁNG'}</td>
              <td>{item?.subject.subjectName}</td>
              <td>{item?.lession}</td>
              <td>{item?.clazz.nameClazz}</td>
              <td>{item?.lessionPPCT}</td>
              <td>{item?.subjectContent}</td>
              <td>{item?.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ViewExportScheduleLecture;
