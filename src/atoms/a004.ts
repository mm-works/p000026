import { createHash } from 'crypto';

// config here
const secret = 'mmstudio';

/**
 * 验证csrf
 */
export default function a004(csrf: string) {
	if (csrf) {
		const [csrfTokenValue, csrfTokenHash] = csrf.split('|');
		return csrfTokenHash === createHash('sha256').update(`${csrfTokenValue}${secret}`).digest('hex');
	}
	return false;
}
