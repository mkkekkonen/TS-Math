import React, { ReactNode } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Header } from '../../components/header';
import { MathNav } from '../../components/nav';

import { categories, subcategories, pages } from '../../data';

interface Props {
  header: ReactNode
  nav: ReactNode
  content: ReactNode
  footer: ReactNode
}

interface State {}

export class DefaultTemplate extends React.Component<Props, State> {
  static defaultProps = {
    header: <Header headerText="Math Visualized" />,
    nav: <MathNav />,
    content: <div>Hello world</div>,
    footer: <div>By: Maija Kekkonen 2020</div>
  }

  render() {
    const { header, nav, content, footer } = this.props;

    return (
      <Container>
        {header}
        <Row>
          <Col xs={3}>{nav}</Col>
          <Col>{content}</Col>
        </Row>
        <Row>
          <Col>
            {footer}
          </Col>
        </Row>
      </Container>
    );
  }
}
