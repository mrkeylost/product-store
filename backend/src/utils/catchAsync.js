const handleAsync = (fn, operation = "unknown") => {
  return async function (req, res, next) {
    try {
      await fn(req, res, next);
    } catch (error) {
      console.error(`Failed in ${operation} controller`, error);
      next(error);
    }
  };
};

export default handleAsync;
