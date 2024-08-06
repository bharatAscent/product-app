// jest.setup.js
import '@testing-library/jest-dom';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const mockRouter = {
  push: jest.fn(),
  prefetch: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
};

const mockPathname = '/';
const mockSearchParams = {};

jest.mock('next/navigation', () => ({
  useRouter: jest.fn().mockReturnValue(mockRouter),
  usePathname: jest.fn().mockReturnValue(mockPathname),
  useSearchParams: jest.fn().mockReturnValue(mockSearchParams),
}));
