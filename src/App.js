import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';

import Slider from './components/playout/Slider';
import Header from './components/playout/Header';
import Footer from './components/playout/Footer';
import Body from './components/playout/Body';
import StorageKey from './constant/storage-key';
import Students from './components/students/Students';
import CheckStudent from './features/check-student/CheckStudent';
function App() {
  const history = useHistory();
  const name = localStorage.getItem(StorageKey.TOKEN);
  if (name != null) {
    return (
      <BrowserRouter>
        <div id="wrapper">
          <Slider />
          <div id="content-wrapper" class="d-flex flex-column">
            <div id="content">
              <Header />
              <Switch>
                <Route path="/home/body" component={Body} />
                <Route path="/home/students" component={Students} />
                /home/check-vp-hoc-sinh
                <Route path="/home/check-vp-hoc-sinh" component={CheckStudent} />
              </Switch>

              <Footer />
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  } else {
    history.push('/login');
  }
}

export default App;
