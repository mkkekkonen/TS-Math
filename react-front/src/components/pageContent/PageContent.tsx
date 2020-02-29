import React, { Fragment } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ReactMarkdown from 'react-markdown';

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

    await import(`../../mathScripts/vendors.js`);
    await import(`file-loader?name=mathScripts/[name].[ext]!../../mathScripts/${baseFileName}.js`);

    await import(`../../md/${baseFileName}.md`);
    const res = await fetch(`md/${baseFileName}.md`);
    const markdown = await res.text();
    this.setState({ markdown: markdown });
  }

  render() {
    const { baseFileName } = this.props;
    const { markdown } = this.state;

    return (
      <Fragment>
        <Container>
          <Row>
            <Col>
              <ReactMarkdown source={markdown} />
            </Col>
            <Col>
              <div id="canvasContainer" />
            </Col>
          </Row>
        </Container>

        {/* <script src="/mathScripts/vendors.js" />
        <script src={`/mathScripts/${baseFileName}.js`} /> */}
      </Fragment>
    )
  }
}
