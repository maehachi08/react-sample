import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { YoutubeEntriesTable } from './youtube_entries_table'
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

export class YoutubeTop extends React.Component {

  constructor(props) {
    super(props);
    this.state = { activeItem: 'Goosetune::Admin::Youtube' }
    this.handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state.activeItem

    return (
      <div className="ui container" text style={{ marginTop: '7em'}}>
        <div name='Goosetune::Admin::Youtube'>
          <Header as='h2' textAlign='left'>Goosetune::Admin::Youtube</Header>

          <Divider />
          <div>
            <Header as='h5' textAlign='left'>YouTubeエントリ - データベース更新</Header>
            <Grid columns={2} centered>
              <Grid.Row>
                <Grid.Column textAlign='center'>
                    <Button basic color='orange' content='YouTubeエントリの更新' />
                </Grid.Column>
                <Grid.Column textAlign='center'>
                    <Button basic color='orange' content='YouTube再生回数の更新' />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>

          <Divider />
          <div>
            <YoutubeEntriesTable />
          </div>
        </div>
      </div>
    );
  }
}
