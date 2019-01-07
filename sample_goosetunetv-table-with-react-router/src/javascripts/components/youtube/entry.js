import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import {
  Grid,
  Segment,
  Header,
  Divider,
  Dropdown,
  Button,
  Form,
  Select,
  TextArea,
  Image,
  Checkbox,
} from 'semantic-ui-react'

import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput
} from 'semantic-ui-calendar-react';

export class YoutubeEntryEditForm extends React.Component {

  constructor(props) {
    super(props);
    this.setState({release_at: '2018-01-01', membersOptions: null })
    this.entry = props.data.entry
    this.youtube = props.data.entry.youtube
    this.all_artists = props.data.artists
    this.all_ustreams = props.data.ustreams
    this.all_members = props.data.members
    this.all_genres = props.data.genres
    this.all_unit_groups = props.data.unit_groups
    this.all_musical_instruments = props.data.musical_instruments
    this.artistsOptions = []
    this.ustreamsOptions = []
    this.membersOptions = []
    this.genresOptions = []
    this.unit_groupsOptions = []
    this.musical_instrumentsOptions = []

    this.all_artists.map((artist) =>
      this.artistsOptions.push( { key: artist.id, text: artist.name, value: artist.name } )
    )

    this.all_ustreams.map((ustream) =>
      this.ustreamsOptions.push( { key: ustream.id, text: ustream.title, value: ustream.title } )
    )

    this.all_genres.map((genre) =>
      this.genresOptions.push( { key: genre.id, text: genre.name, value: genre.name } )
    )

    this.all_unit_groups.map((unit_group) =>
      this.unit_groupsOptions.push( { key: unit_group.id, text: unit_group.name, value: unit_group.name } )
    )

    this.all_musical_instruments.map((musical_instrument) =>
      this.musical_instrumentsOptions.push( { key: musical_instrument.id, text: musical_instrument.name, value: musical_instrument.name } )
    )

    var membersOptionArray = []
    var _member_option;
    this.all_members.map((member) => {
      let _member_option = { key: member.id, name: member.name, value: member.name, selected: false }
      this.entry.entry_members.map((entry_member) => {
        if (member.id == entry_member.id) {
          _member_option = {  key: member.id, name: member.name, value: member.name, selected: true }
          return;
        }
      })

      console.log(_member_option)
      membersOptionArray.push(_member_option)
    })
    this.state = {membersOptions: membersOptionArray}
    console.log(membersOptionArray)
    console.log()



    // this.all_members.map((member) => {
    //   this.entry.entry_members.map((entry_member) => {
    //     if (member.id == entry_member.id) {
    //       this.membersOptions.push( { key: member.id, name: member.name, value: member.name, selected: true } )
    //     } else {
    //       this.membersOptions.push( { key: member.id, name: member.name, value: member.name, selected: false } )
    //     }
    //   })
    //   // ここにreturnする必要がある
    //   // this.membersOptions.push( { key: member.id, name: member.name, value: member.name, selected: false } )
    // })
  }

  componentWillMount() {
    console.log('=== componentWillMount ===');

    console.log(this.youtube.release_at)
    if (this.youtube.release_at == null) {
        this.setState({release_at: ''})
    } else {
        this.setState({release_at: this.youtube.release_at})
    }
  }


