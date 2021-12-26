import './App.css';

import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
// article regarding keys and lists in react
// https://reactjs.org/docs/lists-and-keys.html
export default class App extends Component {
    a="durgesh";
    render() {
        return (
            <>
            <Navbar/>
            <div className="container">
                <News pageSize={5}/>
            </div>
            </>
        )
    }
}


