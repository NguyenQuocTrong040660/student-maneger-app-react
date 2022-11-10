import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import StorageKey from '../../constant/storage-key';
import userApi from '../../api/userApi';
import { useSnackbar } from 'notistack';
Slider.propTypes = {};

function Slider(props) {
  const { enqueueSnackbar } = useSnackbar();
  const user = JSON.parse(localStorage.getItem(StorageKey.USER));
  const id = user.id;

  const history = useHistory();
  const CheckRoleAdmin = async () => {
    try {
      const check = await userApi.checkRoleAdmin();
      history.push('/admin/clazzs');
    } catch (error) {
      enqueueSnackbar('Chức năng dành cho Admin!', { variant: 'error' });
      history.push('/home/');
    }
  };

  const CheckRoleAdminTeacher = async () => {
    try {
      const check = await userApi.checkRoleAdmin();
      history.push('/admin/teachers');
    } catch (error) {
      enqueueSnackbar('Chức năng dành cho Admin!', { variant: 'error' });
      history.push('/home/');
    }
  };

  const CheckRoleAdminStudent = async () => {
    try {
      const check = await userApi.checkRoleAdmin();
      history.push('/admin/students');
    } catch (error) {
      enqueueSnackbar('Chức năng dành cho Admin!', { variant: 'error' });
      history.push('/home/');
    }
  };

  const CheckRoleAdminClazzTeacher = async () => {
    try {
      const check = await userApi.checkRoleAdmin();
      history.push('/admin/clazzs-teachers-roles');
    } catch (error) {
      enqueueSnackbar('Chức năng dành cho Admin!', { variant: 'error' });
      history.push('/home/');
    }
  };

  return (
    <>
      {/* Sidebar */}
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
        {/* Sidebar - Brand */}
        <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink" />
          </div>
          <div className="sidebar-brand-text mx-3">CMS Student Management</div>
        </a>
        {/* Divider */}
        <hr className="sidebar-divider my-0" />
        {/* Nav Item - Dashboard */}
        <li className="nav-item active">
          <Link to="/home/body" className="nav-link" href="index.html">
            <i className="fas fa-fw fa-tachometer-alt" />
            <span>Dashboard</span>
          </Link>
        </li>
        {/* Divider */}
        <hr className="sidebar-divider" />
        {/* Heading */}
        <div className="sidebar-heading">Interface</div>
        {/* Nav Item - Pages Collapse Menu */}
        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            to={'/home'}
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <i className="fas fa-fw fa-cog" />
            <span>Danh Mục</span>
          </Link>
          <div
            id="collapseTwo"
            className="collapse active"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Custom Components:</h6>
              <Link to="/home/students" className="collapse-item">
                Học Sinh
              </Link>
              <a className="collapse-item" href="cards.html"></a>
            </div>
          </div>
        </li>

        {/*Chức Năng Begin */}
        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            to={'/home'}
            data-toggle="collapse"
            data-target="#collapseTwo1"
            aria-expanded="true"
            aria-controls="collapseTwo1"
          >
            <i className="fas fa-fw fa-cog" />
            <span>Chức Năng</span>
          </Link>
          <div id="collapseTwo1" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Custom Components:</h6>
              <Link to={`/home/check-vp-hoc-sinh/${id}`} className="collapse-item">
                Check VP Học Sinh
              </Link>
              <Link to="/home/lecture-management" className="collapse-item">
                Quản Lý Báo Giảng
              </Link>
              <Link to="/home/mark-management" className="collapse-item">
                Quản Lý Điểm
              </Link>
            </div>
          </div>
        </li>
        {/*Chức Năng End */}

        {/*Chức Năng Begin */}
        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            to={'/home'}
            data-toggle="collapse"
            data-target="#collapseTwo2"
            aria-expanded="true"
            aria-controls="collapseTwo2"
          >
            <i className="fas fa-fw fa-cog" />
            <span>Báo cáo</span>
          </Link>
          <div id="collapseTwo2" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
            <div className="bg-white py-2 collapse-inner rounded">
              <h6 className="collapse-header">Custom Components:</h6>
              <Link to={`/home/report-offence-detail`} className="collapse-item">
                Thống kê vi phạm
              </Link>
            </div>
          </div>
        </li>
        {/*Chức Năng End */}

        <hr className="sidebar-divider" />
        {/* Heading */}
        <div className="" style={{ border: '1px solid white' }}>
          Chức năng quản trị
          {/* Nav Item - ADMIN */}
          <li className="nav-item">
            <Link className="nav-link" to="#">
              <i className="fas fa-regular fa-graduation-cap" />
              <span onClick={CheckRoleAdmin}>QUẢN LÝ LỚP HỌC</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">
              <i className="fas fa-regular fa-graduation-cap" />
              <span onClick={CheckRoleAdminTeacher}>QUẢN LÝ GIÁO VIÊN</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">
              <i className="fas fa-fw fa-chart-area" />
              <span onClick={CheckRoleAdminStudent}>QUẢN LÝ HỌC SINH</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">
              <i className="fas fa-fw fa-chart-area" />
              <span onClick={CheckRoleAdminClazzTeacher}>QUẢN LÝ PHỤ TRÁCH</span>
            </Link>
          </li>
          {/* Nav Item - Tables */}
          <li className="nav-item">
            <a className="nav-link" href="tables.html">
              <i className="fas fa-fw fa-table" />
              <span>Tables</span>
            </a>
          </li>
          {/* Divider */}
        </div>
        <hr className="sidebar-divider d-none d-md-block" />
        {/* Sidebar Toggler (Sidebar) */}
        <div className="text-center d-none d-md-inline">
          <button className="rounded-circle border-0" id="sidebarToggle" />
        </div>
        {/* Sidebar Message */}
        <div className="sidebar-card d-none d-lg-flex">
          <img className="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="..." />
          <p className="text-center mb-2">
            <strong>SB Admin Pro</strong> is packed with premium features, components, and more!
          </p>
          <a className="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">
            Upgrade to Pro!
          </a>
        </div>
      </ul>
    </>
  );
}

export default Slider;
