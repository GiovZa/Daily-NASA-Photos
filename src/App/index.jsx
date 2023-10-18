// App.jsx

import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../Header';
import ListView from '../ListView';
import GalleryView from '../GalleryView';
import DetailView from '../DetailView';
import axios from 'axios';
import './styles.scss'; // Import the SCSS file

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apodData: null,
      date: new Date().toISOString().split('T')[0],
      loading: true
    };    
    //this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  async componentDidMount() {
    const today = new Date();
  const yesterday = new Date(today);

  yesterday.setDate(yesterday.getDate() - 1);

  const dd = String(yesterday.getDate()).padStart(2, '0');
  const mm = String(yesterday.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = yesterday.getFullYear();

  const yesterdayStr = `${yyyy}-${mm}-${dd}`;

    const apiKey = 'otOZozWVHbXjew3bI4ABFpgDkcVEFPwc7lPbrdZ2';
    const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=2023-01-01&end_date=${yesterdayStr}&thumbs=true`);
    this.setState({ apodData: response.data, loading: false });
  }
  

  render() {
      if (this.state.loading) {
        return (
          <div className="loading-screen">
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ animationDuration: '30s' }}></div>
            </div>
          </div>
        );
      }
    
    return (
      <Router>
        <div className="App">
          <Header />
          <Routes>
              <Route path="/list" element={<ListView data={this.state.apodData} />} />
              <Route path="/gallery" element={<GalleryView data={this.state.apodData} />} />
              <Route path="/detail/:id" element={<DetailView data={this.state.apodData} />} />
              <Route path="/" element={<ListView data={this.state.apodData} />} /> {/* Default route */}
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;

