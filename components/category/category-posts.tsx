import Head from 'next/head';
import Layout from "../common/layout";
import SearchContainer from '../common/search-container';
import BreakingNews from '../common/breaking-news';
import LatestHeadLines from '../common/latest-headlines';
import MastHead from '../common/masthead';
import { CMS_NAME } from '../../lib/constants';
import SideBar from '../common/side-bar';
import LatestPosts from '../common/latest-posts';
import MoreCategoryPosts from './more-category-posts';
import PaginationBar from '../common/pagination-bar';

import {
  ICategoryInfo,
  IPostInfo
} from '../../lib/types';

interface Props {
  pageNum: number, 
  categoryName: string, 
  latestPosts: IPostInfo[], 
  breakingNews: IPostInfo[], 
  sidebarHtml: string, 
  nowDateString: string, 
  latestCategoryPosts: IPostInfo[], 
  categoryTopPosts: IPostInfo[], 
  categoryMorePosts: IPostInfo[], 
  category: ICategoryInfo, 
  totalPageCount: number,
  handlePagination:(page: number) => void
}

export default function CategoryPosts({
    pageNum, 
    categoryName, 
    latestPosts, 
    breakingNews, 
    sidebarHtml, 
    nowDateString, 
    latestCategoryPosts, 
    categoryTopPosts, 
    categoryMorePosts, 
    category, 
    totalPageCount,
    handlePagination}: Props){
  const isMainPage = pageNum <= 1;
  return (
    <Layout >
      <Head>
        {!isMainPage && <title>{`${categoryName} - Page ${pageNum} - ${CMS_NAME}`}</title>}
        {isMainPage && <title>{`${categoryName} - ${CMS_NAME}`}</title>}
      </Head>
        <MastHead nowDateString={nowDateString}/>
        <SearchContainer initQuery=''/>
        <BreakingNews postsList={breakingNews}/>
        <LatestHeadLines postsList={latestPosts}/>
        <section className="py-5">
          <div className="wrapper container-fluid typography">
            <hr/>
            <div className="row">

              <div className="col-xs-12 col-md-9">
                { isMainPage &&
                  <LatestPosts  postsList={latestCategoryPosts} title={categoryName} options={{showViewAll:false}}/>
                }
                <MoreCategoryPosts title={isMainPage ? "" : categoryName} category={category} topPosts={categoryTopPosts} morePosts={categoryMorePosts}/>
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
