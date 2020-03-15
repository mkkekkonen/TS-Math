import React, { Fragment } from 'react';
import styled from 'styled-components';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import Immutable from 'immutable';
import { Link } from 'react-router-dom';
import { last } from 'lodash';

import { Category, Subcategory, Page } from '../../models';

const StyledButton = styled(Button)`
  text-align: left !important;
`;

interface Props {
  categories?: Immutable.List<Category>
  subcategories?: Immutable.List<Subcategory>
  pages?: Immutable.List<Page>
  defaultActiveKey?: string;
}

interface State {}

export class MathNav extends React.Component<Props, State> {
  getSelectedSubcategoryKey = () => {
    const { subcategories, pages, defaultActiveKey } = this.props;

    if (window.location.hash && window.location.hash.includes('pages')) {
      const splitHash = window.location.hash.split('/');
      const urlTitle = last(splitHash);

      const page = pages && pages.find(p => p.urlTitle === urlTitle);

      if (page) {
        return `${page.subcategoryId}`;
      }

      // invalid page title
      return undefined;
    }

    if (subcategories) {
      const [firstSubcategory] = subcategories;
      return firstSubcategory && `${firstSubcategory.id}`;
    }

    return defaultActiveKey;
  }

  renderCategories = () => {
    const { categories, subcategories } = this.props;

    if (!categories || !subcategories) {
      return undefined;
    }

    return (
      <Accordion defaultActiveKey={this.getSelectedSubcategoryKey()}>
        {categories.map(category => (
          <Fragment key={category.id}>
            <Card>
              <Card.Header>
                <h5>{category.name}</h5>
              </Card.Header>
            </Card>
            {this.renderSubcategories(category.id)}
          </Fragment>
        ))}
      </Accordion>
    )
  }

  renderSubcategories = (categoryId: number) => {
    const { subcategories } = this.props;

    if (!subcategories) {
      return undefined;
    }

    return (
      <Fragment>
        {subcategories.filter(subcategory => subcategory.categoryId === categoryId)
          .map(subcategory => (
            <Card key={`${subcategory.id}`}>
              <Card.Header>
                <Accordion.Toggle as={StyledButton} variant="link" eventKey={`${subcategory.id}`}>
                  {subcategory.name}
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={`${subcategory.id}`}>
                <Card.Body>
                  {this.renderPages(subcategory)}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
        ))}
      </Fragment>
    )
  }

  renderPages = (subcategory: Subcategory) => {
    const { pages } = this.props;

    if (!pages) {
      return undefined;
    }

    return (
      <ListGroup>
        {pages.filter(page => page.subcategoryId === subcategory.id)
          .map(page => (
            <ListGroup.Item key={page.id}>
              <Link to={`/pages/${page.urlTitle}`}>
                {page.name}
              </Link>
            </ListGroup.Item>
          ))}
      </ListGroup>
    )
  }

  render() {
    return (
      <Fragment>
        {this.renderCategories()}
      </Fragment>
    );
  }
}
