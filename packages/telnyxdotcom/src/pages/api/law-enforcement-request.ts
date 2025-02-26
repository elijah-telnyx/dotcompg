/**
 * @description API endpoint for handling law enforcement requests
 * 1. store file on telnyx storage bucket (dotcom account)
 * 2. add row to google sheet
 * 3. create ownership report request
 * 4. submit form info + request id to first zapier endpoint
 * 5. submit form info + fetched report to second zapier endpoint
 */

import type { NextApiHandler } from 'next';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import subpoenaService, { BUCKET_NAME, type FileUploadProps } from 'services/subpoenaService';
import { addRow } from 'services/gSheetsService';
import SegmentService, { SEGMENT_TRACK_EVENT_NAMES } from 'services/Segment';
import convertToE164 from 'utils/convertToE164';
import { errorLogger } from 'utils/errorHandler/errorLogger';

// nextjs config https://nextjs.org/docs/pages/building-your-application/routing/api-routes
export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

// configure multer to store file in memory instead of disk
const storage = multer.memoryStorage();
const upload = multer({ storage });

const handler: NextApiHandler = async (req: any, res: any) => {
  const { method } = req;
  if (method !== 'POST') {
    throw new Error('Method Not Allowed');
  }

  // only process submission if multer can successfully parse the file
  upload.single('relevant_files')(req, res, async (err) => {
    if (err) {
      console.log(err);
      return;
    }
    const E164NumbersString = convertToE164(req.body.target_numbers);

    try {
      const reference_id = uuidv4();
      const reportRequest = await subpoenaService.createOwnershipReport({
        phone_numbers: E164NumbersString.split(','),
        start_datetime: req.body.request_start_date,
        end_datetime: req.body.request_end_date,
        reference_id,
      });

      const storageResponse = await subpoenaService.uploadObject(<FileUploadProps>{
        Key: reference_id,
        Body: req.file.buffer,
      });

      if (storageResponse?.$metadata.httpStatusCode === 200) {
        const values = {
          ...req.body,
          target_numbers: E164NumbersString,
          reference_id,
          relevant_files: `${subpoenaService.formatEndpointWithRegion()}/${BUCKET_NAME}/${reference_id}`,
        };
        addRow(values);

        const initialZapRequest = await subpoenaService.submitInitialFormToZapier({
          form: values,
          reportRequestId: reportRequest.id,
        });

        if (initialZapRequest.status === 'success') {
          res.status(storageResponse.$metadata.httpStatusCode).json({ success: true });
          const report = await subpoenaService.fetchOwnershipReport(reportRequest.id);
          subpoenaService.submitFullReportToZapier({ form: values, report }).then(() =>
            SegmentService.track(
              SEGMENT_TRACK_EVENT_NAMES.FORM_SUBMIT,
              { form_data: { ...values, reportRequestId: reportRequest.id }, form_type: 'Law Enforcement Request' },
              {
                integrations: {
                  All: true,
                  'Marketo V2': false,
                },
              }
            )
          );
          return;
        }
      }
    } catch (e) {
      errorLogger({
        error: new Error('Failed to submit subpoena request', { cause: e }),
        url: '/law-enforcement-request',
      });

      return res.status(500).json({ success: false, e });
    }
  });
};

export default handler;
