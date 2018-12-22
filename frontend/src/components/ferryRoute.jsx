import React, { useState, useEffect, useContext } from 'react';
import { Link, graphql } from 'gatsby';
import { request } from 'graphql-request';
import FavouriteStar from './favouriteStar';
import { Spring, config } from 'react-spring'
import Layout from './layout';
import Sailing from './sailing';
import {useTime, TimeContext} from './time-context'
import {
  H1,
  H2,
  Ancestor,
  Parent,
  Child,
  Container,

} from './helpers';

const URL = 'https://ferrytrackerserver.now.sh/graphql';

const FerryRoute = (props) => {
  const { route } = props.data.ftapi;
  const { routeName, averageSailing } = route;
  const time = new Date()

  const [loading, setLoading] = useState(true);
  
  const [sailings, setSailings] = useState(route.sailings);
  useEffect(() => {
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
  
    setLoading(true);
    request(URL, query).then(
      (res) => {
        console.log(res.route.sailings);
        setSailings(res.route.sailings);
        setLoading(false);
      }
    )
  }, []);

  const [currentStatus, setCurrentStatus] = useState('');
  useEffect(() => {
    const latestStatus = sailings.map(each => each.sailingStatus).filter(Boolean).pop();
    // console.log(latestStatus)
    setCurrentStatus(latestStatus)
  }, [sailings])
// <TimeContext.Provider value={time}>
// </TimeContext.Provider>

            // <Spring
            //   from={{ number: 0 }}
            //   to={{ number: 10 }}
            //   delay= '1000'
            //   config = { config.slow }>
            //   {props => <div>{props.number.toFixed()}</div>}
            // </Spring>
  return (
    <Layout>
    
      <section className="hero">
        <div className="hero-body">
          <Container>
            <H1>{routeName}</H1>
            <H2>{averageSailing}</H2>
            <H2>Status: {currentStatus}</H2>
            <FavouriteStar routeName={routeName} />

          </Container>
        </div>
      </section>
      <div className="section">
        <Container>
          <h3 className="title is-3">Sailings</h3>
          <Ancestor className="is-vertical">
            {sailings.map(sailing => (
              <Parent key={sailing.id}>
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