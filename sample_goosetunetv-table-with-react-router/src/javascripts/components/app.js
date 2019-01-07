import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {
  /*HashRouter as Router,*/
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

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

import { YoutubeTop } from './youtube/index'
import { YoutubeEntry } from './youtube/entry'

const App = () => (
  <Router>
    <div>
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='a' header>
            <Image size='mini' src='' style={{ marginRight: '1.5em' }} />
            Goosetune::Admin
          </Menu.Item>
          <Menu.Item as={Link} to='/'>Youtube</Menu.Item>
          <Menu.Item as={Link} to='/about'>About</Menu.Item>
          <Menu.Item as={Link} to='/friends'>Friends</Menu.Item>
        </Container>
      </Menu>
      <hr />

      <Route exact path='/' component={YoutubeTop} />
      <Route exact path='/youtube' component={YoutubeTop} />
      <Route path='/youtube/:id' component={YoutubeEntry} />
      <Route path='/about' component={About} />
      <Route path='/friends' component={Friends} />
    </div>
  </Router>
)

const About = () => (
  <div>
    <h2>About</h2>
    <p>フレンズに投票するページです</p>
  </div>
)
const Friends = () => (
  <div>
    <h2>Friends</h2>
    <p>ここにフレンズのリストを書きます</p>
  </div>
)

export default App
