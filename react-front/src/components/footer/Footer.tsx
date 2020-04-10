import React from 'react';
import styled from 'styled-components';

import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { withTranslation, WithTranslation } from 'react-i18next';

const FooterContainer = styled.div`
  padding: 1rem;
`

interface Props extends WithTranslation {}

interface State {}

class FooterComponent extends React.Component<Props, State> {
  render() {
    const { t } = this.props;

    return (
      <FooterContainer>
        <p>{t('By Maija Kekkonen 2020')}</p>

        <a href="https://github.com/mkkekkonen/TS-Math" target="_blank">
          <Button variant="dark">
            <FontAwesomeIcon icon={faGithub} />
            &nbsp;
            {t('View source in GitHub')}
          </Button>
        </a>
      </FooterContainer>
    );
  }
}

export const Footer = withTranslation('footer')(FooterComponent);
