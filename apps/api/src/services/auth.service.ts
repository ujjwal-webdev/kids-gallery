import jwt from 'jsonwebtoken';
import { prisma } from '../config/database';
import { config } from '../config';
import { NotFoundError, UnauthorizedError } from '../utils/apiError';

// In dev: store OTPs in memory. In production, replace with Redis:
// await redis.setex(`otp:${phone}`, config.otpExpiryMinutes * 60, otp);
const otpStore = new Map<string, { otp: string; expiresAt: number }>();

export const authService = {
  async sendOtp(phone: string): Promise<void> {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + config.otpExpiryMinutes * 60 * 1000;
    otpStore.set(phone, { otp, expiresAt });
    if (config.nodeEnv === 'development') {
      console.log(`[DEV] OTP for ${phone}: ${otp}`);
    }
    // TODO (production): Send SMS via MSG91/Fast2SMS
  },

  async verifyOtp(phone: string, otp: string): Promise<{ token: string; user: object }> {
    // In dev, accept universal OTP "123456"
    if (config.nodeEnv !== 'development' || otp !== '123456') {
      const stored = otpStore.get(phone);
      if (!stored) throw new UnauthorizedError('OTP not found or expired');
      if (Date.now() > stored.expiresAt) {
        otpStore.delete(phone);
        throw new UnauthorizedError('OTP has expired');
      }
      if (stored.otp !== otp) throw new UnauthorizedError('Invalid OTP');
      otpStore.delete(phone);
    }

    let user = await prisma.user.findUnique({ where: { phone } });
    if (!user) {
      user = await prisma.user.create({ data: { phone } });
    }
    if (user.isBlocked) throw new UnauthorizedError('Account is blocked');
    await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });

    const token = jwt.sign(
      { id: user.id, phone: user.phone, role: user.role },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn } as jwt.SignOptions,
    );
    return { token, user };
  },

  async refreshToken(userId: string): Promise<{ token: string }> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundError('User not found');
    if (user.isBlocked) throw new UnauthorizedError('Account is blocked');
    const token = jwt.sign(
      { id: user.id, phone: user.phone, role: user.role },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn } as jwt.SignOptions,
    );
    return { token };
  },

  async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { addresses: { orderBy: { isDefault: 'desc' } } },
    });
    if (!user) throw new NotFoundError('User not found');
    return user;
  },
};
