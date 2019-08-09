import React, { useState, useEffect } from 'react';

export default ({ routeName }) => {
  let favourites =
    typeof localStorage !== 'undefined'
      ? JSON.parse(localStorage.getItem('favourites')) || []
      : [];

  const [isFavourite, setFavourite] = useState(
    favourites && favourites.includes(routeName)
  );

  const Button = ({ children }) => (
    <button
      className="text-white text-xs md:text-sm border rounded px-4 py-2"
      onClick={toggleFavourite}
    >
      {children}
    </button>
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
    <Button>
      Remove Favourite
    </Button>
  ) : (
    <Button>
      Add to Favourites
    </Button>
  );
};
