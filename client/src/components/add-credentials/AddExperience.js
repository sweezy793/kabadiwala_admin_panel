import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addExperience } from "../../actions/profileActions";

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      subcategory: "",
      itemname: "",
      sno: "",
      quantity: "",
      toxic: "",
      description: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const expData = {
      category: this.state.category,
      subcategory: this.state.subcategory,
      itemname: this.state.itemname,
      sno: this.state.sno,
      toxic: this.state.toxic,
      quantity: this.state.quantity,
      description: this.state.description
    };

    this.props.addExperience(expData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-product">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-dark">
                <i className="fas fa-chevron-left mr-2" />
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Product</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Category"
                  name="category"
                  value={this.state.category}
                  onChange={this.onChange}
                  error={errors.category}
                />
                <TextFieldGroup
                  placeholder="* Sub Category"
                  name="subcategory"
                  value={this.state.subcategory}
                  onChange={this.onChange}
                  error={errors.subcategory}
                />
                <TextFieldGroup
                  placeholder="* Item Name"
                  name="itemname"
                  value={this.state.itemname}
                  onChange={this.onChange}
                  error={errors.itemname}
                />
                <TextFieldGroup
                  placeholder="* Serial"
                  name="sno"
                  value={this.state.sno}
                  onChange={this.onChange}
                  error={errors.sno}
                />
                <TextFieldGroup
                  placeholder="* Quantity"
                  name="quantity"
                  value={this.state.quantity}
                  onChange={this.onChange}
                  error={errors.quantity}
                />
                <TextFieldGroup
                  placeholder="* Toxic Value"
                  name="toxic"
                  value={this.state.toxic}
                  onChange={this.onChange}
                  error={errors.toxic}
                />
                <TextAreaFieldGroup
                  placeholder="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addExperience }
)(withRouter(AddExperience));
