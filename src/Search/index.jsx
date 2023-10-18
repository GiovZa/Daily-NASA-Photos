import { Component } from 'react';
import PropTypes from "prop-types";
import './styles.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  static propTypes = {
    onChange: PropTypes.func
  };

  static defaultProps = {
    onChange: () => { }
  }

  handleChange(event) {
    const { onChange } = this.props;
    onChange(event);
  }

  render() {
    return (
      <div className="Search">
        <input className="Search-input" placeholder="Enter your search here"  onChange={this.handleChange} />
      </div>
    );
  }
}

export default Search;
