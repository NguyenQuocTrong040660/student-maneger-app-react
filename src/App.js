import { BrowserRouter, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

import Slider from './components/playout/Slider';
import Header from './components/playout/Header';
import Footer from './components/playout/Footer';
import Body from './components/playout/Body';
import StorageKey from './constant/storage-key';
import Students from './components/students/Students';
import CheckStudent from './features/check-student/CheckStudent';
import { SnackbarProvider } from 'notistack';
import Lecture from './features/lecture-management/Lecture';
import ViewExportScheduleLecture from './features/lecture-management/ViewExportScheduleLecture';
import AdminStudent from './features/admin/student/AdminStudent';
import Teacher from './features/admin/teacher/Teacher';
import StudentManagement from './features/admin/students/StudentManagement';
import TeacherClazz from './features/admin/clazzTeacher/TeacherClazz';
import LectureDetails from './features/lecture-management/LectureDetails';
import CheckStudentLectureDetail from './features/check-student/CheckStudentLectureDetail';
import MarkManagement from './features/mark/MarkManagement';
function App() {
  const history = useHistory();
  const name = localStorage.getItem(StorageKey.TOKEN);

  if (name != null) {
    return (
      <BrowserRouter>
        <SnackbarProvider maxSnack={1} anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
          <div id="wrapper">
            <Slider />
            <div id="content-wrapper" class="d-flex flex-column">
              <div id="content">
                <Header />

                <Switch>
                  <Route path="/home/body" component={Body} />
                  <Route path="/home/students" component={Students} forceRefresh={true} />
                  /home/check-vp-hoc-sinh
                  <Route path={'/home/check-vp-hoc-sinh/:keyID'} component={CheckStudent} exact />
                  <Route path={'/home/lecture-management'} component={Lecture} exact />
                  <Route path={'/home/lecture-management/:idLecture'} exact component={LectureDetails} />
                  <Route
                    path={'/home/lecture-management/check-student/:idLecture/:id'}
                    exact
                    component={CheckStudentLectureDetail}
                  />
                  <Route path={'/home/mark-management'} exact component={MarkManagement} />
                  <Route path={'/view-export-schedule-lecture'} component={ViewExportScheduleLecture} />
                  <Route path={'/admin/clazzs'} component={AdminStudent} exact />
                  <Route path={'/admin/teachers'} component={Teacher} exact />
                  <Route path={'/admin/students'} component={StudentManagement} exact />
                  <Route path={'/admin/clazzs-teachers-roles'} component={TeacherClazz} exact />
                </Switch>
              </div>
              <Footer />
            </div>
          </div>
        </SnackbarProvider>
      </BrowserRouter>
    );
  } else {
    history.push('/login');
  }
}

export default App;
