export const asyncHandler = (fun) => {
  return (req, res, next) => {
    fun(req, res, next).catch((err) => {
      next(new Error(err, { cause: 500 }));
    });
  };
};
