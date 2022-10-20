import React,{useEffect,useState} from 'react'
import Newsitems from './Newsitems'
import Sprinner from './Sprinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";



const News=(props)=> {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    const capitalizeFirstLetter=(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
    }

    const updateNews = async () =>{
        props.setProgress(10);
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data=await fetch(url);
        props.setProgress(30);
        let parseData=await data.json();
        props.setProgress(70);
        setArticles(parseData.articles);
        setTotalResults(parseData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }
    useEffect(()=>{
        //document.title=`${capitalizeFirstLetter(props.category)} - News Site`;
        updateNews();
        //eslint-disable-next-line
    },[])

    const fetchMoreData =async() => {
        const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1)   
        // setState({ loading: true});
        let data=await fetch(url);
        let parseData=await data.json();
        setArticles(articles.concat(parseData.articles));
        setTotalResults(parseData.totalResults);
        setLoading(false);
        };

        return(
            <>
                    <h1 className='text-center' style={{fontWeight :'700',margin:'100'}}>NewsSite - Top HeadLines from {capitalizeFirstLetter(props.category)}</h1>
                    {loading &&<Sprinner/>}
                    <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Sprinner/>}
                    >
                        <div className='container my-3'> 
                            <div className='row my-5'>
                                {articles.map((element)=>{
                                    return <div className="col-md-3" key={element.url}>
                                        <Newsitems title={element.title?element.title.slice(0,40):''} description={element.description?element.description.slice(0,80):''} imageUrl={element.urlToImage?element.urlToImage:''} newsUrl={element.url?element.url:''} author={element.author?element.author:'Unknow'} date={element.publishedAt?element.publishedAt:''}/>
                                    </div>
                                })}
                            </div>
                        </div>
                    </InfiniteScroll>
            </>
        )
    }
News.defaultProps = {
    country:'in',
    pageSize: 8,
    category:'science'
}
News.propsType={
    country: PropTypes.string,
    pageSize: PropTypes,
    category:PropTypes.string
}

export default News