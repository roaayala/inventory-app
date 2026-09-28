const serviceResult = ({
  success = 404,
  statusCode = 404,
  message = null,
  data = [],
}) => {
  (success, statusCode, message, data);
};

export default serviceResult;