  render() {
    this.changedReleaseAt = (event, {name, value}) => {
      console.log(value)
      this.entry.youtube.release_at = value
      this.setState({release_at: value})
    }

    const updateYoutubeEntry = (event, data) => {
      this.entry.youtube = this.youtube
      console.log(this.entry)
    }

    const changedTitle = (event) => {
      console.log(event.target.value)
      this.youtube.title = event.target.value
    }

    const changedOriginalTitle = (event) => {
      console.log(event.target.value)
      this.youtube.original_title = event.target.value
    }

    const changedArtist = (event, index) => {
      var item = this.all_artists.filter(function(artist) {
        return (artist.id == event.target.id)
      })
      console.log(item[0].name)
      this.entry.entry_artists[index] = item
    }

    const changedAmazon = (event, data) => {
      console.log(event.target.value)
      this.youtube.amazon = event.target.value
    }

    const changedUstreamId = (event, data) => {
      let selected_ustream_title = data.value
      let item = data.options.find(o => o.value === selected_ustream_title)
      this.entry.entry_ustream = {id: item.key, title: item.value}
    }

    const changedMemo = (event, index) => {
      console.log(event.target.value)
      this.youtube.memo = event.target.value
    }

    let _selected_member = {};
    let _selected_member_index;
    let membersOptionArray = this.state.membersOptions
    const changedMember = (event, data) => {
      // console.log(data.id)
      // console.log(data.label)
      // console.log(data.checked)
      this.state.membersOptions.map((member, index) => {
        if (member.key == data.id) {
          // this.state.membersOptions[index].selected = data.checked
          membersOptionArray[index].selected = data.checked
          _selected_member_index = index
          _selected_member = member
          return
        }
      })

      this.setState({membersOptions: membersOptionArray})
    }

    const changedGenreId = (event, data) => {
      let selected_genre_name = data.value
      let item = data.options.find(o => o.value === selected_genre_name)
      this.entry.entry_genre = {id: item.key, name: item.value}
    }

    const changedUnitGroupId = (event, data) => {
      let selected_unit_group_name = data.value
      let item = data.options.find(o => o.value === selected_unit_group_name)
      this.entry.entry_unit_group = {id: item.key, name: item.value}
    }

    const changedMusicalInstrumentId = (event, data) => {
      var selected_musical_instruments = []
      data.value.map((musical_instrument_name) => {
        let item = data.options.find(o => o.value === musical_instrument_name)
        selected_musical_instruments.push( {id: item.key, name: item.value} )
      })

      this.entry.entry_musical_instruments = selected_musical_instruments
      console.log(this.entry.entry_musical_instruments)
    }

    return (
      // <Segment>
      //   <Form onSubmit={updateYoutubeEntry}>
      <Segment inverted>
        <Form onSubmit={updateYoutubeEntry} inverted>

          <Form.Field>
            <Image src={this.youtube.thumbnail} size='medium' wrapped disabled />
          </Form.Field>

          <Form.Field>
            <Form.Input
              label='タイトル'
              placeholder='タイトル'
              defaultValue={this.youtube.title}
              onChange={changedTitle} />
          </Form.Field>

          <Form.Group unstackable widths={2} >
            <Form.Input
              label='オリジナルタイトル'
              placeholder='オリジナルタイトル'
              defaultValue={this.youtube.original_title}
              onChange={changedOriginalTitle} />

            {/*
              === React Comment Start ===
                React mapをnestしたい時の書き方
                  - return は必ずHTML要素で返す必要がある
              === React Comment End ===
            */}
            {
              this.entry.entry_artists.map((artist, index) => {
                return (
                  <Form.Field
                    key={artist.id}
                    control={Select}
                    options={this.artistsOptions}
                    label='オリジナルアーティスト'
                    placeholder='オリジナルアーティスト'
                    defaultValue={artist.name}
                    onChange={(e)=>{changedArtist(e, index)}}
                  />
                )
              })
            }
          </Form.Group>

          <Form.Field
            control={Dropdown}
            multiple selection
            options={this.musical_instrumentsOptions}
            key={this.musical_instrumentsOptions.key}
            label='楽器'
            placeholder='楽器'
            onChange={changedMusicalInstrumentId}
          />

          <Form.Field inline>
            <label>メンバー</label>
            <Grid>
              <Grid.Row columns={3}>
              {
                // checked={member.selected} は state で更新するようにしたい
                this.state.membersOptions.map((member) => {
                  return (
                    <Grid.Column key={member.key}>
                      <Form.Field>
                        <Checkbox id={member.key} label={member.name} checked={member.selected} onChange={changedMember} />
                      </Form.Field>
                    </Grid.Column>
                  )
                })
              }
              </Grid.Row>
            </Grid>
          </Form.Field>

          <Form.Field
            control={Select}
            options={this.unit_groupsOptions}
            label='ユニットグループ'
            placeholder='ユニットグループ'
            defaultValue={this.entry.entry_unit_group.name}
            onChange={changedUnitGroupId}
          />

          <Form.Field>
            <Form.TextArea
              label='Amazonアフィリエイトリンク'
              placeholder='Amazonアフィリエイトリンク'
              defaultValue={this.youtube.amazon}
              onChange={changedAmazon} />
          </Form.Field>

          {(() => {
            if (this.entry.entry_ustream)
            return <Form.Field
            control={Select}
            options={this.ustreamsOptions}
            label='Ustream放送'
            placeholder='Ustream放送'
            defaultValue={this.entry.entry_ustream.title}
            onChange={changedUstreamId} />
          })()}

          <DateInput
            // https://github.com/arfedulov/semantic-ui-calendar-react/blob/master/README.md
            name="リリース年月日"
            label="リリース年月日"
            placeholder="リリース年月日"
            dateFormat="YYYY-MM-DD"
            value={this.state.release_at}
            iconPosition="left"
            // inline="true"
            // inlineLabel="true"
            onChange={this.changedReleaseAt} />

          <Form.Field
            control={Select}
            options={this.genresOptions}
            label='ジャンル'
            placeholder='ジャンル'
            defaultValue={this.entry.entry_genre.name}
            onChange={changedGenreId}
          />

          <Form.Field>
            <Form.TextArea
              label='メモ'
              placeholder='メモ'
              defaultValue={this.youtube.memo}
              onChange={changedMemo} />
          </Form.Field>
          <Form.Checkbox label='I agree to the Terms and Conditions' />
          <Form.Field control={Button}>Submit</Form.Field>
        </Form>
      </Segment>
    )
  }
}

export class YoutubeEntry extends React.Component {
  getYoutubeEntry(id) {
    return fetch('http://localhost:8080/admin/v1/youtubes/' + id).then((response) => response.json())
  };

  constructor(props) {
    super(props);
    this.state = {data: null, release_at: null, membersOptions: null}
  }

  componentWillMount() {
    console.log('componentWillMount')
    const params = this.props.match.params
    this.getYoutubeEntry(params.id).then((response) => {
      this.setState({
        data: response
      })
    })
  }

  render() {
    if (this.state.data === null) {
      return (<div>wait...</div>)
    } else {
      return (
        <div className="ui container" style={{ marginTop: '7em'}}>
          <div name='Goosetune::Admin::Youtube::Entry'>
            <Header as='h2' textAlign='left'>Goosetune::Admin::Youtube::Entry</Header>
            <Divider />

            <YoutubeEntryEditForm data={this.state.data} />
          </div>
        </div>
      );
    }
  }
}
