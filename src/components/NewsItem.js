import React, { Component } from 'react';

export default class NewsItem extends Component {
    render() {
        let {title, description, imageUrl, newsUrl, author, date, source}=this.props;
        let d=new Date(date);
        date=d.toGMTString();
        return (
            <div className="my-3">
                <div className="card">
                    <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex:"1", left:'90%'}}>
                        {source}
                    </span>
                    <img src={!imageUrl?"https://cdn.cnn.com/cnnnext/dam/assets/211221125354-02-hyundai-compact-pickup-truck-super-tease.jpg":imageUrl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {author?author:"Unknown Source"} on {date}</small></p>
                        <a href={`${newsUrl}`} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        );
    }
}
