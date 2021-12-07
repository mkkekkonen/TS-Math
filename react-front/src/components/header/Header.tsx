import React from 'react';
import styled from 'styled-components';

import Navbar from 'react-bootstrap/Navbar';

import i18n from 'i18next';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import fiImgUrl from '../../images/fi.png';
import enImgUrl from '../../images/us.png';

type Language = 'fi' | 'en';

const StyledImg = styled.img`
  cursor: pointer;
  margin: 0 0.5rem;
`

const changeLanguage = (lng: Language) => {
  i18n.changeLanguage(lng);
};

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

        <Navbar.Text>
          <StyledImg
            src={enImgUrl}
            width="32"
            onClick={() => changeLanguage('en')}
          />
        </Navbar.Text>

        <Navbar.Text>
          <StyledImg
            src={fiImgUrl}
            width="32"
            onClick={() => changeLanguage('fi')}
          />
        </Navbar.Text>
      </Navbar>
    );
  }
}

export const Header = withTranslation('header')(HeaderComponent);
