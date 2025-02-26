/**
 * Video
 */
export const VIDEO_PARTICIPANT_USAGE = 'VIDEO-PARTICIPANT-USAGE';
export const VIDEO_COMPOSITION = 'VIDEO-COMPOSITION';
export const VIDEO_PARTICIPANT_RECORDING = 'VIDEO-PARTICIPANT-RECORDING';
/**
 * Media storage
 */
export const MEDIA_STORAGE_API = 'MEDIA-STORAGE-API';
/**
 * Media streaming
 */
export const MEDIA_STREAMING_USAGE_ORIGINATION = 'MEDIA-STREAMING-USAGE-ORIGINATION';
export const MEDIA_STREAMING_USAGE_TERMINATION = 'MEDIA-STREAMING-USAGE-TERMINATION';
/**
 * Conferencing
 */
export const CONFERENCE_PARTICIPANT_USAGE = 'CONFERENCE-PARTICIPANT-USAGE';
/**
 * Text to speech
 */
export const CALL_CONTROL_FEATURES_TTS = 'CALL-CONTROL-FEATURES-TTS';
/**
 * Speech to text
 */
export const CALL_CONTROL_FEATURES_RT_STT = 'CALL-CONTROL-FEATURES-RT-STT';
/**
 * Call recording
 */
export const CALL_RECORDING_ORIGINATION_USAGE = 'CALL-RECORDING-ORIGINATION-USAGE';
/**
 * Media forking
 */
export const MEDIA_FORKING_ORIGINATION_USAGE = 'MEDIA-FORKING-ORIGINATION-USAGE';
export const MEDIA_FORKING_TERMINATION_USAGE = 'MEDIA-FORKING-TERMINATION-USAGE';

/**
 * Receive a Fax via API
 */
export const FAX_API_PAGES_TERMINATION = 'FAX-API-PAGES-TERMINATION';

/**
 * Send a Fax via API
 */
export const FAX_API_PAGES_ORIGINATION = 'FAX-API-PAGES-ORIGINATION';

/**
 * Use Verify API via SMS
 *
 * Use Verify API via Voice call
 *
 * Use Verify API via Flash call
 */
export const VERIFY_CONVERSION = 'VERIFY-CONVERSION';

/**
 * Local Routing Number (LRN)
 */
export const LRN_DIPS = 'LRN-DIPS';

/**
 * Mobile Country Codes / Mobile National Codes (MCC/MNC)
 */
export const MCC_MNC_DIPS = 'MCC-MNC-DIPS';

/**
 * Inbound CNAM query
 */
export const CNAM_DIPS = 'CNAM-DIPS';

/**
 * Inbound CNAM
 */
export const CNAM_MRC = 'CNAM-MRC';

/**
 * Storage
 */
export const CLOUD_STORAGE = 'CLOUD-STORAGE';

/**
 * State change operations
 */
export const CLOUD_STORAGE_STATE_CHANGE_OPERATIONS = 'CLOUD-STORAGE-CHANGE-OPERATIONS';

/**
 * State read operations
 */
export const CLOUD_STORAGE_READ_OPERATIONS = 'CLOUD-STORAGE-READ-OPERATIONS';

/**
 * Local number
 */
export const DID_RATE0_USAGE = 'DID-RATE0-USAGE';

/**
 * Toll-free number
 */
export const TF_RATE0_USAGE = 'TF-RATE0-USAGE';

/**
 * Call recording
 */
export const CALL_RECORDING_TERMINATION_USAGE = 'CALL-RECORDING-TERMINATION-USAGE';

/**
 * Call recording storage
 */
export const CALL_RECORDING_STORAGE = 'CALL-RECORDING-STORAGE';

/**
 * Emergency calling
 */
export const E911_MRC = 'E911-MRC';

/**
 * First 10 channels
 *
 * Next 40 channels
 *
 * Next 200 channels
 *
 * 250+ channels
 */
export const CHANNEL_MRC = 'CHANNEL-MRC';

/**
 * Local numbers
 */
export const DID_RATE0_MRC = 'DID-RATE0-MRC';

/**
 * suffix for elastic-sip intl local prices
 * @example FR-LOCAL-RATE0-USAGE-FROM-LANDLINE
 */
export const LOCAL_RATE0_USAGE_FROM_LANDLINE = 'LOCAL-RATE0-USAGE-FROM-LANDLINE';

/**
 * suffix for elastic-sip intl local prices
 * @example FR-LOCAL-RATE0-USAGE-FROM-MOBILE
 */
