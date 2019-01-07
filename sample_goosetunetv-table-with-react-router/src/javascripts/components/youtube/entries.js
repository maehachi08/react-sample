import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link } from 'react-router-dom'

export const YoutubeTableDataColumn = (props) => {
  return (
    props.entries.map((entry) =>
      <tr key={entry.youtube.id}>
        <td className="left aligned">
          <Link to={'/youtube/' + entry.youtube.id}>
            {entry.youtube.title}
          </Link>
        </td>
        <td>{entry.youtube.original_title}</td>
        <td>
          {/*
            === React Comment Start ===
              React mapをnestしたい時の書き方
                - return は必ずHTML要素で返す必要がある
            === React Comment End ===
          */}
          {
            entry.artists.map((artist) => {
              return (
                <div key={artist.id}>{artist.name}</div>
              )
            })
          }
        </td>
        <td>{entry.youtube.published}</td>
      </tr>
    )
  )
}

export class YoutubeEntriesTable extends React.Component {

  getYoutubeEntries() {
    return fetch('http://localhost:8080/admin/v1/youtubes').then((response) => response.json())
  };

  constructor(props) {
    super(props);
    this.state = {entries: []}
    this.getYoutubeEntries = this.getYoutubeEntries.bind(this);
  }

  componentDidMount() {
    console.log('=== componentDidMount ===');
    var response = this.getYoutubeEntries()
    response.then(response => {
      this.setState({
        entries: response
      })
    })
  }

  render() {
    return (
      <div>
        <table className="ui inverted right aligned table">
          <thead>
            <tr>
              <th className="left aligned">タイトル</th>
              <th>オリジナルタイトル</th>
              <th>アーティスト名</th>
              <th>公開日</th>
            </tr>
          </thead>
          <tbody>
            <YoutubeTableDataColumn entries={this.state.entries} />
          </tbody>
        </table>
      </div>
    );
  }
}
