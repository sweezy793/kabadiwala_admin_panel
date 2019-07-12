const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.sno = !isEmpty(data.sno) ? data.sno : "";
  data.category = !isEmpty(data.category) ? data.category : "";
  data.subcategory = !isEmpty(data.subcategory) ? data.subcategory : "";
  data.quantity = !isEmpty(data.quantity) ? data.quantity : "";
  data.toxic = !isEmpty(data.toxic) ? data.toxic : "";
  data.itemname = !isEmpty(data.itemname) ? data.itemname : "";

  if (Validator.isEmpty(data.sno)) {
    errors.sno = "Serial number field is required";
  }

  if (Validator.isEmpty(data.category)) {
    errors.category = "Category field is required";
  }

  if (Validator.isEmpty(data.subcategory)) {
    errors.subcategory = "Sub Category field is required";
  }
  if (Validator.isEmpty(data.itemname)) {
    errors.itemname = "Item Name field is required";
  }

  if (Validator.isEmpty(data.quantity)) {
    errors.quantity = "Quantity field is required";
  }

  if (Validator.isEmpty(data.toxic)) {
    errors.toxic = "Toxic Value is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