export const LOCAL_RATE0_USAGE_FROM_MOBILE = 'LOCAL-RATE0-USAGE-FROM-MOBILE';

/**
 * suffix for numbers intl local prices
 * @example FR-LOCAL-RATE0-MRC
 */
export const LOCAL_RATE0_MRC = 'LOCAL-RATE0-MRC';

/**
 * suffix for numbers intl mobile prices
 * @example FR-MOBILE-RATE0-MRC
 */
export const MOBILE_RATE0_MRC = 'MOBILE-RATE0-MRC';

/**
 * suffix for numbers intl national prices
 * @example FR-NATIONAL-RATE0-MRC
 */
export const NATIONAL_RATE0_MRC = 'NATIONAL-RATE0-MRC';

/**
 * Toll-free numbers
 */
export const TF_RATE0_MRC = 'TF-RATE0-MRC';

/**
 * suffix for elastic-sip intl local prices
 * @example FR-TF-RATE0-USAGE-FROM-LANDLINE
 */
export const TF_RATE0_USAGE_FROM_LANDLINE = 'TF-RATE0-USAGE-FROM-LANDLINE';

/**
 * suffix for elastic-sip intl toll-free prices
 * @example FR-TF-RATE0-USAGE-FROM-MOBILE
 */
export const TF_RATE0_USAGE_FROM_MOBILE = 'TF-RATE0-USAGE-FROM-MOBILE';

/**
 * Using an existing number
 */
export const SMS_MRC = 'SMS-MRC';

/**
 * Voice API Pricing
 *
 * Local number
 */
export const CALL_CONTROL_RATE0_ORIGINATION = 'CALL-CONTROL-RATE0-ORIGINATION';
/**
 * Voice API Pricing
 *
 * Make outbound calls
 */
export const CALL_CONTROL_RATE0_TERMINATION = 'CALL-CONTROL-RATE0-TERMINATION';
/**
 * Voice API Pricing
 *
 * Standard answering machine detection
 */
export const CALL_CONTROL_FEATURES_STANDARD_AMD = 'CALL-CONTROL-FEATURES-STANDARD-AMD';
/**
 * Voice API Pricing
 *
 * Premium answering machine detection
 */
export const CALL_CONTROL_FEATURES_PREMIUM_AMD = 'CALL-CONTROL-FEATURES-PREMIUM-AMD';
/**
 * Voice API Pricing
 *
 * Call transfer
 */
export const CALL_CONTROL_FEATURES_SIP_REFER = 'CALL-CONTROL-FEATURES-SIP-REFER';
/**
 * Voice API Pricing
 *
 * Noise suppression
 */
export const CALL_CONTROL_FEATURES_NS = 'CALL-CONTROL-FEATURES-NS';
/**
 * IOT SIM Card
 *
 * SIM card
 */
export const WIRELESS_SIM_PURCHASE = 'WIRELESS-SIM-PURCHASE';
export const WIRELESS_ESIM_PURCHASE = 'WIRELESS-ESIM-PURCHASE';

/**
 * IOT SIM Card
 *
 * SIM card public ip assignment
 */
export const WIRELESS_IP_MRC = 'WIRELESS-IP-MRC';

/**
 * IOT SIM Card
 *
 * SIM card activation
 */
export const WIRELESS_SIM_MRC = 'WIRELESS-SIM-MRC';

/**
 * IOT SIM Card
 *
 * Shipping - within U.S. mainland
 */
export const WIRELESS_SIM_FREE_SHIPMENT = 'WIRELESS-SIM-FREE-SHIPMENT';

/**
 * IOT SIM Card
 *
 * Shipping - international and outside U.S. mainland
 */
export const WIRELESS_SIM_SHIPMENT = 'WIRELESS-SIM-SHIPMENT';

/**
 * IOT SIM Card
 *
 * Private Wireless Gateway
 */
export const WIRELESS_PRIVATE_GATEWAY_MRC = 'WIRELESS-PRIVATE-GATEWAY-MRC';

/**
 * AWS Per Month
 *
 * 50 MB
 */
export const TENA_VXC_EQUINIX_AWS_50_MRC = 'TENA-VXC-EQUINIX-AWS-50-MRC';

/**
 * Microsoft Azure Per Month
 *
 * 50 MB
 */
export const TENA_VXC_EQUINIX_AZURE_50_MRC = 'TENA-VXC-EQUINIX-AZURE-50-MRC';

/**
 * Google Cloud Per Month
 *
 * 50 MB
 */
