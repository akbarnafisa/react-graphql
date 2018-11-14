import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/qureries'



class AddBook extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      genre: "",
      authorId: "",
    }
  }
  displayAuthors() {
    var data = this.props.getAuthorsQuery;
    if (data.loading) {
      return (<option disabled>Loading authors</option>);
    }
    return data.authors.map(author => {
      return (<option key={author.id} value={author.id}>{author.name}</option>);
    });

  }

  submitForm = (e) => {
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId,
      },
      refetchQueries: [{
        query: getBooksQuery
      }]
    })
    this.setState({
      name: "",
      genre: "",
      authorId: "",
    })
  }
  render() {
    return (
      <form id="add-book" onSubmit={this.submitForm}>
        <div className="field">
          <label>Book name:</label>
          <input
            type="text"
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })} />
        </div>
        <div className="field">
          <label>Genre:</label>
          <input
            type="text"
            value={this.state.genre}
            onChange={(e) => this.setState({ genre: e.target.value })} />
        </div>
        <div className="field">
          <label>Author:</label>
          <select
            value={this.state.authorId}
            onChange={(e) => this.setState({ authorId: e.target.value })} >
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>

      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" }),
)(AddBook);