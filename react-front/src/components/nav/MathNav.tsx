import React, { Fragment } from 'react';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import { Category, Subcategory, Page } from '../../models';

interface Props {
  categories?: Category[]
  subcategories?: Subcategory[]
  pages?: Page[]
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
      <Accordion defaultActiveKey={defaultActiveKey || `${firstSubcategory.id}`}>
        {categories.map(category => (
          <Fragment>
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
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey={`${subcategory.id}`}>
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
            <ListGroup.Item>
              <a href={`#${page.urlTitle}`}>
                {page.name}
              </a>
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
