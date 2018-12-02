// This file is shared across the demos.
import Link from 'next/link';
import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const FerryMenu = ({ data }) => (
  <List>
    {console.log(data)}
    {data.map(route => (
      <Link
        prefetch
        as={route.routeName
          .toLowerCase()
          .replace(/[^a-zA-Z0-9 -]/g, '')
          .replace(/ /g, '_')}
        href={{ pathname: '/post', query: { id: route.routeName } }}
      >
        <ListItem button key={route.id}>
          <ListItemText primary={route.routeName} />
        </ListItem>
      </Link>
    ))}
  </List>
);

export default FerryMenu;
