import { v4 as uuidv4 } from 'uuid';

const sift = {
  /**
   * A single uuid per browser session, across any sift calls for an anonymous user.
   */
  siftSessionId: uuidv4(),
};

export default sift;
