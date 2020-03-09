import React, { ReactNode } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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

  }

  render() {
    const { header, nav, content, footer } = this.props;

    return (
      <Container>
        <Row>{header}</Row>
        <Row>
          <Col xs={2}>{nav}</Col>
          <Col>{content}</Col>
        </Row>
        <Row>{footer}</Row>
      </Container>
    );
  }
}
