const serviceResult = ({
  success = 404,
  statusCode = 404,
  message = null,
  data = [],
}) => {
  return { success, statusCode, message, data };
};

export default serviceResult;
