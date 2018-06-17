import {
  createAPIMiddleware,
  defaultTransformers,
  composeAdapters
} from 'redux-api-call';

// const meta =
//   process.env.NODE_ENV !== "production"
//     ? {
//         // ask_location: false,
//         // message: 'api.',
//         // rem_closed_ms: 3000,
//         // rem_open_ms: 1000,
//         // supporter_avatar: 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png',
//         // supporter_name: 'Tung',
//         // supporter_status: 3,
//       }
//     : {};

const transformers = [...defaultTransformers];

const apiMiddleware = createAPIMiddleware(composeAdapters(...transformers));

export default apiMiddleware;
