import React, { useState, useEffect, useContext } from 'react';
import { Link, graphql } from 'gatsby';
import { request } from 'graphql-request';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import localforage from 'localforage';
import posed, { PoseGroup } from 'react-pose';

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
  Section,
} from './helpers';

const URL = 'https://ferrytrackerserver.now.sh/graphql';


const SailingWait = React.memo(props => (
  <div className="control">
    <div className="tags has-addons">
      <span className="tag is-light is-medium">
        <FontAwesomeIcon icon={props.icon} />
      </span>
      <span className="tag is-light is-medium">
        {props.value || 0}
      </span>
    </div>
  </div>
));

const Hero = React.memo((props) => {
  console.log('hero', props);
  const {
    routeName, averageSailing, currentStatus, carWaits, oversizeWaits,
  } = props;
  return (
    <section className="hero">
      <div className="hero-body">
        <Container>
          <H1>{routeName}</H1>
          <H2>{averageSailing}</H2>
          <FavouriteStar routeName={routeName} />
          <H2>
            Status:
            {' '}
            {currentStatus}
          </H2>
          <div className="field is-grouped is-grouped-multiline">
            <H2>Sailing Waits: </H2>
            <SailingWait value={carWaits} icon="car-side" key="car" />
            <SailingWait value={oversizeWaits} icon="truck" key="truck" />
          </div>
        </Container>
      </div>
    </section>
  );
});

const FerryRoute = (props) => {
  const { route } = props.data.ftapi;
  const { routeName, averageSailing } = route;
  const time = new Date();
  const [carWaits, setCarWaits] = useState(null);
  const [oversizeWaits, setOversizeWaits] = useState(null);
  const [loading, setLoading] = useState(true);

  const [sailings, setSailings] = useState(route.sailings);
  useEffect(() => {
    setLoading(true);
    localforage.getItem(routeName).then((existingSailings) => {
      if (existingSailings) {
        console.log('From cache:', existingSailings);
        setSailings(existingSailings);
      }
    });
    const query = `{
      route(routeName: "${routeName}"){
          routeName
          carWaits
          oversizeWaits
          sailings {
              id
              vessel
              scheduledDeparture
              actualDeparture
              eta
              sailingStatus
              lastUpdated
              percentFull
          }
      }
  }`;
    request(URL, query).then(
      (res) => {
        // Too many calls here?
        console.log('From network:', res.route);
        localforage.setItem(routeName, res.route.sailings);
        setSailings(res.route.sailings);
        setCarWaits(res.route.carWaits);
        setOversizeWaits(res.route.oversizeWaits);
        setLoading(false);
      },
    ).catch((err) => { throw err; });
  }, []);

  const [currentStatus, setCurrentStatus] = useState(undefined);
  useEffect(() => {
    const latestStatus = sailings.map(each => each.sailingStatus).filter(Boolean).pop();
    setCurrentStatus(latestStatus);
  }, [sailings]);

  return (
    <Layout>
      <Hero routeName={routeName} averageSailing={averageSailing} carWaits={carWaits} oversizeWaits={oversizeWaits} currentStatus={currentStatus} />
      <Section>
        <Container>
          <h3 className="title is-3">Sailings</h3>
          <Ancestor className="tile is-ancestor is-vertical" key="ancestor">
            {sailings.map(sailing => (
              <Parent className="tile is-parent" key={sailing.id}>
                <Child>
                  <Sailing {...sailing} time={time} />
                </Child>
              </Parent>
            ))}
          </Ancestor>
          <Link to="/">Go back to the homepage</Link>
        </Container>
      </Section>
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
