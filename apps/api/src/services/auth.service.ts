import jwt from 'jsonwebtoken';
import { prisma } from '../config/database';
import { config } from '../config';
import { UnauthorizedError } from '../utils/apiError';

export const authService = {
  async sendOtp(phone: string): Promise<void> {
    // TODO: Generate OTP, store in Redis, send via SMS (Twilio/MSG91/Fast2SMS)
    const _otp = Math.floor(100000 + Math.random() * 900000).toString();
    // TODO: await redis.setex(`otp:${phone}`, config.otpExpiryMinutes * 60, _otp);
    // TODO: Send SMS via provider (MSG91/Fast2SMS)
  },

  async verifyOtp(phone: string, otp: string): Promise<{ token: string; user: object }> {
    // TODO: Verify OTP from Redis
    // const storedOtp = await redis.get(`otp:${phone}`);
    // if (!storedOtp || storedOtp !== otp) throw new UnauthorizedError('Invalid OTP');
    // await redis.del(`otp:${phone}`);
    // Stub: accept any OTP in dev — remove in production
    const _otp = otp;
    void _otp;

    // Find or create user
    let user = await prisma.user.findUnique({ where: { phone } });
    if (!user) {
      user = await prisma.user.create({
        data: { phone },
      });
    }

    if (user.isBlocked) {
      throw new UnauthorizedError('Account is blocked');
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const token = jwt.sign(
      { id: user.id, phone: user.phone, role: user.role },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn } as jwt.SignOptions,
    );

    return { token, user };
  },
};
