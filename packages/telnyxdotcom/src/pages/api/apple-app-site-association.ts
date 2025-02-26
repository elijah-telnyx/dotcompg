import type { NextApiHandler } from 'next';
/**
 * @link https://telnyx.atlassian.net/browse/ENGDESK-31902
 */
const appleAppSiteAssociationJSON = {
  applinks: {
    apps: [],
    details: [
      {
        appIDs: ['YKUVNPU9FS.com.telnyx.everRoam'],
        paths: ['*'],
        components: [
          {
            '/': '/*',
          },
        ],
      },
    ],
  },
  webcredentials: {
    apps: ['YKUVNPU9FS.com.telnyx.everRoam'],
  },
} as const;

export const AppleAppSiteAssociation: NextApiHandler<typeof appleAppSiteAssociationJSON> = async (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(appleAppSiteAssociationJSON);
};

export default AppleAppSiteAssociation;
