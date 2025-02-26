/**
 * @overview Hard-coded errors from
 * https://github.com/team-telnyx/docs/blob/master/public/errors.toml
 */
const errors = {
  'bad-request': {
    // HTTP status: 400
    code: '10015',
    title: 'Bad Request',
    detail: 'The request failed because it was not well-formed.',
  },
  'not-found': {
    // HTTP status: 404
    code: '10005',
    title: 'Resource not found',
    detail: 'The requested resource or URL could not be found.',
  },
  'unexpected-error': {
    // HTTP status: 500
    code: '10007',
    title: 'Unexpected error',
    detail: 'An unexpected error occured.',
  },
};

export default errors;
