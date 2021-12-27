import React, {useEffect, useState}from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
// api link
// https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}
const News=(props)=>{
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);    
    const capitalize=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const updateNews=async ()=>{
        props.setProgress(10);
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data=await fetch(url);
        let parsedData=await data.json();
        setArticles(parsedData.articles);
        setLoading(false);
        setTotalResults(parsedData.totalResults);
        props.setProgress(100);
    }
    useEffect(() => {
        updateNews();
        document.title=`${capitalize(props.category)} - NewsMonkey`;
}, [])
    const fetchMoreData=async ()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data=await fetch(url);
        let parsedData=await data.json();
        setArticles(articles.concat(parsedData.articles));
        setLoading(false);
        setTotalResults(parsedData.totalResults);
        setPage(page+1);
    }
    
    return (
        <>
            <h1 className="text-center" style={{marginTop:'90px'}}>NewsMonkey- Top {capitalize(props.category)} Headlines </h1>
            <h3>{totalResults} Results</h3>
            {loading && <Spinner/>}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length!==totalResults}
                loader={<Spinner/>}
            >
                <div className="container">
                <div className="row">
                    {articles.map((e)=>{
                        return <div className="col-md-4" key={e.url}>
                            <NewsItem title={e.title} description={e.description} imageUrl={e.urlToImage} newsUrl={e.url} author={e.author} date={e.publishedAt} source={e.source.name}/>
                        </div>
                    })}
                </div>
                </div>
            </InfiniteScroll>
        </>
    )        
}
News.defaultProps={
    category:"general",
    country:"in",
    pageSize:9
}
News.propTypes = {
    country:PropTypes.string,
    pageSize:PropTypes.number
}
export default News;