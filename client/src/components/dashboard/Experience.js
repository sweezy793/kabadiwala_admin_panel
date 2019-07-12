import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profileActions";

class Experience extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }

  render() {
    const experience = this.props.experience.map(exp => (
      <tr className="table-light" key={exp._id}>
        <td>{exp.sno}</td>
        <td>{exp.category}</td>
        <td>{exp.subcategory}</td>
        <td>{exp.itemname}</td>
        <td>{exp.quantity}</td>
        <td>{exp.toxic}</td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, exp._id)}
            className="btn btn-outline-danger"
          >
            <i className="fas fa-trash-alt mr-1" />
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Items</h4>
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th>Serial No.</th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Toxic Emitted</th>
              <th />
            </tr>
            {experience}
          </thead>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(Experience);
