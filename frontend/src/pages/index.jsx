import React from 'react';
import Layout from '../components/layout';
import Menu from '../components/menu';
import Favourites from '../components/favourites';
import { H1, Section, Container } from '../components/helpers';


const IndexPage = () => (
  <Layout>
    <Favourites />
    <Menu />
  </Layout>
);
export default IndexPage;
