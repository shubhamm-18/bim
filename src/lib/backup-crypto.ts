import crypto from 'crypto';

const BACKUP_SECRET =
  process.env.BIM_BACKUP_SECRET || 'beyond-imagine-local-dev-aes256-key-32b';

/**
 * Encrypts a JSON backup payload using AES-256-GCM for secure owner/accountant backups.
 */
export function encryptBackupPayload(payload: unknown): {
  algorithm: string;
  iv: string;
  authTag: string;
  ciphertext: string;
  createdAt: string;
} {
  const key = crypto.createHash('sha256').update(BACKUP_SECRET).digest();
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const plaintext = JSON.stringify(payload);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return {
    algorithm: 'aes-256-gcm',
    iv: iv.toString('hex'),
    authTag: authTag.toString('hex'),
    ciphertext: encrypted.toString('base64'),
    createdAt: new Date().toISOString(),
  };
}
