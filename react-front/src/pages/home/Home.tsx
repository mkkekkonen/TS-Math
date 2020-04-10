import React from 'react';
import styled from 'styled-components';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import i18n from 'i18next';
import { withTranslation, WithTranslation } from 'react-i18next';

import { DefaultTemplate } from '../../templates';

import imgUrl from '../../images/graph.png';

const StyledImg = styled.img`
  max-width: 400px;
`

interface Props extends WithTranslation {}

interface State {}

class HomePageComponent extends React.Component<Props, State> {
  renderText = () => {
    if (i18n.language === 'fi') {
      return (
        <div>
          <h1>Matematiikan visualisointia</h1>
          <p>Tämä on web-sovellus, jonka tein matematiikan opiskelua varten. Kehitys jatkuu.</p>
        </div>
      );
    }

    return (
      <div>
        <h1>Math Visualized</h1>
        <p>This is a web app I wrote as an attempt to teach myself math. Work in progress.</p>
      </div>
    );
  }

  renderContent = () => {
    return (
      <Container fluid>
        <Row>
          <Col>
            {this.renderText()}
          </Col>
          <Col>
            <StyledImg src={imgUrl} />
          </Col>
        </Row>
      </Container>
    );
  }

  render() {
    return (
      <DefaultTemplate
        content={this.renderContent()}
      />
    );
  }
}

export const HomePage = withTranslation()(HomePageComponent);
