import Head from 'next/head';
import Layout from "../common/layout";
import SearchContainer from '../common/search-container';
import BreakingNews from '../common/breaking-news';
import LatestHeadLines from '../common/latest-headlines';
import MastHead from '../common/masthead';
import { CMS_NAME } from '../../lib/constants';
import SideBar from '../common/side-bar';
import PaginationBar from '../common/pagination-bar';
import AuthorInfo from './author-info';
import MoreAuthorPosts from './more-author-posts';
import { 
  IAuthorInfo, 
  IPostInfo 
} from '../../lib/types';

interface Props {
  pageNum: number, 
  latestPosts: IPostInfo[], 
  breakingNews: IPostInfo[], 
  sidebarHtml: string, 
  nowDateString: string, 
  author: IAuthorInfo,
  authorPosts: IPostInfo[],
  totalPageCount: number,
  handlePagination: (page: number) => void
}


export default function AuthorPosts({
    pageNum, 
    latestPosts, 
    breakingNews, 
    sidebarHtml, 
    nowDateString, 
    author,
    authorPosts,
    totalPageCount,
    handlePagination}: Props){
  const isMainPage = pageNum <= 1;
  return (
    <Layout >
      <Head>
        {!isMainPage && <title>{`${author.name} - Page ${pageNum} - ${CMS_NAME}`}</title>}
        {isMainPage && <title>{`${author.name} - ${CMS_NAME}`}</title>}
      </Head>
        <MastHead nowDateString={nowDateString}/>
        <SearchContainer initQuery=''/>
        <BreakingNews postsList={breakingNews}/>
        <LatestHeadLines postsList={latestPosts}/>
        <section >
          <div className="wrapper container-fluid typography">
            <hr/>
            <div className="row">
              <div className="col-xs-12 col-md-9">
                <AuthorInfo author={author}/>
                <MoreAuthorPosts title={author.name} isMainPage={isMainPage} morePosts={authorPosts}/>
                { totalPageCount > 1 &&
                  <div className="row">
                      <div className="col-xs-12">
                          <PaginationBar currentPage={pageNum - 1} totalPageCount={totalPageCount} handlePagination={handlePagination}/>
                      </div>
                  </div>
                }
              </div>
              <div className="col-xs-12 col-md-3">
                <div id="sidebar">
                  <SideBar html={sidebarHtml}/>
                </div>
              </div>
            </div>
          </div>
        </section>
    </Layout>
  )
}
