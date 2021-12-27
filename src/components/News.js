import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
// api link
// https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=89aff8ae38284d13aad285f81ab111d7
export default class News extends Component {
    static defaultProps={
        category:"general",
        country:"in",
        pageSize:9
    }
    static propTypes = {
        country:PropTypes.string,
        pageSize:PropTypes.number
    }
    capitalize=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    constructor(props){
        super(props);
        this.state={
            articles:[],
            loading:true,
            page:1,
            totalResults:0
        }
        document.title=`${this.capitalize(this.props.category)} - NewsMonkey`;
    }
    updateNews=async ()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=89aff8ae38284d13aad285f81ab111d7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data=await fetch(url);
        let parsedData=await data.json();
        this.setState({
            articles:parsedData.articles,
            loading:false,
            totalResults:parsedData.totalResults
        }) 
    }
    async componentDidMount(){
        this.updateNews();
    }
    fetchMoreData=async ()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=89aff8ae38284d13aad285f81ab111d7&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data=await fetch(url);
        let parsedData=await data.json();
        this.setState({
            page:this.state.page+1,
            articles:this.state.articles.concat(parsedData.articles),
            totalResults:parsedData.totalResults,
            loading:false
        }) 
    }
    
    render() {
        return (
            <>
                <h1 className="text-center">NewsMonkey- Top {this.capitalize(this.props.category)} Headlines </h1>
                <h3>{this.state.totalResults} Results</h3>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length!=this.state.totalResults}
                    loader={<Spinner/>}
                >
                    <div className="container">
                    <div className="row">
                        {this.state.articles.map((e)=>{
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
}
