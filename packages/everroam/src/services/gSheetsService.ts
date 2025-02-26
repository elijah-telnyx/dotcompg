import constants from "constants/env";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

// key is stored as base64 to preserve \n chars, have to first decode in order to use
const GOOGLE_PRIVATE_KEY = Buffer.from(
  process.env.GOOGLE_PRIVATE_KEY ?? "",
  "base64"
).toString("ascii");
const FILE_ID = constants.google.sheets.signup;
const COUNTER_SHEET_ID = 1991366272;

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: GOOGLE_PRIVATE_KEY,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const doc = new GoogleSpreadsheet(FILE_ID, serviceAccountAuth);

interface FormFieldsProps {
  reference_id: string;
  email: string;
  date: string;
}

/**
 * add row to google sheet using lib
 */
export const addRow = async (params: FormFieldsProps) => {
  await doc.loadInfo();
  const sheet = doc.sheetsById[0];
  const counter = doc.sheetsById[COUNTER_SHEET_ID];
  await counter.loadCells("A1");
  const a1 = counter.getCell(0, 0);
  if (a1.numberValue !== undefined) {
    const newValue = a1.numberValue + 1;
    a1.value = newValue;
    try {
      await counter.saveUpdatedCells();
      await sheet.addRow({ id: newValue, ...params }, { raw: true });
      return { ...params };
    } catch (e) {
      console.error("error adding row", e);
    }
  }
};
