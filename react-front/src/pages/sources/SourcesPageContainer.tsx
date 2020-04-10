import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import i18n from 'i18next';
import { withTranslation, WithTranslation } from 'react-i18next';

import { SourcesPage } from './Sources';

import { loadData } from '../../store/actions/data';

interface Props extends WithTranslation {
  loadData: Function
}

interface State {}

class SourcesPageContainer extends React.Component<Props, State> {
  componentDidMount() {
    const { loadData } = this.props;
    loadData();
  }

  render() {
    const { t } = this.props;

    return (
      <SourcesPage
        t={t}
        language={i18n.language}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  loadData: () => dispatch(loadData()),
});

export default compose(
  withTranslation(),
  connect(null, mapDispatchToProps),
)(SourcesPageContainer);
