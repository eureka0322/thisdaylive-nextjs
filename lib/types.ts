export interface IPostInfo {
    title: string,
    slug: string,
    date: string,
    agoDate: string,
    thumbnail: string,
    thumbnail_small: string,
    thumbnail_medium: string,
    thumbnail_full: string,
    excerpt: string,
    author: IPostAuthorInfo,
    category: ICategoryInfo,
    url: string
}

export interface IPostAuthorInfo {
    id: number,
    slug: string,
    name: string 
}
  
export interface IPostData {
    id: number,
    title: string,
    slug: string,
    date: string,
    agoDate: string,
    content: string,
    categoryId: number,
    thumbnail: string,
    url: string,
    tags: number[]
}
  
export interface ICategoryInfo {
    id: number,
    slug: string,
    name: string
    count: number
}
  
export interface IAuthorInfo {
    id: number,
    name: string,
    description: string,
    avatar: string,
    slug: string
}
  
export interface IReduxState {
    account: {
      theme: string,
      searchbar: boolean
    },
    _persist: {
      version: number,
      rehydrated: boolean
    }
}

export interface IPostInfoWithMeta {
    data: IPostInfo[],
    meta: {
        total: number,
        totalPages: number
    }
}

export interface IArticleOption {
    layout: 'vertical' | 'horizontal' | 'horizontal no-img' | 'featured' | 'minimal' | 'slider' | 'vertical-slider' | 'minimal-related',
    showImage : boolean,
    imageSize: 'medium' | 'thumbnail' | 'full',
    headingSize: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | '',
    showPostMeta: boolean,
    dateStyle: 'full' | 'ago',
    showExcerpt: boolean
}

export interface IYoutubeFeedData {
    channel: IYoutubeFeedChannelInfo
    videos: IYoutubeFeedVideoInfo[]
}

export interface IYoutubeFeedChannelInfo {
    name: string,
    url: string,
    subscriberCount: string
}
export interface IYoutubeFeedVideoInfo {
    id: string,
    url: string,
    title: string,
    description: string,
    thumbnail: string,
    date: string,
    username: string,
    commentCount: string,
    likeCount: string,
    viewCount: string,
}

export interface IPostPathInfo {
    year: string,
    month: string,
    day: string,
    slug: string
}

export interface INextCategoryPost {
    categoryName:string;
    posts:IPostInfo[]
}

export interface ISectionHint {
    nextSection: {
        categorySlug: string, 
        categoryName: string,
        imageUrl: string
    },
    prevSection: {
        categorySlug: string, 
        categoryName: string,
        imageUrl: string
    }
}

export interface IPageInfo {
    title: string,
    content: string
}

