import React from 'react';
import { connect } from 'react-redux';

import { HomePage } from './Home';

import { loadData } from '../../store/actions/data';

interface Props {
  loadData: Function
}

interface State {}

class HomePageContainer extends React.Component<Props, State> {
  componentDidMount() {
    const { loadData } = this.props;
    loadData();
  }

  render() {
    return <HomePage />;
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  loadData: () => dispatch(loadData()),
});

export default connect(null, mapDispatchToProps)(HomePageContainer);
