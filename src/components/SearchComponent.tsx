import React, { Component, ReactNode } from 'react';

interface ISearchState {
  searchValue: string;
}

interface ISearchProp {
  pokemonsUpdater: () => void
}

class SearchComponent extends Component<ISearchProp, ISearchState> {
  constructor(props: ISearchProp) {
    super(props); 
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

    this.state = {
      searchValue: localStorage.currentSearch || '' 
    };
  }

  handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      searchValue: event.target.value
    });
  }

  handleSearch() {
    localStorage.setItem("currentSearch", this.state.searchValue.toLowerCase());
    this.props.pokemonsUpdater()
  }

  render(): ReactNode {
    return (
      <div>
        <label htmlFor="search"></label>
        <input
          type="text"
          name="search"
          placeholder="Choose your pokemon!"
          value={this.state.searchValue}
          onChange={this.handleInputChange}
        />
        <button type="button" onClick={this.handleSearch}>
          SEARCH
        </button>
      </div>
    );
  }
}

export default SearchComponent;