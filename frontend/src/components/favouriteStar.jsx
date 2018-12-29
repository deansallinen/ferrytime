import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import posed from 'react-pose';
// TODO: switch to localforage for favourites

export default (props) => {
  const { routeName } = props;

  let favourites = (typeof localStorage !== 'undefined') ? JSON.parse(localStorage.getItem('favourites')) || [] : [];

  const [isFavourite, toggleFavourite] = useState(favourites && favourites.includes(routeName));

  useEffect(() => {
    if (favourites.includes(routeName) && !isFavourite) {
      favourites = favourites.filter(favourite => favourite !== routeName);
    }

    if (!favourites.includes(routeName) && isFavourite) {
      favourites = [routeName, ...favourites];
    }

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('favourites', JSON.stringify(favourites));
    }
  }, [isFavourite]);

  const Box = posed.div({
    hidden: { opacity: 0.5, scale: 1.5 },
    visible: { opacity: 1 },
  });
  const Star = ({ solid }) => (
    <Box pose={solid ? 'hidden' : 'visible'}>
      <FontAwesomeIcon icon={[solid ? 'fas' : 'far', 'star']} size="lg" />
    </Box>
  );

  return (
    <div className="icon" onClick={() => toggleFavourite(!isFavourite)}>
      {isFavourite ? <Star solid /> : <Star />}
    </div>
  );
};
