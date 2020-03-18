import React from 'react';

import Navbar from 'react-bootstrap/Navbar';

interface Props {
  headerText: string
  subheaderText?: string
}

interface State {}

export class Header extends React.Component<Props, State> {
  render() {
    const { headerText, subheaderText } = this.props;

    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>{headerText}</Navbar.Brand>
        {subheaderText && <Navbar.Text>{subheaderText}</Navbar.Text>}
      </Navbar>
    );
  }
}
