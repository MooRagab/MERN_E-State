export const asyncHandler = (fun) => {
  return (req, res, next) => {
    fun(req, res, next).catch((error) => {
      next(new Error(error, { cause: 500, error: error.message }));
    });
  };
};
 