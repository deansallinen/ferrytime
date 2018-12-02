import React from 'react';
import AppBar from './appBar'
import { request } from 'graphql-request';

export default class Header extends React.Component {
    state = {
        data: {}
    };

    async componentDidMount() {
        const query = `{
          allRoutes {
            id
            routeName
          }
        }`;
        const URL = 'https://ferrytrackerserver.now.sh/graphql';
        request(URL, query).then(data => {
            this.setState({data})
            // console.log(this.state.data)
        });
      };
  
    render() {
        return (
            <AppBar {...this.state.data}></AppBar>
        )
    }
}