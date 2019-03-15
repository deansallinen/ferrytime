import React, { useState, useEffect } from 'react';

export default ({ routeName }) => {
  let favourites =
    typeof localStorage !== 'undefined'
      ? JSON.parse(localStorage.getItem('favourites')) || []
      : [];

  const [isFavourite, setFavourite] = useState(
    favourites && favourites.includes(routeName)
  );

  const toggleFavourite = () => setFavourite(!isFavourite);
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

  return isFavourite ? (
    <button
      className="text-white  text-3xl"
      onClick={toggleFavourite}
    >
      <span>&#9733;</span>
    </button>
  ) : (
    <button
      className="text-white  text-3xl"
      onClick={toggleFavourite}
    >
      &#9734;
    </button>
  );
};
