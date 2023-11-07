import { 
  GetStaticProps, 
  GetStaticPaths, 
} from 'next';
import { 
  getLatestPosts, 
  getCategoryPosts, 
  getCategories,
  getFrontPageSidebarHtml,
  getAuthorPosts,
  getAuthor
} from '../../../../lib/api';
import  {
  getCategoryIdFromSlug, 
  getNowDateString, 
  getString,
  getCategoryLink
} from '../../../../lib/utils';
import AuthorPosts from '../../../../components/author/author-posts';
import { useRouter } from 'next/router';

import {
  IAuthorInfo,
  IPostInfo
} from '../../../../lib/types';

import NProgress from 'nprogress'; //nprogress module
import { Router } from 'next/router';  
import {useEffect} from 'react';

interface Props {
  pageNum: number, 
  latestPosts: IPostInfo[], 
  breakingNews: IPostInfo[], 
  sidebarHtml: string, 
  nowDateString: string, 
  author: IAuthorInfo,
  authorPosts: IPostInfo[],
  totalPageCount: number
}

export default function AuthorPostsPage({
  pageNum, 
  latestPosts, 
  breakingNews, 
  sidebarHtml, 
  nowDateString, 
  author,
  authorPosts,
  totalPageCount}: Props){

  const router = useRouter();
  const handlePagination = (page: number): void => {
    const url = `${getCategoryLink(author.slug)}/page/${page}`;
    router.push(url);
  }
  const startLoading = () => NProgress.start();
  const endLoading = () => NProgress.done();

  useEffect(() => {
    Router.events.on('routeChangeStart', startLoading);
    Router.events.on('routeChangeComplete', endLoading);
    Router.events.on('routeChangeError', endLoading);
    return () => {
      Router.events.off('routeChangeStart', startLoading);
      Router.events.off('routeChangeComplete', endLoading);
      Router.events.off('routeChangeError', endLoading);
    };
  }, []);
  return (
    <AuthorPosts 
      pageNum = {pageNum} 
      latestPosts = {latestPosts} 
      breakingNews = {breakingNews} 
      sidebarHtml = {sidebarHtml}
      nowDateString = {nowDateString}
      author = {author}
      authorPosts = {authorPosts}
      totalPageCount= {totalPageCount}
      handlePagination ={handlePagination}
      />
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const {params} = context;
  const authorSlug = getString(params.page);
  const pageNum = parseInt(getString(params.page));
  const isMainPage = pageNum <= 1;

  const authorData = await getAuthor(authorSlug);
  if(authorData == null){
    return {
      notFound: true
    }
  }
  
  const categoriesData = await getCategories(); 
  const latestPosts = await getLatestPosts(5);
  const breakingCategoryId = getCategoryIdFromSlug(categoriesData, "breaking");
  const breakingNews = await getCategoryPosts(breakingCategoryId, 4);
  const sidebarHtml = await getFrontPageSidebarHtml();
  const nowDateString = getNowDateString();
  const authorPostsResult = await getAuthorPosts(authorData.id, 50 , pageNum, categoriesData);
  const authorPosts = authorPostsResult.data;
  const totalPageCount = authorPostsResult.meta.totalPages;

  return {
    props: { 
      pageNum:pageNum,
      latestPosts: latestPosts,
      breakingNews: breakingNews,
      sidebarHtml: sidebarHtml,
      nowDateString: nowDateString,
      author:authorData,
      authorPosts: authorPosts,
      totalPageCount: totalPageCount
    },
    revalidate: parseInt(process.env.BUILD_REVALIDATE_INTERVAL),
  }
}


  