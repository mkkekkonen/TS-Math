import React, { ReactNode } from 'react';
import styled from 'styled-components';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Header } from '../../components/header';
import { MathNav } from '../../components/nav';
import { Footer } from '../../components/footer';

const FlexRow = styled.div`
  display: flex;
  @media only screen and (max-width: 913px) {
    flex-wrap: wrap;
  }
`;

const FixedNavCol = styled.div`
  padding-left: 15px;
  @media only screen and (min-width: 914px) {
    width: 15rem;
  }
  @media only screen and (max-width: 913px) {
    max-height: 300px;
    overflow-y: scroll;
    padding-right: 15px;
    width: 100%;
  }
`;

const ContentWrapper = styled.div`
  padding: 1rem;
  @media only screen and (min-width: 914px) {
    max-width: calc(100% - 15rem);
  }
`;

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
        <FlexRow>
          <FixedNavCol>{nav}</FixedNavCol>
          <ContentWrapper>{content}</ContentWrapper>
        </FlexRow>
        <Row>
          <Col>
            {footer}
          </Col>
        </Row>
      </Container>
    );
  }
}
