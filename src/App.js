import './App.css';

import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
// article regarding keys and lists in react
// https://reactjs.org/docs/lists-and-keys.html
export default class App extends Component {
    constructor(){
        super();
        this.state={
            progress:0
        }
    }
    
    setProgress=(p)=>{
        this.setState({progress:p})
    }
    render() {
        let pgSize=9;
        let country="in";
        return (
            <>
            <Navbar/>
            <LoadingBar
                color='#f11946'
                progress={this.state.progress}
                height={3}
            />
            <div className="container">
                <Routes>
                    <Route path="/" element={<News setProgress={this.setProgress} key="general" pageSize={pgSize} country={country} category="general" />} />
                    <Route path="/business" element={<News setProgress={this.setProgress} key="business" pageSize={pgSize} country={country} category="business"/>} />
                    <Route path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" pageSize={pgSize} country={country} category="entertainment"/>} />
                    <Route path="/health" element={<News setProgress={this.setProgress} key="health" pageSize={pgSize} country={country} category="health"/>} />
                    <Route path="/science" element={<News setProgress={this.setProgress} key="science" pageSize={pgSize} country={country} category="science"/>} />
                    <Route path="/sports" element={<News setProgress={this.setProgress} key="sports" pageSize={pgSize} country={country} category="sports"/>} />
                    <Route path="/technology" element={<News setProgress={this.setProgress} key="technology" pageSize={pgSize} country={country} category="technology"/>} />
                </Routes>
            </div>
            </>
        )
    }
}


