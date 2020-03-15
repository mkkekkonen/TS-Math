import React, { Fragment } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ReactMarkdown from 'react-markdown/with-html';
import RemarkMathPlugin from 'remark-math';
import { InlineMath, BlockMath } from 'react-katex';

import { last } from 'lodash';

import { entryPoints } from 'ts-math';

import { CodeBlock } from './CodeBlock';

interface Props {
  baseFileName: string
}

interface State {
  markdown: string
}

export class PageContent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { markdown: '' };
  }

  async componentDidMount() {
    const { baseFileName } = this.props;

    await import(`../../md/${baseFileName}.md`);
    const res = await fetch(`md/${baseFileName}.md`);
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
              <ReactMarkdown
                source={markdown}
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
