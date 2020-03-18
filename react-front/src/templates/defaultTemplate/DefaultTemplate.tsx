import React, { ReactNode } from 'react';
import styled from 'styled-components';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Header } from '../../components/header';
import { MathNav } from '../../components/nav';
import { Footer } from '../../components/footer';

import { categories, subcategories, pages } from '../../data';

const PaddedCol = styled(Col)`
  padding-top: 1rem;
`

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
    footer: <Footer />,
  }

  render() {
    const { header, nav, content, footer } = this.props;

    return (
      <Container fluid>
        {header}
        <Row>
          <Col sm={2}>{nav}</Col>
          <PaddedCol>{content}</PaddedCol>
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
