import React, {useEffect, useState} from 'react';
import './index.css';
import {Collection} from './Collection'

function App() {

    const [collections, setCollections] = useState([])

    useEffect(() => {
        fetch('https://64920b572f2c7ee6c2c95782.mockapi.io/collections')
            .then(res => res.json())
            .then(json => {
                setCollections(json);
            })
            .catch(err => {
                console.warn(err)
                alert('Cant get collections')
            })
    }, [])

    return (
        <div className="App">
            <h1>Моя коллекция фотографий</h1>
            <div className="top">
                <ul className="tags">
                    <li className="active">Все</li>
                    <li>Горы</li>
                    <li>Море</li>
                    <li>Архитектура</li>
                    <li>Города</li>
                </ul>
                <input className="search-input" placeholder="Поиск по названию"/>
            </div>
            <div className="content">
                {
                    collections.map((obj, index) => (
                        <Collection key={index} name={obj.name} images={obj.photos} />
                    ))
                }
            </div>
            <ul className="pagination">
                <li>1</li>
                <li className="active">2</li>
                <li>3</li>
            </ul>
        </div>
    );
}

export default App;