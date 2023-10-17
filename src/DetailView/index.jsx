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

    const detailView = data.find(apod => apod.date === id);
    if (!detailView) return <div>No data found for the selected date.</div>;

    return (
    <div className="DetailView" style={{backgroundColor: 'gray'}}> {/* Set the background color here */}
      <div className="card">
          <h1>{detailView.title}</h1>
          <h2>{detailView.date}</h2>
          
          <div className="media-navigation">
              <button onClick={handlePrevious}>Previous</button>

              {detailView.media_type === 'video' ? (
                  <iframe title={detailView.title} src={detailView.url} allowFullScreen alt={`Video: ${detailView.title}`}></iframe>
              ) : (
                  <img src={detailView.url} alt={`Image: ${detailView.title}`} />
              )}

              <button onClick={handleNext}>Next</button>
          </div>

          <p>{detailView.explanation}</p>
      </div>
  </div>
  );
};

DetailView.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default DetailView;



