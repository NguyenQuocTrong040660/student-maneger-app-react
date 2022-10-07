import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';

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
                  <Route path={'/home/check-vp-hoc-sinh/:keyID'} component={CheckStudent} />
                  <Route path={'/lecture-management'} component={Lecture} />
                  <Route path={'/view-export-schedule-lecture'} component={ViewExportScheduleLecture} />
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
