import SearchForm from "./search-form";
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import {useEffect} from "react";
import { IReduxState } from "../../lib/types";

interface Props {
  initQuery: string;
}

export default function SearchContainer({initQuery}: Props) {
  const router = useRouter();

  const accountData = useSelector((state : IReduxState) => state.account);
  const toggle = accountData.searchbar;

  const handleSearch = (query: string) => {
    console.log('handlesearch');
    router.push({
      pathname: '/search',
      query: { s: query },
    }); 
  }


  return (
    <div id="search_container" className={`container-fluid wrapper ${toggle ? 'active' : ''}`}>
      <SearchForm initQuery={initQuery} handleSearch={handleSearch}/>
    </div>
  )
}
