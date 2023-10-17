import React from 'react';
import PropTypes from "prop-types";
import { useParams, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import './styles.scss';

const DetailView = ({ data }) => {
    const { id } = useParams();
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    // Utility function to get the next date
    const getNextDate = (currentDate) => {
        const dateObj = new Date(currentDate);
        dateObj.setDate(dateObj.getDate() + 1);
        return dateObj.toISOString().split('T')[0];
    };

    // Utility function to get the previous date
    const getPreviousDate = (currentDate) => {
        const dateObj = new Date(currentDate);
        dateObj.setDate(dateObj.getDate() - 1);
        return dateObj.toISOString().split('T')[0];
    };

    const handlePrevious = () => {
      const previousDate = getPreviousDate(id);
      if (id === "2023-01-01") // Compare the full date string
          return;
      navigate(`/detail/${previousDate}`);
  };
  
  const handleNext = () => {
      const nextDate = getNextDate(id);
      if (id === "2023-10-10") // Compare the full date string
          return;
      navigate(`/detail/${nextDate}`);
  };  

    const handleReturn = () => {
        navigate('/list'); // Use navigate instead of history.push to navigate back to the list view or any other default view
    };

    const detailView = data.find(apod => apod.date === id);
    if (!detailView) return <div>No data found for the selected date.</div>;

    return (
        <div className="DetailView">
            <button onClick={handleReturn}>Return</button>
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>
            <div className="card">
                <h1>{detailView.title}</h1>
                <h2>{detailView.date}</h2>
                <img src={detailView.url} alt={detailView.title} />
                <p>{detailView.explanation}</p>
            </div>
        </div>
    );
};

DetailView.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default DetailView;



