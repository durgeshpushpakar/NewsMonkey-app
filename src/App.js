import './App.css';

import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {Route, Routes } from 'react-router-dom';
// article regarding keys and lists in react
// https://reactjs.org/docs/lists-and-keys.html
export default class App extends Component {
    a="durgesh";
    render() {
        let pgSize=9;
        let country="in";
        return (
            <>
            <Navbar/>
            <div className="container">
                <Routes>
                    <Route path="/" element={<News key="general" pageSize={pgSize} country={country} category="general" />} />
                    <Route path="/business" element={<News key="business" pageSize={pgSize} country={country} category="business"/>} />
                    <Route path="/entertainment" element={<News key="entertainment" pageSize={pgSize} country={country} category="entertainment"/>} />
                    <Route path="/health" element={<News key="health" pageSize={pgSize} country={country} category="health"/>} />
                    <Route path="/science" element={<News key="science" pageSize={pgSize} country={country} category="science"/>} />
                    <Route path="/sports" element={<News key="sports" pageSize={pgSize} country={country} category="sports"/>} />
                    <Route path="/technology" element={<News key="technology" pageSize={pgSize} country={country} category="technology"/>} />
                </Routes>
            </div>
            </>
        )
    }
}


