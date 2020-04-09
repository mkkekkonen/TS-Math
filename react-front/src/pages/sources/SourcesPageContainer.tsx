import React from 'react';
import { connect } from 'react-redux';

import { SourcesPage } from './Sources';

import { loadData } from '../../store/actions/data';

interface Props {
  loadData: Function
}

interface State {}

class SourcesPageContainer extends React.Component<Props, State> {
  componentDidMount() {
    const { loadData } = this.props;
    loadData();
  }

  render() {
    return <SourcesPage />;
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  loadData: () => dispatch(loadData()),
});

export default connect(null, mapDispatchToProps)(SourcesPageContainer);
