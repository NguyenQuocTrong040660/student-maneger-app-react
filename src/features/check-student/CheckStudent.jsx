import React from 'react';
import PropTypes from 'prop-types';
import './CheckStudent.css';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
CheckStudent.propTypes = {};

function CheckStudent(props) {
  return (
    <>
      <div className="row container">
        <div className="col-md-3">
          <select className="custom-select" required>
            <option> Chọn Lớp --</option>
            <option value="class"> 1</option>
            <option value="class"> 2</option>
            <option value="class"> 3</option>
          </select>
        </div>

        <div className="col-md-3">
          <input className="form-control" type="text" placeholder="Tìm học sinh" />
        </div>

        <div className="col-md-3">
          <input className="form-control " type="text" placeholder="Tìm nội dung" />
        </div>

        <div className="col-md-3">
          <select className="custom-select" required>
            <option> Chose --</option>
            <option value="class"> Tất cả</option>
            <option value="class"> Điểm cộng</option>
            <option value="class"> Điểm trừ</option>
          </select>
        </div>
      </div>
      <br></br>
      {/*Table 1 */}
      <div className="row container">
        <div className="col-md-3 container  ">
          {/* main table */}
          <div className="card shadow mb-4">
            <div className="card-header py-3 titleTable">
              <h6 className="m-0 font-weight-bold ">DANH SÁCH HỌC SINH</h6>
            </div>
            <div className="table-responsive scrol-Table">
              <table className="table table-hover" id="dataTable" width="100%" cellspacing="0">
                <thead>
                  <tr>
                    <th>TÊN HS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> Da duyet</td>
                  </tr>

                  <tr>
                    <td>Action</td>
                  </tr>

                  <tr>
                    <td>Action</td>
                  </tr>
                  <tr>
                    <td>Action</td>
                  </tr>
                  <tr>
                    <td>Action</td>
                  </tr>
                  <tr>
                    <td>Action</td>
                  </tr>
                  <tr>
                    <td>Action</td>
                  </tr>

                  <tr>
                    <td>Action</td>
                  </tr>
                  <tr>
                    <td>Action</td>
                  </tr>
                  <tr>
                    <td>Action</td>
                  </tr>
                  <tr>
                    <td>Action</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/*  Table 2*/}
        <div className="col-md-5 container  ">
          {/* Begin Table */}
          <div className="card shadow mb-4">
            <div className="card-header py-3 titleTable">
              <h6 className="m-0 font-weight-bold">ĐÁNH GIÁ</h6>
            </div>
            <div className="table-responsive scrol-Table">
              <table className="table table-hover" id="dataTable" width="100%" cellspacing="0">
                <thead>
                  <tr>
                    <th>TÊN HS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> Da duyet</td>
                  </tr>

                  <tr>
                    <td>Action</td>
                  </tr>

                  <tr>
                    <td>Action</td>
                  </tr>
                  <tr>
                    <td>Action</td>
                  </tr>
                  <tr>
                    <td>Action</td>
                  </tr>
                  <tr>
                    <td>Action</td>
                  </tr>
                  <tr>
                    <td>Action</td>
                  </tr>

                  <tr>
                    <td>Action</td>
                  </tr>
                  <tr>
                    <td>Action</td>
                  </tr>
                  <tr>
                    <td>Action</td>
                  </tr>
                  <tr>
                    <td>Action</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/*  Table 3*/}
        <div className="col-md-4 container  ">
          <div class="card shadow mb-4">
            <div class="card-header py-3 titleTable">
              <h6 class="m-0 font-weight-bold ">NỘI DUNG</h6>
            </div>
            <div className="table-responsive scrol-Table">
              <table className="table table-hover" id="dataTable" width="100%" cellspacing="0">
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>MÃ HS</th>
                    <th>TÊN HS</th>
                    <th>ĐỊA CHỈ</th>
                    <th>SĐT</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> 1</td>
                    <td>#BC$</td>
                    <td> Da duyet</td>
                    <td>20000</td>
                    <td>Action</td>
                  </tr>

                  <tr>
                    <td> 2</td>
                    <td>#BC$</td>
                    <td> Da duyet</td>
                    <td>20000</td>
                    <td>Action</td>
                  </tr>

                  <tr>
                    <td> 3</td>
                    <td>#BC$</td>
                    <td> Da duyet</td>
                    <td>20000</td>
                    <td>Action</td>
                  </tr>
                  <tr>
                    <td> 3</td>
                    <td>#BC$</td>
                    <td> Da duyet</td>
                    <td>20000</td>
                    <td>Action</td>
                  </tr>
                  <tr>
                    <td> 3</td>
                    <td>#BC$</td>
                    <td> Da duyet</td>
                    <td>20000</td>
                    <td>Action</td>
                  </tr>
                  <tr>
                    <td> 3</td>
                    <td>#BC$</td>
                    <td> Da duyet</td>
                    <td>20000</td>
                    <td>Action</td>
                  </tr>
                  <tr>
                    <td> 3</td>
                    <td>#BC$</td>
                    <td> Da duyet</td>
                    <td>20000</td>
                    <td>Action</td>
                  </tr>

                  <tr>
                    <td> 3</td>
                    <td>#BC$</td>
                    <td> Da duyet</td>
                    <td>20000</td>
                    <td>Action</td>
                  </tr>
                  <tr>
                    <td> 9</td>
                    <td>#BC$</td>
                    <td> Da duyet</td>
                    <td>20000</td>
                    <td>Action</td>
                  </tr>
                  <tr>
                    <td> 9</td>
                    <td>#BC$</td>
                    <td> Da duyet</td>
                    <td>20000</td>
                    <td>Action</td>
                  </tr>
                  <tr>
                    <td> 9</td>
                    <td>#BC$</td>
                    <td> Da duyet</td>
                    <td>20000</td>
                    <td>Action</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckStudent;
