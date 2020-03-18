import React from 'react';
import styled from 'styled-components';

import Immutable from 'immutable';

import { DefaultTemplate } from '../../templates';
import { Category, Subcategory, Page } from '../../models';
import { PageContent } from '../../components/pageContent';

const Placeholder = styled.div`
  padding: 1rem;
`;

interface Props {
  urlTitle: string
  categories?: Immutable.Map<string, Category>
  subcategories?: Immutable.Map<string, Subcategory>
  pages: Immutable.Map<string, Page>
}

interface State {}

export class MathPage extends React.Component<Props, State> {
  getBaseFileName = () => {
    const { urlTitle, categories, subcategories, pages } = this.props;
    
    if (categories && subcategories && pages) {
      const page = pages.find(page => page.urlTitle === urlTitle);

      const subcategoryId = page && page.subcategoryId;
      const subcategory = subcategoryId && subcategories.get(`${subcategoryId}`);

      const categoryId = subcategory && subcategory.categoryId;
      const category = categoryId && categories.get(`${categoryId}`);

      if (page && subcategory && category) {
        return `${category.index}_${subcategory.index}_${page.index}_${urlTitle}`;
      }
    }

    return undefined;
  }

  renderContent = () => {
    const basefileName = this.getBaseFileName();

    if (!basefileName) {
      return <Placeholder>Ladataan...</Placeholder>
    }

    return (
      <PageContent baseFileName={basefileName} />
    )
  }

  render() {
    return (
      <DefaultTemplate
        content={this.renderContent()}
      />
    );
  }
}
