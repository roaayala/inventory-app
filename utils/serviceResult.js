const serviceResult = {
  forbidden: ({ message }) => {
    return {
      success: false,
      statusCode: 403,
      message,
    };
  },
};

export default serviceResult;
