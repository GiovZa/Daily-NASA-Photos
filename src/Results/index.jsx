import { Component } from 'react';
import PropTypes from "prop-types";
import './styles.scss';

class Results extends Component {
  render() {
    return (
      <div className="Results">
          {this.props.players.map((player) => (
            <div className="Results-item" key={player.id}>
              <div className="Results-title">
                {`${player.first_name} ${player.last_name}`}
              </div>
            </div>
          ))}
      </div>
    );
  }
}

Results.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired
      // You can add other player properties here...
    })
  ).isRequired
};

Results.defaultProps = {
  player: []
}

export default Results;
