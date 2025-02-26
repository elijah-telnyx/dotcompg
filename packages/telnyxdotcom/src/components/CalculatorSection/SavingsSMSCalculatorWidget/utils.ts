import type { Tiers } from 'lib/Pricing/@types';
import type { NumberType, QuantityType } from './constants';
import type { SMSCalculatorApiResponse } from 'pages/api/pricing/sms-calculator';

export const parseQuantity = (quantity: QuantityType) => {
  const [min, max] = quantity.replace(/,/g, '').split(' - ');
  return { min: parseInt(min), max: parseInt(max) };
};

const countDecimals = (value: number) => {
  if (Math.floor(value) !== value) return value.toString().split('.')[1].length || 0;
  return 0;
};

export const roundNumber = (value: number) => {
  if (countDecimals(value) === 2) {
    return value;
  }
  return Math.round((value + Number.EPSILON) * 100) / 100;
};

export const findAmount = (tiers: Tiers[]) => (quantity: { min: number; max: number }) => {
  const tier = tiers.find((tier) => {
    if (tier.max === null) return tier;
    if (quantity.max <= Number(tier.max)) {
      return tier;
    }
    return false;
  });
  if (!tier) {
    return Number(tiers[0].amount);
  }
  return Number(tier.amount);
};

export const calculateSavings = ({
  priceData,
  numberType,
  numberOfSendMessages,
  numberOfReceiveMessages,
}: {
  priceData: SMSCalculatorApiResponse['data'];
  numberType: NumberType;
  numberOfSendMessages: QuantityType;
  numberOfReceiveMessages: QuantityType;
}) => {
  const type = numberType as keyof SMSCalculatorApiResponse['data']['telnyx']['send'];
  const sendQuantity = parseQuantity(numberOfSendMessages);
  const receiveQuantity = parseQuantity(numberOfReceiveMessages);

  const findAmountForSendTiers = {
    telnyx: findAmount(priceData.telnyx.send[type]),
    twilio: findAmount(priceData.twilio.send[type]),
  };
  const findAmountForReceiveTiers = {
    telnyx: findAmount(priceData.telnyx.receive[type]),
    twilio: findAmount(priceData.twilio.receive[type]),
  };

  const telnyxValues = {
    send: findAmountForSendTiers.telnyx(sendQuantity) * sendQuantity.max,
    receive: findAmountForReceiveTiers.telnyx(receiveQuantity) * receiveQuantity.max,
  };

  const twilioValues = {
    send: findAmountForSendTiers.twilio(sendQuantity) * sendQuantity.max,
    receive: findAmountForReceiveTiers.twilio(receiveQuantity) * receiveQuantity.max,
  };

  const telnyxTotal = roundNumber(telnyxValues.send + telnyxValues.receive);
  const twilioTotal = roundNumber(twilioValues.send + twilioValues.receive);
  const total = roundNumber(telnyxTotal + twilioTotal);

  return { telnyx: telnyxTotal, twilio: twilioTotal, total };
};
