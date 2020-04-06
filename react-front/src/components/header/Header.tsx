import React from 'react';

import Navbar from 'react-bootstrap/Navbar';

import { withTranslation, WithTranslation } from 'react-i18next';

interface Props extends WithTranslation {
  headerText: string
  subheaderText?: string
}

interface State {}

class HeaderComponent extends React.Component<Props, State> {
  render() {
    const { headerText, subheaderText, t } = this.props;

    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>{t(headerText)}</Navbar.Brand>
        {subheaderText && <Navbar.Text>{subheaderText}</Navbar.Text>}
      </Navbar>
    );
  }
}

export const Header = withTranslation()(HeaderComponent);
