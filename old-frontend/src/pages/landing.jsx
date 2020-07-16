import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import {
  Container,
  Section,
  Parent,
  Child,
  Ancestor,
  Tile,
  H1,
  H2,
  Columns,
  Column,
  Level,
  LevelItem,
  LevelLeft,
  LevelRight,
  Content,
  Box
} from '../components/helpers';
import Brand from '../components/brand'
import { Link } from 'gatsby';

const LandingPage = () => (
  <>
    <Section className="hero is-info is-fullheight is-bold">
    <div className="hero-head">
      <nav className="navbar">
        <Container>
            <div className="navbar-brand">
                <Link className="navbar-item" to='/'>
                  <Brand siteTitle="FerryTi.me"/>
                </Link>
            </div>
            <div className="navbar-menu">
              <div className='navbar-end'>
                <Link className="navbar-item" to='/'>
                  <button className='button is-warning has-text-weight-bold'>
                    Check it out  &nbsp;
                    <FontAwesomeIcon icon="arrow-right" />
                  </button>
                </Link>
              </div>
            </div>
        </Container>
      </nav>
    </div>
    <div className="hero-body">
      <Container>
        <Level>
        <LevelLeft>
        <div>
          <H1>Simple ferry schedules</H1>
          <H2>Find your ferry. Faster.</H2>
          </div>
        </LevelLeft>
          <LevelRight>
            <div style={{width: 300, height: 500, background: "linear-gradient(#fff, #ddd)", border: "1rem solid black", borderRadius: '1rem', transform: 'skew(-30deg, -10deg) translate(-3rem, 10rem)'}} />
          </LevelRight>
        </Level>
      </Container>
      </div>
    </Section>
    
    <Section className="hero is-light is-fullheight is-bold">
    <div className="hero-body">
      <Container>
        <Level>
        <LevelLeft>
            <div style={{width: 300, height: 500, background: "linear-gradient(white, red)", border: "1rem solid black", borderRadius: '1rem'}} />
        </LevelLeft>
          <LevelRight>
                    <div>
            <H1>Stop looking. Start finding.</H1>
            <H2>One page per route.</H2>
            <H2>Travel often? Favourite a route!</H2>
            <H2>Travel <strong>really</strong> often? Add this site as an app!</H2>
            <button className="button">Find out how</button>
          </div>
        
          </LevelRight>
        </Level>
      </Container>
      </div>
    </Section>
    
    <Section className="hero is-info is-fullheight is-bold">
    <div className="hero-body">
      <Container>
        <Level>
        <LevelLeft>
        <div>
          <H1>All the info you need, none you don't.</H1>
          <Content className="is-medium">
            <ul>
              <li>Today's Schedule</li>
              <li>Current Status</li>
              <li>Departures and Arrivals</li>
              <li>Sailing Waits</li>
            </ul>
          </Content>
          </div>
        </LevelLeft>
          <LevelRight>
            <div style={{width: 300, height: 500, backgroundColor: "white", border: "1rem solid black", borderRadius: '1rem'}} />
          </LevelRight>
        </Level>
      </Container>
      </div>
      <div className="hero-foot"  style={{padding: "10rem 0 5rem 0"}}>
      <Container>
        <Ancestor>
          <Parent >
            <Child className="box">
              <H1 className="has-text-dark">🔥 Fast</H1>
              <p>Server side rendering means routes load quickly. And thanks to GraphQL, you get only the data you need. No more, no less.</p>
            </Child>
          </Parent>
          <Parent>
            <Child className="box">
              <H1 className="has-text-dark">😀 Friendly</H1>
              <p>Designed for mobile first. Simple and clean to show you what you need with no fuss.</p>
            </Child>
          </Parent>
          <Parent>
            <Child className="box">
              <H1 className="has-text-dark">🤖 Modern</H1>
              <p>Using the latest in Progress Web App technology you can even check the schedule when offline. Deadzones begone!</p>
            </Child>
          </Parent>
        </Ancestor>
      </Container>
      </div>
    </Section>

    <Section className="hero is-light is-bold">
    <div className="hero-body">
      <Container className="has-text-centered">
        <H1>Simple ferry schedules</H1>
        <H2>It's about time</H2>
        <Level>
        <LevelItem>
        <Link className="navbar-item" to='/'>
          <button className='button is-warning has-text-weight-bold is-large'>
          Ferryti.me &nbsp;
            <FontAwesomeIcon icon="arrow-right" /></button>
        </Link>
        </LevelItem>
        </Level>
      </Container>
      </div>
    </Section>
  </>
);

export default LandingPage;
