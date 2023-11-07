import SearchForm from '../common/search-form';
import Article from '../common/article';
import { IPostInfo } from '../../lib/types';
import { useRouter } from 'next/router';

interface Props {
    query: string,
    foundPosts: IPostInfo[],
    totalPostsCount: number
}

export default function SearchPosts({
    query, 
    foundPosts,
    totalPostsCount}: Props) {

    const router = useRouter();
    const handleSearch = (query: string) => {
        router.push({
            pathname: '/search',
            query: { s: query },
        }); 
    }

    return (
        <>
            <div className="search_page_search_box_container mb-3">
                <p className="mt-0">If you're not happy with the results, please do another search</p>
                <SearchForm initQuery={query} handleSearch={handleSearch}/>
            </div>
            <hr/>
            <h1 className="search-title font-weight-bold mt-0 mb-0">
                Search Results For: "<b>{query}</b>"
            </h1>
            <p className="mt-0">
                {totalPostsCount} results found
            </p>
            {foundPosts.length > 0 ? (
                foundPosts.map((post, index) => (
                    <Article key={index} post={post} category={null} options={
                        {
                            layout :'horizontal',
                            showImage : true,
                            imageSize: 'medium',
                            headingSize: 'h3',
                            showPostMeta: true,
                            dateStyle: 'full',
                            showExcerpt: true
                        }
                    }/>
                ))
                ) : (<></>)
            }
        </>
    )
}