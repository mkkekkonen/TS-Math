import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { DefaultTemplate } from '../../templates';

import imgUrl from '../../images/graph.png';

interface Props {}

interface State {}

export class HomePage extends React.Component<Props, State> {
  renderContent = () => {
    return (
      <Container>
        <Row>
          <Col>
            <h1>Math Visualized</h1>
            <p>This is a web app I wrote as an attempt to teach myself math. Work in progress.</p>
          </Col>
          <Col>
            <img src={imgUrl} />
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
