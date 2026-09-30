const serviceResult = ({
  success = true,
  statusCode = 200,
  message = null,
  data = null,
}) => {
  return { success, statusCode, message, data };
};

export default serviceResult;
