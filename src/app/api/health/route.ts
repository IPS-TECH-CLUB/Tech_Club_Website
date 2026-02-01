import { NextResponse } from 'next/server';
import logger from '@/lib/logger';

export async function GET() {
  try {
    logger.info('Health check endpoint called');
    return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() });
  } catch (error) {
    logger.error({ error }, 'Health check failed');
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}
