import React, {useEffect, useState} from 'react';
import './index.css';
import {Collection} from './Collection'

function App() {

    const [collections, setCollections] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [categoryId, setCategoryId] =useState(0)
    const [page, setPage] =useState(1)

    const categories = [
        {"name": "All"},
        {"name": "Sea"},
        {"name": "Mountains"},
        {"name": "Architecture"},
        {"name": "Cities"}
    ]

    useEffect(() => {
        const category = categoryId ? `category=${categoryId}` : ''
        fetch(`https://64920b572f2c7ee6c2c95782.mockapi.io/collections?page=${page}&limit=6&${category}`)
            .then(res => res.json())
            .then(json => {
                setCollections(json);
            })
            .catch(err => {
                console.warn(err)
                alert('Cant get collections')
            })
    }, [categoryId, page])

    return (
        <div className="App">
            <h1>My collection of photos</h1>
            <div className="top">
                <ul className="tags">
                    {categories.map((obj, index) => (
                            <li className={categoryId === index ? 'active' : ''}
                                onClick={() => setCategoryId(index)}
                                key={obj.name}>
                                {obj.name}</li>
                            )
                        )
                    }
                </ul>
                <input
                    value={searchValue}
                    onChange={(value) => setSearchValue(value.target.value)}
                    className="search-input"
                    placeholder="Search by title"/>
            </div>
            <div className="content">
                {
                    collections
                        .filter(obj => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
                        .map((obj, index) => (
                        <Collection key={index} name={obj.name} images={obj.photos} />
                    ))
                }
            </div>
            <ul className="pagination">
                {
                    [...Array(5)].map((_, i) => (
                        <li
                            onClick={() => setPage(i + 1)}
                            className={page === i + 1 ? 'active' : ''}
                            key={i}
                        >{i + 1}</li>
                        )
                    )
                }
            </ul>
        </div>
    );
}

export default App;