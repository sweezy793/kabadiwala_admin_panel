import React from "react";
import { Link } from "react-router-dom";

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Link to="/edit-profile" className="btn btn-primary">
        <i className="fas fa-user-circle mr-1" /> Edit Profile
      </Link>
      <Link to="/add-product" className="btn btn-primary">
        <i className="fas fa-plus-square mr-2" />
        Add Product
      </Link>
    </div>
  );
};

export default ProfileActions;
