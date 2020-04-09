import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ReactMarkdown from 'react-markdown';

import { DefaultTemplate } from '../../templates';

interface Props {}

interface State {
  markdown: string
}

export class SourcesPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { markdown: '' };
  }

  componentDidMount() {
    this.loadContent();
  }

  loadContent = async () => {
    await import('../../md/sources.md');
    const res = await fetch('md/sources.md');
    const markdown = await res.text();

    this.setState({ markdown });
  }

  renderContent = () => {
    const { markdown } = this.state;

    return (
      <Container>
        <Row>
          <Col md={6}>
            <ReactMarkdown source={markdown} />
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
