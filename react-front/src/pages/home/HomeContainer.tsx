import React from 'react';

import { HomePage } from './Home';

import { categoryApi } from '../../services/api';

interface Props {}

interface State {}

export class HomePageContainer extends React.Component<Props, State> {
  componentDidMount() {
    categoryApi.getAllCategories();
  }

  render() {
    return (
      <HomePage />
    );
  }
}
