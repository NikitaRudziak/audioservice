import React from 'react';

import { Header } from '../../components/Header';
import { MusicCardContainer } from '../../components/MusicCardContainer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export const App = (props) => {
  return (
    <div className="App">
      <Header />
      <MusicCardContainer />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    login: state.loginReducer.userID.login,
  }
}

// const mapDispatchToProps = dispatch => {
//   return {

//   }
// }
// export default App
export default withRouter(connect(mapStateToProps, null)(App));
