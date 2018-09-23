import React, { Component } from 'react'
import styled from 'styled-components'
import Link from 'gatsby-link'
import slugify from 'slugify'
// import { slide as Menu } from 'react-burger-menu'

const Menu = styled.div`
  grid-area: menu;
  display: flex;
  flex-direction: column;
`
const MenuItem = styled.div`
  cursor: pointer;
  padding: 1.5rem;

  &:hover {
    background: #eee;
  }
`
export default class AppMenu extends Component {
  state = {
    loaded: false,
    data: [],
  }

  showSettings(event) {
    event.preventDefault()
  }

  componentDidMount() {
    this.loadInfo()
  }

  loadInfo() {
    fetch('/api/routes/')
      .then(res => {
        return res.json()
      })
      .then(data => {
        this.setState({
          loaded: true,
          data: data,
        }),
          error => {
            this.setState({ loaded: true, error })
          }
      })
  }
  render() {
    return (
      <Menu>
        {this.state.data.map(each => {
          return (
            <Link
              key={each.id}
              to={slugify(each.route_name, {
                remove: /[$*_+~.()'"!\-:@]/g,
              })}
            >
              <MenuItem key={each.id}>{each.route_name}</MenuItem>
            </Link>
          )
        })}
      </Menu>
    )
  }
}
