import React, { useState, useEffect, useContext } from 'react';
import { Link, graphql } from 'gatsby';
import { request } from 'graphql-request';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
<<<<<<< HEAD
import localforage from 'localforage';
import posed, { PoseGroup } from 'react-pose';

=======
>>>>>>> 1d5026a947adb5c8f26f876eeb79c6749dfa66aa
import FavouriteStar from './favouriteStar';
import Layout from './layout';
import Sailing from './sailing';
import {
  H1,
  H2,
  Ancestor,
  Parent,
  Child,
  Container,

} from './helpers';

const URL = 'https://ferrytrackerserver.now.sh/graphql';

const PosedDiv = posed.div({
  enter: { x: 0, opacity: 1 },
  exit: { x: 500, opacity: 0 },
});

const SailingWait = props => (
  <PosedDiv className="control">
    <div className="tags has-addons">
      <div className="tag is-light is-medium">
        <FontAwesomeIcon icon={props.icon} />
      </div>
      <div className="tag is-light is-medium">
        {props.value}
      </div>
    </div>
  </PosedDiv>
);

const FerryRoute = (props) => {
  const { route } = props.data.ftapi;
  const { routeName, averageSailing } = route;
  const time = new Date();

  const [loading, setLoading] = useState(true);

  const [sailings, setSailings] = useState([]);
  // const [sailings, setSailings] = useState( || route.sailings);
  useEffect(() => {
    setLoading(true);
    localforage.getItem(routeName).then((existingSailings) => {
      if (existingSailings) {
        console.log('existing', existingSailings);
        setSailings(existingSailings);
      }
    });
    const query = `{
      route(routeName: "${routeName}"){
          routeName
          sailings {
              id
              vessel
              scheduledDeparture
              actualDeparture
              eta
              sailingStatus
              lastUpdated
          }
      }
  }`;
    request(URL, query).then(
      (res) => {
        console.log(res.route.sailings);
        localforage.setItem(routeName, res.route.sailings);
        setSailings(res.route.sailings);
        setLoading(false);
      },
    );
  }, []);

  const [currentStatus, setCurrentStatus] = useState('');
  useEffect(() => {
    const latestStatus = sailings.map(each => each.sailingStatus).filter(Boolean).pop();
    // console.log(latestStatus)
    setCurrentStatus(latestStatus);
  }, [sailings]);
  // <TimeContext.Provider value={time}>
  // </TimeContext.Provider>

  // <Spring
  //   from={{ number: 0 }}
  //   to={{ number: 10 }}
  //   delay= '1000'
  //   config = { config.slow }>
  //   {props => <div>{props.number.toFixed()}</div>}
  // </Spring>

  const PosedAncestor = posed.div({
    enter: { staggerChildren: 50 },
  });
  const PosedParent = posed.div({
    enter: { x: 0, opacity: 1 },
    exit: { x: 500, opacity: 0 },
  });
  return (
    <Layout>

      <section className="hero">
        <div className="hero-body">
          <Container>
            <H1>{routeName}</H1>
            <H2>{averageSailing}</H2>
            <H2>
              Status:
              {' '}
              {currentStatus}
            </H2>
            <FavouriteStar routeName={routeName} />
            <H2>Sailing Waits</H2>
            <div className="field is-grouped is-grouped-multiline">
              <PoseGroup>
                <SailingWait value="0" icon="car-side" key="car" />
                <SailingWait value="0" icon="truck" key="truck" />
              </PoseGroup>
            </div>
          </Container>
        </div>
      </section>
      <div className="section">
        <Container>
          <h3 className="title is-3">Sailings</h3>
          <Ancestor className="tile is-ancestor is-vertical" key="ancestor">
            {sailings.map(sailing => (
              <Parent className="tile is-parent" key={sailing.id}>
                <Child>
                  <Sailing {...sailing} time={time} loading={loading} />
                </Child>
              </Parent>
            ))}
          </Ancestor>
          <Link to="/">Go back to the homepage</Link>
        </Container>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query PageQuery($routeName: String) {
    ftapi {
      route(routeName: $routeName) {
        id
        routeName
        averageSailing
        sailingDate
        sailings {
          id
          scheduledDeparture

        }
      }
    }
  }
`;

export default FerryRoute;

// actualDeparture
// eta
// sailingStatus
// vessel
// lastUpdated
