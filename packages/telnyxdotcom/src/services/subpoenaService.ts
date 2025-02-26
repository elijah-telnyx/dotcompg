import constants from 'constants/env';
import api from 'lib/Api';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export const REGION = 'us-central-1';
export const BUCKET_NAME = 'telnyx-dotcom-subpoenas';

export interface FileUploadProps {
  Key: string;
  Body: Blob;
  ContentType?: string;
}

export interface FormProps {
  reference_id: string;
  full_name: string;
  agency: string;
  email: string;
  phone: string;
  fax?: string;
  subscriber_info: boolean;
  cdrs: boolean;
  billing_info: boolean;
  target_numbers: string;
  request_start_date: string;
  request_end_date: string;
  relevant_files: string;
  notes: string;
}

export interface OwnershipReportProps {
  phone_numbers: string[];
  start_datetime: string;
  end_datetime: string;
  reference_id: string;
}

export interface OwnershipReportResponse {
  data: {
    id: string;
    reference_id: string;
    status: 'pending' | 'processing' | 'success';
    start_datetime: string;
    end_datetime: string;
    phone_numbers: string[];
    report: {
      [report_id: string]: object;
    };
  };
}

export interface OwnershipReport {
  id: string;
  reference_id: string;
  status: 'pending' | 'processing' | 'success';
  start_datetime: string;
  end_datetime: string;
  phone_numbers: string[];
  report: {
    [report_id: string]: object;
  };
}

export interface ZapierResponse {
  attempt: string;
  id: string;
  request_id: string;
  status: 'success' | string;
}

// helper fn to match telnyx storage url format
const formatEndpointWithRegion = () => constants.api.CLOUD_STORAGE_BASE_URL.replace('https://', `https://${REGION}.`);

/**
 * POST nextjs api call, e.g. telnyx.com/api/$path
 * submits form + file as form-data using native fetch to utilize FormData obj
 */
const submitSubpoenaForm = async (formData: FormData) => {
  try {
    return await fetch('/api/law-enforcement-request', {
      method: 'POST',
      body: formData,
    });
  } catch (error) {
    console.log('Failed to submit subpoena form');
  }
};

/**
 * POST ownership report creation request, returns request id
 */
const createOwnershipReport = async ({ phone_numbers, reference_id, ...values }: OwnershipReportProps) => {
  const options: RequestInit = {};
  const start_datetime = new Date(values.start_datetime).toISOString();
  const end_datetime = new Date(values.end_datetime).toISOString();
  return api
    .post<OwnershipReportResponse>(
      `${constants.api.INVENTORY_TOOLS_BASE_URL}/v2/private/unprotected/ownership_reports`,
      { phone_numbers, start_datetime, end_datetime, reference_id },
      options
    )
    .then((response) => response.data);
};

/**
 * GET ownership report with retry options
 * request can take a long time to resolve
 */
const fetchOwnershipReport = async (reportId: string) => {
  const attempts = 60; // try every minute for an hour
  const delayMs = 60000;

  return api
    .get<OwnershipReportResponse>(
      `${constants.api.INVENTORY_TOOLS_BASE_URL}/v2/private/unprotected/ownership_reports/${reportId}`,
      {
        retry: {
          retryDelay: delayMs,
          retryOn: async (attempt, error, response) => {
            if (!response) return true;
            if (error) return false;

            const retryOwnershipReportResponse = (await response.clone().json()) as OwnershipReportResponse;

            return (
              (retryOwnershipReportResponse.data.status === 'pending' ||
                retryOwnershipReportResponse.data.status === 'processing') &&
              attempt < attempts - 1 // n-1, zero index
            );
          },
        },
      }
    )
    .then((response) => response.data);
};

/**
 * POST form + report request id to Zapier
 */
const submitInitialFormToZapier = async ({ form, reportRequestId }: { form: FormProps; reportRequestId: string }) => {
  const zapEndpoint = 'https://hooks.zapier.com/hooks/catch/11133073/bgrz99p';
  const params = {
    form,
    reportRequestId,
  };
  return api.post<ZapierResponse>(zapEndpoint, params);
};

/**
 * POST form + report to Zapier
 */
const submitFullReportToZapier = async ({ form, report }: { form: FormProps; report: OwnershipReport }) => {
  const zapEndpoint = 'https://hooks.zapier.com/hooks/catch/11133073/bvqbh7a';
  const params = {
    form,
    report,
  };
  return api.post<ZapierResponse>(zapEndpoint, params);
};

/**
 * S3 methods for telnyx storage
 */
const config = {
  forcePathStyle: true, // needs to be true to format telnyx storage url correctly
  endpoint: formatEndpointWithRegion(), // adds region to endpoint
  credentials: {
    accessKeyId: process.env.PORTAL_API_V2_KEY_PROD ?? '',
    secretAccessKey: process.env.PORTAL_API_V2_KEY_PROD ?? '',
  },
  region: REGION,
};

const s3 = new S3Client(config);

const uploadObjectCommand = (params: FileUploadProps) =>
  new PutObjectCommand({
    ...params,
    Bucket: BUCKET_NAME,
    Body: params.Body,
  });

/**
 * upload object to telnyx bucket
 */
const uploadObject = async (params: FileUploadProps) => {
  try {
    return await s3.send(uploadObjectCommand(params));
  } catch (e) {
    console.log({ error: e });
  } finally {
    s3.destroy();
  }
};

const service = {
  formatEndpointWithRegion,
  submitSubpoenaForm,
  createOwnershipReport,
  fetchOwnershipReport,
  submitInitialFormToZapier,
  submitFullReportToZapier,
  uploadObject,
};

export default service;
