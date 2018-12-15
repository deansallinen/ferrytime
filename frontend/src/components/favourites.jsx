import React from 'react';
import { Link } from 'gatsby';
import {
  Ancestor, Parent, Child, Columns, Column,
} from './helpers';

const favourites = JSON.parse(localStorage.getItem('favourites'));

export default () => (
  <Columns>
    <Ancestor>
      <Column>
        { favourites ? favourites
          .map(each => (
            <Parent>
              {/* <Link to={each.node.path} key={each.node.context.routeId}> */}
              <Child className="box">
                <h5 className="title is-5">

                  {each}
                </h5>
              </Child>
              {/* </Link> */}
            </Parent>
          )) : null }
      </Column>
    </Ancestor>
  </Columns>

);
