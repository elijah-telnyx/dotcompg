import type { ReactNode } from 'react';
import ErrorBoundary from './ErrorBoundary';

/**
 * @TODO:
 * Check this again when website go live
 */
const isProd = process.env.NEXT_PUBLIC_RUNTIME_ENV === 'production';

const Children = ({ children }: { children: ReactNode }) => <>{children}</>;

export default isProd ? Children : ErrorBoundary;
