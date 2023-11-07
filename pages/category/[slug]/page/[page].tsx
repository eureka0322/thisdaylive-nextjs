import { 
  GetStaticProps, 
  GetStaticPaths, 
} from 'next';
import { 
  getLatestPosts, 
  getCategoryPosts, 
  getCategories,
  getFrontPageSidebarHtml,
  getLatestCategoryPosts,
  getCategoryTopPosts,
  getCategoryMorePosts
} from '../../../../lib/api';
import  {
  getCategoryIdFromSlug, 
  getNowDateString, 
  getCategoryFromSlug,
  getString,
  getCategoryLink
} from '../../../../lib/utils';
import CategoryPosts from '../../../../components/category/category-posts';
import { useRouter, Router } from 'next/router';

import {
  ICategoryInfo,
  IPostInfo
} from '../../../../lib/types';

import {useEffect} from 'react';
import NProgress from 'nprogress'; //nprogress module

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
  totalPageCount: number
}

export default function CategoryPostsPage({
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
  totalPageCount}: Props){
    
  const router = useRouter();
  const isMainPage = pageNum <= 1;
  const handlePagination = (page: number): void => {
    const url = `${getCategoryLink(category.slug)}/page/${page}`;
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
      if(router.isFallback){
        endLoading();
      }
    };
  }, []);

  useEffect(() => {
    if(!router.isFallback)
      endLoading();
    else
      startLoading();

  }, [router.isFallback]);


  if (router.isFallback) {
    return <div></div>
  }

  return (
    <CategoryPosts 
      pageNum = {pageNum} 
      categoryName = {categoryName} 
      latestPosts = {latestPosts} 
      breakingNews = {breakingNews} 
      sidebarHtml = {sidebarHtml}
      nowDateString = {nowDateString}
      latestCategoryPosts = {latestCategoryPosts}
      categoryTopPosts = {categoryTopPosts} 
      categoryMorePosts = {categoryMorePosts}
      category = {category}
      totalPageCount= {totalPageCount}
      handlePagination ={handlePagination}
      />
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];
  // const categoriesData = await getCategories(); 
  // const paths = categoriesData.map((cat) => ({
  //   params: { slug: cat.slug, page: '2' },
  // }));
  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const {params} = context;
  const categorySlug = getString(params.slug);
  const pageNum = parseInt(getString(params.page));
  const isMainPage = pageNum <= 1;

  const categoriesData = await getCategories(); 
  const category = getCategoryFromSlug(categoriesData, categorySlug);
  if(category == null){
    return {
      notFound: true
    }
  }
  const latestPosts = await getLatestPosts(5);
  const breakingCategoryId = getCategoryIdFromSlug(categoriesData, "breaking");
  const breakingNews = await getCategoryPosts(breakingCategoryId, 4);
  const sidebarHtml = await getFrontPageSidebarHtml();
  const nowDateString = getNowDateString();


  const totalPageCount = Math.ceil(category.count / 50);
  var latestCategoryPosts: IPostInfo[] = [];
  if(isMainPage)
    latestCategoryPosts = await getLatestCategoryPosts(category.id);

  const categoryTopPosts = await getCategoryTopPosts(category.id, pageNum);
  const categoryMorePosts = await getCategoryMorePosts(category.id, pageNum);

  // const latestPosts = [];
  // const breakingNews = [];
  // const sidebarHtml = "";
  return {
    props: { 
      pageNum:pageNum,
      categoryName: category.name,
      latestPosts: latestPosts,
      breakingNews: breakingNews,
      sidebarHtml: sidebarHtml,
      nowDateString: nowDateString,
      latestCategoryPosts: latestCategoryPosts, 
      categoryTopPosts : categoryTopPosts,
      categoryMorePosts : categoryMorePosts,
      category: category,
      totalPageCount: totalPageCount
    },
    revalidate: parseInt(process.env.BUILD_REVALIDATE_INTERVAL),
  }
}
