import React, { Fragment } from 'react';
import styled from 'styled-components';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import Immutable from 'immutable';
import { Link } from 'react-router-dom';

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
  renderCategories = () => {
    const { categories, subcategories, defaultActiveKey } = this.props;

    if (!categories || !subcategories) {
      return undefined;
    }

    const [firstSubcategory] = subcategories;

    return (
      <Accordion defaultActiveKey={defaultActiveKey || (firstSubcategory && `${firstSubcategory.id}`)}>
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
            <Card key={subcategory.id}>
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
