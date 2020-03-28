import React from 'react';
import styled from 'styled-components';

import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const FooterContainer = styled.div`
  padding: 1rem;
`

interface Props {}

interface State {}

export class Footer extends React.Component<Props, State> {
  render() {
    return (
      <FooterContainer>
        <p>By Maija Kekkonen 2020</p>

        <a href="https://github.com/mkkekkonen/TS-Math" target="_blank">
          <Button variant="dark">
            <FontAwesomeIcon icon={faGithub} />
            &nbsp;
            View source in GitHub
          </Button>
        </a>
      </FooterContainer>
    );
  }
}
