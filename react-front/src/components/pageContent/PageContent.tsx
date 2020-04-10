import React, { Fragment } from 'react';
import styled from 'styled-components';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ReactMarkdown from 'react-markdown/with-html';
import RemarkMathPlugin from 'remark-math';
import { InlineMath, BlockMath } from 'react-katex';

import { last } from 'lodash';

import { entryPoints } from 'ts-math';

import { CodeBlock } from './CodeBlock';

const ContentContainer = styled.div`
  @media only screen and (min-width: 1570px) {
    max-width: 700px;
  }
`;

interface Props {
  baseFileName: string
  t: Function
  language: string
}

interface State {
  markdown: string
}

export class PageContent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { markdown: '' };
  }

  componentDidMount() {
    this.loadContent();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.baseFileName !== prevProps.baseFileName
        || this.props.language !== prevProps.language) {
      this.loadContent();
    }
  }

  loadContent = async () => {
    const { baseFileName, language } = this.props;

    await import(`../../md/${baseFileName}_${language}.md`);
    const res = await fetch(`md/${baseFileName}_${language}.md`);
    const markdown = await res.text();

    this.setState({ markdown: markdown });

    const urlTitle = last(baseFileName.split('_'));
    entryPoints[urlTitle]();
  }

  render() {
    const { markdown } = this.state;

    return (
      <Fragment>
        <Container fluid>
          <Row>
            <Col>
              <ContentContainer>
                <ReactMarkdown
                  source={markdown}
                  escapeHtml={false}
                  plugins={[
                    RemarkMathPlugin,
                  ]}
                  renderers={{
                    inlineMath: (props: { value: string }) => (
                      <InlineMath>{props.value}</InlineMath>
                    ),
                    math: (props: { value: string}) => (
                      <BlockMath>{props.value}</BlockMath>
                    ),
                    code: CodeBlock,
                  }}
                />
              </ContentContainer>
            </Col>
            <Col>
              <div id="canvasContainer" />
              <div id="output" />
            </Col>
          </Row>
        </Container>
      </Fragment>
    )
  }
}
