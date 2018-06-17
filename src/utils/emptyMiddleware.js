export default store => next => action => {
  if (!action) {
    return;
  }

  next(action);
};
