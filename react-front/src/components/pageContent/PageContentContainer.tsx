import React from 'react';

import i18n from 'i18next';
import { withTranslation, WithTranslation } from 'react-i18next';

import { PageContent } from './PageContent';

interface Props extends WithTranslation {
  baseFileName: string
}

interface State {}

class PageContentContainerComponent extends React.Component<Props, State> {
  render() {
    const { t, baseFileName } = this.props;

    return (
      <PageContent
        baseFileName={baseFileName}
        t={t}
        language={i18n.language}
      />
    );
  }
}

export default withTranslation()(PageContentContainerComponent);
