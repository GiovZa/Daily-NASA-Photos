import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

class GalleryView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedMonth: null,
            displayedImages: this.props.data
        };
    }

    filterByMonth(month) {
        if (month === this.state.selectedMonth) {
            // If clicked on the same month, reset
            this.setState({ displayedImages: this.props.data, selectedMonth: null });
        } else {
            const firstImageIndexOfMonth = this.props.data.findIndex(apod => new Date(apod.date).getMonth() === month);
            let previousImage = null;
            if (firstImageIndexOfMonth > 0) {
                previousImage = this.props.data[firstImageIndexOfMonth - 1];
            }

            const filteredImages = this.props.data.filter(apod => new Date(apod.date).getMonth() === month);

            if (previousImage) {
                filteredImages.unshift(previousImage);
            }
            
            filteredImages.pop();
            this.setState({ displayedImages: filteredImages, selectedMonth: month });
        }
    }

    filterByKeyword(keyword) {
    const filteredImages = this.props.data.filter(apod => 
        apod.title.toLowerCase().includes(keyword.toLowerCase())
    );
    this.setState({ displayedImages: filteredImages });
    }

    render() {

        const keywords = ["moon", "sun", "galaxy", "comet", "earth", "hubble", "nebula", "eclipse", "milky way", "crescent", "space", "mars"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const { displayedImages } = this.state;

        return (
            <div className="GalleryView">
                <div className="month-filters">
                    {months.map((monthName, index) => (
                        <button key={monthName} onClick={() => this.filterByMonth(index)}>
                            {monthName}
                        </button>
                    ))}
                </div>

                <div className="keyword-filters">
                    {keywords.map(keyword => (
                        <button key={keyword} onClick={() => this.filterByKeyword(keyword)}>
                            {keyword}
                        </button>
                    ))}
                </div>

                <div className="card-container">
                    {displayedImages.length ? (
                        displayedImages.map(apod => (
                            <Link to={`/detail/${apod.date}`} key={apod.date}>
                                <div className="card">
                                {apod.media_type === 'video' ? (
                                    <img src={apod.thumbnail_url} alt={`Video: ${apod.title}`} />
                                ) : (
                                    <img src={apod.url} alt={apod.title} />
                                )}
                                </div>
                            </Link>
                        ))
                    ) : (
                        <h2>Images Coming Soon!</h2>
                    )}
                </div>
            </div>
        );
    }

}

export default GalleryView;
