import React, { useState, useEffect } from 'react';

function useFavouriteRoute(routeName) {
  const [favourites, setFavourites] = useState(
    typeof localStorage !== 'undefined'
      ? JSON.parse(localStorage.getItem('favourites')) || []
      : []
  );

  const [isFavourite, setFavourite] = useState(
    favourites && favourites.includes(routeName)
  );

  const toggleFavourite = () => setFavourite(!isFavourite);

  useEffect(() => {
    if (favourites.includes(routeName) && !isFavourite) {
      setFavourites(favourites.filter(favourite => favourite !== routeName));
    }

    if (!favourites.includes(routeName) && isFavourite) {
      setFavourites([routeName, ...favourites]);
    }

    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('favourites', JSON.stringify(favourites));
    }
  }, [isFavourite]);

  return [isFavourite, toggleFavourite];
}

export default useFavouriteRoute;
