import React from 'react';
import Layout from '../components/layout';
import Menu from '../components/menu';
import { H1, Section, Container } from '../components/helpers';

const IndexPage = () => (
  <Layout>
    <Section>
      <Container>
        <H1>All Routes</H1>
        <Menu />
      </Container>
    </Section>
  </Layout>
);
export default IndexPage;
