import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ReactMarkdown from 'react-markdown';

import { DefaultTemplate } from '../../templates';

interface Props {
  t: Function
  language: string
}

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

  componentDidUpdate(prevProps: Props) {
    if (this.props.language !== prevProps.language) {
      this.loadContent();
    }
  }

  loadContent = async () => {
    const { language } = this.props;

    await import(`../../md/sources_${language}.md`);
    const res = await fetch(`md/sources_${language}.md`);
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
