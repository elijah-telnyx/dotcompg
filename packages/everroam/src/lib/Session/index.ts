import { v4 as uuidv4 } from 'uuid';

const session = {
  /**
   * A single uuid per browser session, across any single-tab browser navigations.
   */
  sessionId: uuidv4(),
};

export default session;
