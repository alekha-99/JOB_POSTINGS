/**
 * S3 Service for Job Data Backup
 * 
 * Provides optional AWS S3 integration for persisting job data.
 * Disabled by default - enable via ENABLE_S3_BACKUP=true
 */

import config from '../utils/config.js';
import { logger } from '../utils/index.js';

interface S3Config {
    region: string;
    bucket: string;
    accessKeyId: string;
    secretAccessKey: string;
}

interface JobBackupData {
    timestamp: Date;
    totalJobs: number;
    totalCompanies: number;
    scrapeResults: Record<string, unknown>[];
}

/**
 * Check if S3 is properly configured
 */
export function isS3Configured(): boolean {
    return (
        config.enableS3Backup &&
        !!config.awsS3Bucket &&
        !!config.awsAccessKeyId &&
        !!config.awsSecretAccessKey
    );
}

/**
 * Get S3 configuration
 */
function getS3Config(): S3Config | null {
    if (!isS3Configured()) {
        return null;
    }

    return {
        region: config.awsRegion,
        bucket: config.awsS3Bucket,
        accessKeyId: config.awsAccessKeyId,
        secretAccessKey: config.awsSecretAccessKey,
    };
}

/**
 * Upload job data to S3
 * Note: Requires @aws-sdk/client-s3 package when enabled
 */
export async function uploadJobData(data: JobBackupData): Promise<boolean> {
    if (!isS3Configured()) {
        logger.debug('S3 backup disabled - skipping upload');
        return false;
    }

    const s3Config = getS3Config();
    if (!s3Config) {
        return false;
    }

    try {
        // Dynamic import to avoid loading AWS SDK when not needed
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // @ts-ignore - @aws-sdk/client-s3 is an optional dependency
        const awsS3 = await import('@aws-sdk/client-s3').catch(() => null) as any;
        if (!awsS3) {
            logger.error('❌ @aws-sdk/client-s3 not installed. Run: npm install @aws-sdk/client-s3');
            return false;
        }

        const client = new awsS3.S3Client({
            region: s3Config.region,
            credentials: {
                accessKeyId: s3Config.accessKeyId,
                secretAccessKey: s3Config.secretAccessKey,
            },
        });

        const key = `job-backups/${data.timestamp.toISOString().split('T')[0]}/${data.timestamp.getTime()}.json`;

        const command = new awsS3.PutObjectCommand({
            Bucket: s3Config.bucket,
            Key: key,
            Body: JSON.stringify(data, null, 2),
            ContentType: 'application/json',
        });

        await client.send(command);
        logger.info(`✅ Job data backed up to S3: ${key}`);
        return true;
    } catch (error) {
        logger.error(`❌ S3 upload failed: ${error}`);
        return false;
    }
}

/**
 * List backup files from S3
 */
export async function listBackups(prefix?: string): Promise<string[]> {
    if (!isS3Configured()) {
        logger.debug('S3 backup disabled');
        return [];
    }

    const s3Config = getS3Config();
    if (!s3Config) {
        return [];
    }

    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // @ts-ignore - @aws-sdk/client-s3 is an optional dependency
        const awsS3 = await import('@aws-sdk/client-s3').catch(() => null) as any;
        if (!awsS3) {
            return [];
        }

        const client = new awsS3.S3Client({
            region: s3Config.region,
            credentials: {
                accessKeyId: s3Config.accessKeyId,
                secretAccessKey: s3Config.secretAccessKey,
            },
        });

        const command = new awsS3.ListObjectsV2Command({
            Bucket: s3Config.bucket,
            Prefix: prefix || 'job-backups/',
        });

        const response = await client.send(command);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return response.Contents?.map((obj: any) => obj.Key || '') || [];
    } catch (error) {
        logger.error(`❌ S3 list failed: ${error}`);
        return [];
    }
}

/**
 * Download backup from S3
 */
export async function downloadBackup(key: string): Promise<JobBackupData | null> {
    if (!isS3Configured()) {
        return null;
    }

    const s3Config = getS3Config();
    if (!s3Config) {
        return null;
    }

    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // @ts-ignore - @aws-sdk/client-s3 is an optional dependency
        const awsS3 = await import('@aws-sdk/client-s3').catch(() => null) as any;
        if (!awsS3) {
            return null;
        }

        const client = new awsS3.S3Client({
            region: s3Config.region,
            credentials: {
                accessKeyId: s3Config.accessKeyId,
                secretAccessKey: s3Config.secretAccessKey,
            },
        });

        const command = new awsS3.GetObjectCommand({
            Bucket: s3Config.bucket,
            Key: key,
        });

        const response = await client.send(command);
        const body = await response.Body?.transformToString();

        if (body) {
            return JSON.parse(body) as JobBackupData;
        }
        return null;
    } catch (error) {
        logger.error(`❌ S3 download failed: ${error}`);
        return null;
    }
}

export default {
    isS3Configured,
    uploadJobData,
    listBackups,
    downloadBackup,
};
