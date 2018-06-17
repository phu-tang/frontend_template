import createBrowserHistory from 'history/createBrowserHistory';

const history = createBrowserHistory();
// let pageCount = 0;
// export const listener = history.listen((location, action) => {
//   // location is an object like window.location
//   if (action === 'PUSH') {
//     pageCount += 1;
//   }
//   if (action === 'POP') {
//     pageCount -= 1;
//   }
// });
//
// export const getPageCount = () => pageCount;
export default history;
