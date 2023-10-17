import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import Search from '../Search';
import './styles.scss';

const ListView = ({ data }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const [sortProperty, setSortProperty] = useState('date'); // Either 'date' or 'title'
    const [sortOrder, setSortOrder] = useState('asc'); // Either 'asc' or 'desc'

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        const newFilteredData = data.filter(apod => 
            apod.title.toLowerCase().includes(value.toLowerCase()) || 
            apod.date.includes(value)
        ).sort((a, b) => {
            const propA = sortProperty === 'date' ? a.date : a.title.toLowerCase();
            const propB = sortProperty === 'date' ? b.date : b.title.toLowerCase();
            return (propA < propB ? -1 : 1) * (sortOrder === 'asc' ? 1 : -1);
        });

        setFilteredData(newFilteredData);
    };

const handleSortChange = (property) => {
  setSortProperty(property);
  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Toggle sort order

  // Sort the filtered data based on the new sort property and order
  const newFilteredData = [...filteredData].sort((a, b) => {
    const propA = property === 'date' ? a.date : a.title.toLowerCase();
    const propB = property === 'date' ? b.date : b.title.toLowerCase();
    return (propA < propB ? -1 : 1) * (sortOrder === 'asc' ? -1 : 1); // Toggle sort order within the sort function
  });

  setFilteredData(newFilteredData);
};


    if (!filteredData || filteredData.length === 0) 
    return (
        <div className="ListView">
            <Search onChange={handleSearchChange} />
            <h1>No data available.</h1>
        </div>
    )

    return (
        <div className="ListView">
            <Search onChange={handleSearchChange} />
            <button onClick={() => handleSortChange('title')}>Sort by Title</button>
            <button onClick={() => handleSortChange('date')}>Sort by Date</button>
            {filteredData.map(apod => (
                <Link to={`/detail/${apod.date}`} key={apod.date}>
                    <div className="card">
                        <h1>{apod.title}</h1>
                        <h2>{apod.date}</h2>
                        <img src={apod.url} alt={apod.title} />
                    </div>
                </Link>
            ))}
        </div>
    );
};

ListView.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ListView;


