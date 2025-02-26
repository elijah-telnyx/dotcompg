import { useEffect, useCallback } from 'react';
import { useRef } from 'react';
import { useReducer } from 'react';

export const STATUS = {
  idle: 'idle',
  pending: 'pending',
  resolved: 'resolved',
  rejected: 'rejected',
} as const;

interface STATE<T = unknown> {
  data: T | null;
  error: unknown;
  status: (typeof STATUS)[keyof typeof STATUS];
}
type ACTION<T> = Omit<Partial<STATE<T>>, 'status'> & {
  type: STATE<T>['status'];
};

function useSafeDispatch<T>(dispatch: React.Dispatch<T>) {
  const mounted = useRef<boolean>(false);

  useEffect(function setMounted() {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return useCallback(
    (...args: [any]) => {
      if (mounted.current) return dispatch(...args);
      console.warn('Warning: Cannot call dispatch. Component is not mounted.');
      return undefined;
    },
    [dispatch]
  );
}

function asyncReducer<T>(state: STATE<T>, action: ACTION<T>): STATE<T> {
  switch (action.type) {
    case STATUS.idle: {
      return { status: STATUS.idle, data: null, error: null };
    }
    case STATUS.pending: {
      return { status: STATUS.pending, data: null, error: null };
    }
    case STATUS.resolved: {
      return { status: STATUS.resolved, data: action.data || null, error: null };
    }
    case STATUS.rejected: {
      return { status: STATUS.rejected, data: null, error: action.error };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function useAsync<T>(initialState?: Omit<Partial<STATE<T>>, 'status'>) {
  const [state, unsafeDispatch] = useReducer(asyncReducer as typeof asyncReducer<T>, {
    status: STATUS.idle,
    data: null,
    error: null,
    ...initialState,
  });

  const dispatch = useSafeDispatch<ACTION<T>>(unsafeDispatch);
  const { data, error, status } = state;

  const run = useCallback(
    (promise: Promise<typeof data>) => {
      dispatch({ type: STATUS.pending });
      promise.then(
        (data) => {
          dispatch({ type: STATUS.resolved, data });
        },
        (error) => {
          dispatch({ type: STATUS.rejected, error });
        }
      );
    },
    [dispatch]
  );

  return {
    error,
    status,
    data,
    run,
  };
}

export default useAsync;
