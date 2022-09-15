import React from 'react';
import Slider from '../components/playout/Slider';
import Header from '../components/playout/Header';
import Footer from '../components/playout/Footer';
import StorageKey from '../constant/storage-key';
import { useHistory } from 'react-router-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Body from '../components/playout/Body';
function Home() {
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
                <Route path="/body" component={Body} />
                <Route path="/footer" component={Footer} />
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

export default Home;
