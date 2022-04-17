const dev = process.env.NODE_ENV === 'development';
const prod = process.env.NODE_ENV === 'production';

export const ServerUrl = dev ? 'http://localhost:3000' : prod ? process.env.VERCEL_URL : 'http://localhost:3000';