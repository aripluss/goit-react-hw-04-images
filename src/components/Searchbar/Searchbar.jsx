import { Component } from 'react';
import PropTypes from 'prop-types';
import { MdOutlineImageSearch } from 'react-icons/md';
import { Searchbar, SearchForm } from './Searchbar.styled';

export default class SearchBar extends Component {
  state = {
    value: '',
  };

  handleInputChange = event => {
    const { value } = event.target;

    this.setState({ value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { value } = this.state;

    this.props.onSubmit({ value: value.trim() });

    this.setState({ value: '' });
  };

  render() {
    return (
      <Searchbar>
        <SearchForm onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <MdOutlineImageSearch size={'70%'} />
          </button>
          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="value"
            value={this.state.value}
            onChange={this.handleInputChange}
          />
        </SearchForm>
      </Searchbar>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
