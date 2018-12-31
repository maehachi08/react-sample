import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { YoutubeTop } from './youtube_entries'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Button,
  Message
} from 'semantic-ui-react'

export class Top extends React.Component {
  render() {
    return (
      <div>
        <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as='a' header>
              <Image size='mini' src='' style={{ marginRight: '1.5em' }} />
              Goosetune::Admin
            </Menu.Item>
            <Menu.Item as='a'>Youtube</Menu.Item>
          </Container>
        </Menu>

        <YoutubeTop />
      </div>
    );
  }
}

ReactDOM.render(
  <Top />,
  document.getElementById('root')
)
