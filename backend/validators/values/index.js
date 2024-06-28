import { check } from "express-validator";

const requiredValues = (props) => {
  let requiredFields = [];
  props.forEach((field) => {
    requiredFields.push(
      check(field).notEmpty().withMessage(`${field} is required`)
    );
  });

  return requiredFields;
};
export default requiredValues;
