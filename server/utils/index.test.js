// index.test.js

import { hashString, compareString, createJWT } from './index';
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

// Mock bcrypt functions
jest.mock('bcryptjs', () => ({
  genSalt: jest.fn().mockResolvedValue('salt'),
  hash: jest.fn().mockResolvedValue('hashedPassword'),
  compare: jest.fn().mockResolvedValue(true), // Assuming passwords match for testing
}));

// Mock JWT functions
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mockedToken'),
}));

describe('Hash and JWT Functions', () => {
  test('hashString should hash a string correctly', async () => {
    const hashedPassword = await hashString('password');
    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith('password', 'salt');
    expect(hashedPassword).toBe('hashedPassword');
  });

  test('compareString should compare passwords correctly', async () => {
    const isMatch = await compareString('password', 'hashedPassword');
    expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedPassword');
    expect(isMatch).toBe(true);
  });

  test('createJWT should create a JWT token', () => {
    const token = createJWT('userId');
    expect(JWT.sign).toHaveBeenCalledWith({ userId: 'userId' }, 'secret', {
      expiresIn: '1d',
    });
    expect(token).toBe('mockedToken');
  });
});

