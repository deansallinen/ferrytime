import React from 'react';
import Layout from '../components/layout';
import Favourites from '../components/favourites';
import Menu from '../components/menu';
import { H1, Section, Container } from '../components/helpers';

const favourites = JSON.parse(localStorage.getItem('favourites'));

const IndexPage = () => (
  <Layout>
    <Section>
      {favourites
        ? (
          <Container>
            <H1>Favourites</H1>
            <Favourites />
          </Container>
        ) : null
    }
      <Container>
        <H1>All Routes</H1>
        <Menu />
      </Container>
    </Section>
  </Layout>
);
export default IndexPage;
