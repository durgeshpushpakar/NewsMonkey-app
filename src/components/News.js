import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
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
    constructor(){
        super();
        this.state={
            articles:[],
            loading:false,
            page:1
        }
    }
    handleNext= async ()=>{
        if(Math.ceil(this.state.totalResults/this.props.pageSize)>=this.state.page+1){
            let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=89aff8ae38284d13aad285f81ab111d7&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true})
            let data=await fetch(url);
            let parsedData=await data.json();
            this.setState({
                page:this.state.page+1,
                articles:parsedData.articles,
                loading:false
            })
        }
        window.scroll(0,0);
    }
    handlePrev= async ()=>{
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=89aff8ae38284d13aad285f81ab111d7&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data=await fetch(url);
        let parsedData=await data.json();
        this.setState({
            page:this.state.page-1,
            articles:parsedData.articles,
            loading:false
        })       
        window.scroll(0,0);
    }
    async componentDidMount(){
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=89aff8ae38284d13aad285f81ab111d7&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data=await fetch(url);
        let parsedData=await data.json();
        this.setState({
            articles:parsedData.articles,
            totalResults:parsedData.totalResults,
            loading:false
        })
    }

    
    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center">NewsMonkey- Top Headlines</h1>
                {this.state.loading && <Spinner/>}
                <h3>Page-{this.state.page}/{Math.ceil(this.state.totalResults/this.props.pageSize)}</h3>
                <div className="row">
                    {!this.state.loading && this.state.articles.map((e)=>{
                        return <div className="col-md-4" key={e.url}>
                            <NewsItem title={e.title} description={e.description} imageUrl={e.urlToImage} newsUrl={e.url}/>
                        </div>
                    })}
                </div>
                <div className="container my-3 d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark mx-3" onClick={this.handlePrev}>&larr; Previous</button>
                    <button disabled={!(Math.ceil(this.state.totalResults/this.props.pageSize)>=this.state.page+1)} type="button" className="btn btn-dark mx-3" onClick={this.handleNext}>Next &rarr;</button>
                </div>
            </div>
        )        
    }
}
