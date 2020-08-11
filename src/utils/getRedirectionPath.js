export const getRedirectionPath = (location) => {
  return location.state === undefined ? "/" : location.state.from.pathname;
};
