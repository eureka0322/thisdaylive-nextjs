import { useState, useEffect } from 'react';

interface Props {
  initQuery: string,
  handleSearch: (query: string) => void
}

export default function SearchForm({initQuery, handleSearch}: Props) {
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    setQuery(initQuery);
  },[initQuery]);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch(query);
  }
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(query);
    }
  };

  return (
      <form role="search" method="get" className="search-form" onSubmit={handleSubmit}>
          <label>
              <span className="screen-reader-text">Search for:</span>
              <input type="search" className="search-field" placeholder="Search …" value={query} name="s" onChange={handleInputChange} onKeyDown={handleInputKeyPress}/>
          </label>
          <input type="submit" className="search-submit" value="Search"/>
      </form>
  )
}
