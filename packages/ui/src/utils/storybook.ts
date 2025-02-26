import { useEffect, useRef } from 'react';
import { useGlobals } from '@storybook/client-api';
import { theme } from '../styles';

export const disablePropList = (properties: string[]) => {
  return properties.reduce((obj, prop) => {
    obj[prop] = {
      table: {
        disable: true,
      },
    };
    return obj;
  }, {} as Record<string, any>);
};

export const useDark = ({
  dark,
  isDark,
}: {
  dark?: boolean;
  isDark?: boolean;
}) => {
  const [globals, setGlobals] = useGlobals();
  const darkValue = dark || isDark;
  const darkRef = useRef(darkValue);
  useEffect(() => {
    // used to not trigger setGlobals all the time
    if (darkRef.current === darkValue) return;
    darkRef.current = darkValue;
    let bg = globals.backgrounds?.value || 'transparent';
    if (bg === theme.colors.black.value) bg = 'transparent';
    setGlobals({
      backgrounds: {
        value: darkValue ? theme.colors.black.value : bg,
      },
    });
  }, [darkValue]);
};