export const TENA_VXC_EQUINIX_GC_50_MRC = 'TENA-VXC-EQUINIX-GC-50-MRC';

/**
 * AWS Per Month
 *
 * 100 MB
 */
export const TENA_VXC_EQUINIX_AWS_100_MRC = 'TENA-VXC-EQUINIX-AWS-100-MRC';

/**
 * Microsoft Azure Per Month
 *
 * 100 MB
 */
export const TENA_VXC_EQUINIX_AZURE_100_MRC = 'TENA-VXC-EQUINIX-AZURE-100-MRC';

/**
 * Google Cloud Per Month
 *
 * 100 MB
 */
export const TENA_VXC_EQUINIX_GC_100_MRC = 'TENA-VXC-EQUINIX-GC-100-MRC';

/**
 * AWS Per Month
 *
 * 200 MB
 */
export const TENA_VXC_EQUINIX_AWS_200_MRC = 'TENA-VXC-EQUINIX-AWS-200-MRC';

/**
 * Microsoft Azure Per Month
 *
 * 200 MB
 */
export const TENA_VXC_EQUINIX_AZURE_200_MRC = 'TENA-VXC-EQUINIX-AZURE-200-MRC';

/**
 * Google Cloud Per Month
 *
 * 200 MB
 */
export const TENA_VXC_EQUINIX_GC_200_MRC = 'TENA-VXC-EQUINIX-GC-200-MRC';

/**
 * AWS Per Month
 *
 * 300 MB
 */
export const TENA_VXC_EQUINIX_AWS_300_MRC = 'TENA-VXC-EQUINIX-AWS-300-MRC';

/**
 * Microsoft Azure Per Month
 *
 * 300 MB
 */
export const TENA_VXC_EQUINIX_AZURE_300_MRC = 'TENA-VXC-EQUINIX-AZURE-300-MRC';

/**
 * Google Cloud Per Month
 *
 * 300 MB
 */
export const TENA_VXC_EQUINIX_GC_300_MRC = 'TENA-VXC-EQUINIX-GC-300-MRC';

/**
 * AWS Per Month
 *
 * 400 MB
 */
export const TENA_VXC_EQUINIX_AWS_400_MRC = 'TENA-VXC-EQUINIX-AWS-400-MRC';

/**
 * Microsoft Azure Per Month
 *
 * 400 MB
 */
export const TENA_VXC_EQUINIX_AZURE_400_MRC = 'TENA-VXC-EQUINIX-AZURE-400-MRC';

/**
 * Google Cloud Per Month
 *
 * 400 MB
 */
export const TENA_VXC_EQUINIX_GC_400_MRC = 'TENA-VXC-EQUINIX-GC-400-MRC';

/**
 * AWS Per Month
 *
 * 500 MB
 */
export const TENA_VXC_EQUINIX_AWS_500_MRC = 'TENA-VXC-EQUINIX-AWS-500-MRC';

/**
 * Microsoft Azure Per Month
 *
 * 500 MB
 */
export const TENA_VXC_EQUINIX_AZURE_500_MRC = 'TENA-VXC-EQUINIX-AZURE-500-MRC';

/**
 * Google Cloud Per Month
 *
 * 500 MB
 */
export const TENA_VXC_EQUINIX_GC_500_MRC = 'TENA-VXC-EQUINIX-GC-500-MRC';

/**
 * Microsoft Azure Per Month
 *
 * 1000 MB
 */
export const TENA_VXC_EQUINIX_AZURE_1000_MRC = 'TENA-VXC-EQUINIX-AZURE-1000-MRC';

/**
 * Google Cloud Per Month
 *
 * 1000 MB
 */
export const TENA_VXC_EQUINIX_GC_1000_MRC = 'TENA-VXC-EQUINIX-GC-1000-MRC';

/**
 * SMS outbound messages
 */
export const SMS_RATE0_TERMINATION = 'SMS-RATE0-TERMINATION';
/**
 * SMS inbound messages
 */
export const SMS_RATE0_ORIGINATION = 'SMS-RATE0-ORIGINATION';
/**
 * MMS outbound messages
 */
export const MMS_RATE0_TERMINATION = 'MMS-RATE0-TERMINATION';
/**
 * MMS inbound messages
 */
export const MMS_RATE0_ORIGINATION = 'MMS-RATE0-ORIGINATION';

/**
 * Toll-free SMS outbound messages
 */
export const TF_SMS_RATE0_TERMINATION = 'TF-SMS-RATE0-TERMINATION';
/**
 * Toll-free SMS inbound messages
 */
