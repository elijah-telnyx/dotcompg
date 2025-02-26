import constants from 'constants/env';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// key is stored as base64 to preserve \n chars, have to first decode in order to use
const GOOGLE_PRIVATE_KEY = Buffer.from(process.env.GOOGLE_PRIVATE_KEY ?? '', 'base64').toString('ascii');
const SUBPOENA_SHEET_ID = constants.GOOGLE.sheets.subpoenas;
const ID_SHEET = 1897471718;

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: GOOGLE_PRIVATE_KEY,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const doc = new GoogleSpreadsheet(SUBPOENA_SHEET_ID, serviceAccountAuth);

interface googleRowProps {
  [key: string]: string;
}

export const addRow = async (params: googleRowProps) => {
  await doc.loadInfo();
  const sheet = doc.sheetsById[0];
  const counter = doc.sheetsById[ID_SHEET];
  await counter.loadCells('A1');
  const a1 = counter.getCell(0, 0);
  if (a1.numberValue !== undefined) {
    const newValue = a1.numberValue + 1;
    a1.value = newValue;
    try {
      await counter.saveUpdatedCells();
      return sheet.addRow({ id: newValue, ...params }, { raw: true });
    } catch (e) {
      console.log('error adding row', e);
    }
  }
};
