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
  getCategoryMorePosts,
  getSectionHintsData,
  getFrontPageSidebarHtmlAmp
} from '../../lib/api';
import  {
  getCategoryIdFromSlug, 
  getNowDateString, 
  getCategoryFromSlug,
  getString,
  getCategoryLink,
  getAmpUrl
} from '../../lib/utils';
import CategoryPosts from '../../components/category/category-posts';
import { useRouter, Router } from 'next/router';
import {
  ICategoryInfo,
  IPostInfo,
  ISectionHint
} from '../../lib/types';

import {useEffect} from 'react';
import NProgress from 'nprogress'; //nprogress module

import { useAmp } from 'next/amp';
import AmpCategoryPosts from '../../components/amp/category/category-posts';
export const config = { amp: 'hybrid' };

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
  sectionHintsData: ISectionHint,
  editorialPosts: IPostInfo[],
  backpagePosts: IPostInfo[],
  columnPosts: IPostInfo[],
  sidebarHtmlAmp: string
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
  totalPageCount,
  sectionHintsData,
  editorialPosts,
  backpagePosts,
  columnPosts,
  sidebarHtmlAmp}: Props){

  const isAmp = useAmp();

  const router = useRouter();
  const handlePagination = (page: number) => {
    const url = `${getCategoryLink(category.slug)}/page/${page}`;
    router.push(url);
  }
  const startLoading = () => NProgress.start();
  const endLoading = () => NProgress.done();

  useEffect(() => {
    if ("ontouchstart" in document.documentElement)
    {
      const currentUrl = router.asPath;
      const url = `${getAmpUrl(currentUrl)}`;
      window.location.href=url;
    }
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
    <>
    {!isAmp ?
    (
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
    ): (
      <AmpCategoryPosts 
        categoryName = {categoryName} 
        latestCategoryPosts = {latestCategoryPosts}
        categoryMorePosts = {categoryMorePosts}
        category = {category}
        sectionHintsData = {sectionHintsData}
        latestPosts = {latestPosts.slice(0,3)}
        backpagePosts = {backpagePosts}
        editorialPosts = {editorialPosts}
        columnPosts = {columnPosts}
        sidebarHtml = {sidebarHtmlAmp}
      />
    )
    }
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  if(process.env.APP_ENV == "prod"){
    const categoriesData = await getCategories(); 
    const paths = categoriesData.map((cat) => ({
      params: { slug: cat.slug },
    }))
    return {
      paths,
      fallback: false
    }
  }
  else{
    const paths = [];
    return {
      paths,
      fallback: 'blocking'
    }
  }
 
  
}

export const getStaticProps: GetStaticProps = async (context) => {
  console.log("category page");
  const {params} = context;
  const categorySlug = getString(params.slug);
  const pageNum = 1;
  const isMainPage = pageNum <= 1;

  const categoriesData = await getCategories(); 

  const latestPosts = await getLatestPosts(5);
  const breakingCategoryId = getCategoryIdFromSlug(categoriesData, "breaking");
  const breakingNews = await getCategoryPosts(breakingCategoryId, 4);
  const sidebarHtml = await getFrontPageSidebarHtml();
  const nowDateString = getNowDateString();

  const category = getCategoryFromSlug(categoriesData, categorySlug);

  const totalPageCount = Math.ceil(category.count / 50);
  var latestCategoryPosts: IPostInfo[] = [];
  if(isMainPage)
    latestCategoryPosts = await getLatestCategoryPosts(category.id);

  const categoryTopPosts = await getCategoryTopPosts(category.id, pageNum);
  const categoryMorePosts = await getCategoryMorePosts(category.id, pageNum);

  const sectionHintsData = await getSectionHintsData(categoriesData, category.slug);


  const editorialCategoryId = getCategoryIdFromSlug(categoriesData, "editorial");
  const editorialPosts = await getCategoryPosts(editorialCategoryId, 5, 1, 5, 0, 0, "medium")
  const backpageCategoryId = getCategoryIdFromSlug(categoriesData, "backpage");
  const backpagePosts = await getCategoryPosts(backpageCategoryId, 5, 1, 5, 0, 0, "medium");
  const columnCategoryId = getCategoryIdFromSlug(categoriesData, "column");
  const columnPosts = await getCategoryPosts(columnCategoryId, 5, 1, 5, 0, 0, "medium");

  const sidebarHtmlAmp = await getFrontPageSidebarHtmlAmp();

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
      totalPageCount: totalPageCount,
      //for amp mobile
      sectionHintsData: sectionHintsData,
      editorialPosts: editorialPosts,
      backpagePosts: backpagePosts,
      columnPosts: columnPosts,
      sidebarHtmlAmp: sidebarHtmlAmp,
    },
    revalidate: parseInt(process.env.BUILD_REVALIDATE_INTERVAL),
  }
}


