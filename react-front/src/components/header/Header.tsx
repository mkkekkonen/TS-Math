import React from 'react';

import Navbar from 'react-bootstrap/Navbar';

import { withTranslation, WithTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

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
        <Link to="/">
          <Navbar.Brand>{t(headerText)}</Navbar.Brand>
        </Link>
        {subheaderText && <Navbar.Text>{t(subheaderText)}</Navbar.Text>}
      </Navbar>
    );
  }
}

export const Header = withTranslation('header')(HeaderComponent);
