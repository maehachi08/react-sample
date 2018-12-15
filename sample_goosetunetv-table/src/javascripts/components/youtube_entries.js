import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactPaginate from 'react-paginate';

const YoutubeTableDataColumn = (props) => {
  return (
    props.entries.map((entry) =>
      <tr>
        <td>{entry.id}</td>
        <td>{entry.title}</td>
        <td>{entry.original_title}</td>
        <td>{entry.published}</td>
        <td>{entry.view_counts}</td>
        <td>{entry.ustream_id}</td>
        <td>{entry.release_at}</td>
        <td>{entry.memo}</td>
      </tr>
    )
  )
}

class Table extends React.Component {

  getYoutubeEntries() {
    // console.log(this.state.page);

    const params = new URLSearchParams();
    params.set('page', this.state.page);
    var response = fetch('http://api.goosetune.tv/v1/youtubes/desc?' + params.toString()).then(function(response) {
      // use response.headers
      // https://qiita.com/tomoyukilabs/items/9b464c53450acc0b9574
      var headers = {}
      for(var key of response.headers.keys() ){
        console.log(key + ' :' + response.headers.get(key));
        headers[key] = response.headers.get(key)
      }

      return { data: response.json(), headers: headers }
      // return response.json();
    });


    return response;
  };

  constructor(props) {
    super(props);
    this.state = {entries: [], page: 1}
    this.getYoutubeEntries = this.getYoutubeEntries.bind(this);
  }

  componentDidMount() {
    console.log('=== componentDidMount ===');
    var response = this.getYoutubeEntries()
    response.then(response => {

      var data = response['data'];
      data.then(response => {
        console.log(response.contents)
        this.setState({
          entries: response.contents
        })
      });

      var headers = response['headers']
      console.log(headers)
      this.setState({
        page: headers['x-next-page']
      })
    })
  }

  next_page() {
    this.setState(state => ({
      page: state.page + 1
    }));
  }

  onClickSubmit() {
    console.log('=== onClickSubmit ===');
    var response = this.getYoutubeEntries()
    response.then(response => {

      var data = response['data'];
      data.then(response => {
        console.log(response.contents)
        this.setState({
          entries: response.contents
        })
      });

      var headers = response['headers']
      console.log(headers)
      this.setState({
        page: headers['x-next-page']
      })
    })
  }

  render() {
    return (
      <div className="ui row">
        <table className="ui celled table">
          <thead>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>original_title</th>
              <th>published</th>
              <th>view_counts</th>
              <th>ustream_id</th>
              <th>release_at</th>
              <th>memo</th>
            </tr>
          </thead>
          <tbody>
            <YoutubeTableDataColumn entries={this.state.entries} />
          </tbody>
        </table>

        <input type="submit" value="追加" onClick={() => this.onClickSubmit()} />
      </div>
    );
  }
}

ReactDOM.render(
  <Table />,
  document.getElementById('root')
)