export const TF_SMS_RATE0_ORIGINATION = 'TF-SMS-RATE0-ORIGINATION';

/**
 * Toll-free MMS outbound messages
 */
export const TF_MMS_RATE0_TERMINATION = 'TF-MMS-RATE0-TERMINATION';
/**
 * Toll-free MMS  inbound messages
 */
export const TF_MMS_RATE0_ORIGINATION = 'TF-MMS-RATE0-ORIGINATION';

/**
 * Short code SMS outbound messages
 */
export const SHORT_CODE_SMS_TERMINATION = 'SHORT-CODE-TERMINATION';
/**
 * Short code SMS inbound messages
 */
export const SHORT_CODE_SMS_ORIGINATION = 'SHORT-CODE-ORIGINATION';

/**
 * Short code MMS outbound messages
 */
export const SHORT_CODE_MMS_TERMINATION = 'SC-MMS-RATE0-TERMINATION';
/**
 * Short code MMS inbound messages
 */
export const SHORT_CODE_MMS_ORIGINATION = 'SC-MMS-RATE0-ORIGINATION';

/**
 * Long code SMS outbound messages
 */
export const LC_SMS_RATE0_TERMINATION = 'LC-SMS-RATE0-TERMINATION';
/**
 * Long code SMS inbound messages
 */
export const LC_SMS_RATE0_ORIGINATION = 'LC-SMS-RATE0-ORIGINATION';

/**
 * Long code MMS outbound messages
 */
export const LC_MMS_RATE0_TERMINATION = 'LC-MMS-RATE0-TERMINATION';
/**
 * Long code MMS inbound messages
 */
export const LC_MMS_RATE0_ORIGINATION = 'LC-MMS-RATE0-ORIGINATION';

/**
 * Media Streaming Web Socket Termination Usage
 */
export const MEDIA_STREAMING_WEB_SOCKET_TERMINATION_USAGE = 'MEDIA-STREAMING-WEB-SOCKET-TERMINATION-USAGE';

/**
 * Media Streaming Decrypted Termination
 */
export const MEDIA_STREAMING_DECRYPTED_TERMINATION = 'MEDIA-STREAMING-DECRYPTED-TERMINATION-USAGE';

/**
 * Wireless zones
 */

export const WIRELESS_ZONE_1_USAGE = 'WIRELESS-ZONE-1-USAGE';
export const WIRELESS_ZONE_2_USAGE = 'WIRELESS-ZONE-2-USAGE';
export const WIRELESS_ZONE_3_USAGE = 'WIRELESS-ZONE-3-USAGE';
export const WIRELESS_ZONE_4_USAGE = 'WIRELESS-ZONE-4-USAGE';
export const WIRELESS_ZONE_5_USAGE = 'WIRELESS-ZONE-5-USAGE';
export const WIRELESS_ZONE_6_USAGE = 'WIRELESS-ZONE-6-USAGE';
export const WIRELESS_ZONE_7_USAGE = 'WIRELESS-ZONE-7-USAGE';
export const WIRELESS_ZONE_8_USAGE = 'WIRELESS-ZONE-8-USAGE';
export const WIRELESS_ZONE_9_USAGE = 'WIRELESS-ZONE-9-USAGE';

/**
 * Bandwidth connection speed - global edge router
 */
export const GLOBAL_IP_10MBPS_MRC = 'GLOBAL-IP-10MBPS-MRC';
export const GLOBAL_IP_50MBPS_MRC = 'GLOBAL-IP-50MBPS-MRC';
export const GLOBAL_IP_100MBPS_MRC = 'GLOBAL-IP-100MBPS-MRC';
export const GLOBAL_IP_200MBPS_MRC = 'GLOBAL-IP-200MBPS-MRC';
export const GLOBAL_IP_500MBPS_MRC = 'GLOBAL-IP-500MBPS-MRC';
export const GLOBAL_IP_1GBPS_MRC = 'GLOBAL-IP-1GBPS-MRC';

/**
 * Telnyx speech-to-text transcription
 */
export const CALL_CONTROL_FEATURES_RT_STT_IN_HOUSE = 'CALL-CONTROL-FEATURES-RT-STT-IN-HOUSE';

export const CALL_CONTROL_FEATURES_CONVERSATIONAL_AI = 'CALL-CONTROL-FEATURES-CONVERSATIONAL-AI';

export const CALL_CONTROL_FEATURES_NEURAL_TTS = 'CALL-CONTROL-FEATURES-NEURAL-TTS';
