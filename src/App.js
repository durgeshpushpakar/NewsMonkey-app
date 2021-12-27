import './App.css';

import React, {useState, useEffect} from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'
// article regarding keys and lists in react
// https://reactjs.org/docs/lists-and-keys.html
const App=()=>{
    const api=process.env.REACT_APP_API_KEY;
    const [progress, setProgress] = useState(0);
    let pgSize=9;
    let country="in";
    return (
        <>
        <Navbar/>
        <LoadingBar
            color='#f11946'
            progress={progress}
            height={3}
        />
        <div className="container">
            <Routes>
                <Route path="/" element={<News apiKey={api} setProgress={setProgress} key="general" pageSize={pgSize} country={country} category="general" />} />
                <Route path="/business" element={<News apiKey={api} setProgress={setProgress} key="business" pageSize={pgSize} country={country} category="business"/>} />
                <Route path="/entertainment" element={<News apiKey={api} setProgress={setProgress} key="entertainment" pageSize={pgSize} country={country} category="entertainment"/>} />
                <Route path="/health" element={<News apiKey={api} setProgress={setProgress} key="health" pageSize={pgSize} country={country} category="health"/>} />
                <Route path="/science" element={<News apiKey={api} setProgress={setProgress} key="science" pageSize={pgSize} country={country} category="science"/>} />
                <Route path="/sports" element={<News apiKey={api} setProgress={setProgress} key="sports" pageSize={pgSize} country={country} category="sports"/>} />
                <Route path="/technology" element={<News apiKey={api} setProgress={setProgress} key="technology" pageSize={pgSize} country={country} category="technology"/>} />
            </Routes>
        </div>
        </>
    )
}

export default App;
