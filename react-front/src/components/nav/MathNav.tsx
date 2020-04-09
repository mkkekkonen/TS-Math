import React, { Fragment } from 'react';
import styled from 'styled-components';

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

import Immutable from 'immutable';
import { Link } from 'react-router-dom';
import { last } from 'lodash';
import { withTranslation, WithTranslation } from 'react-i18next';

import { Category, Subcategory, Page } from '../../models';

const NavContainer = styled.div`
  max-height: 100vh;
  overflow-y: scroll;
`

const StyledButton = styled(Button)`
  text-align: left !important;
`;

interface Props extends WithTranslation {
  categories?: Immutable.List<Category>
  subcategories?: Immutable.List<Subcategory>
  pages?: Immutable.List<Page>
  defaultActiveKey?: string;
}

interface State {}

class MathNavComponent extends React.Component<Props, State> {
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
    const { categories, subcategories, t } = this.props;

    if (!categories || !subcategories) {
      return undefined;
    }

    return (
      <Accordion defaultActiveKey={this.getSelectedSubcategoryKey()}>
        {categories.map(category => (
          <Fragment key={category.id}>
            <Card>
              <Card.Header>
                <h5>{t(category.name)}</h5>
              </Card.Header>
            </Card>
            {this.renderSubcategories(category.id)}
          </Fragment>
        ))}
      </Accordion>
    )
  }

  renderSubcategories = (categoryId: number) => {
    const { subcategories, t } = this.props;

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
                  {t(subcategory.name)}
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
    const { pages, t } = this.props;

    if (!pages) {
      return undefined;
    }

    return (
      <ListGroup>
        {pages.filter(page => page.subcategoryId === subcategory.id)
          .map(page => (
            <ListGroup.Item key={page.id}>
              <Link to={`/pages/${page.urlTitle}`}>
                {t(page.name)}
              </Link>
            </ListGroup.Item>
          ))}
      </ListGroup>
    )
  }

  render() {
    const { t } = this.props;

    return (
      <NavContainer>
        {this.renderCategories()}
        <Card>
          <Card.Header>
            <h5>{t('Sources')}</h5>
          </Card.Header>
        </Card>
        <Card>
          <Card.Header>
            <Link to="/sources">
              <StyledButton variant="link">{t('Sources')}</StyledButton>
            </Link>
          </Card.Header>
        </Card>
      </NavContainer>
    );
  }
}

export const MathNav = withTranslation('nav')(MathNavComponent);
