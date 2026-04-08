export function formatFirebaseError(err, fallback = 'Operation failed') {
  const code = err?.code || '';
  const message = err?.message || '';

  // Check for CORS errors (mostly on file uploads)
  if (message?.includes('CORS') || message?.includes('ERR_FAILED') || code?.includes('ERR_')) {
    return 'File upload failed: Firebase Storage CORS not configured. Ask admin to enable billing and run setup.';
  }

  // Check for billing errors
  if (message?.includes('billing') || message?.includes('delinquent')) {
    return 'Firebase configuration issue: Billing account disabled. Admin needs to enable billing.';
  }

  const map = {
    'auth/invalid-credential': 'Invalid email or password.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/user-not-found': 'No account found for this email.',
    'auth/wrong-password': 'Incorrect password.',
    'auth/too-many-requests': 'Too many attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Check your internet connection.',
    'auth/unauthorized-domain': 'This domain is not authorized in Firebase Authentication settings.',
    'permission-denied': 'Permission denied by Firestore security rules.',
    'not-found': 'Requested document was not found.',
    'failed-precondition': 'Firestore requires an index or has unmet preconditions.',
    'storage/unknown': 'Storage request failed. Verify Storage bucket name and that Firebase Storage is enabled.',
    'storage/bucket-not-found': 'Storage bucket not found. Check Firebase configuration.',
    'storage/object-not-found': 'File not found.',
    'unavailable': 'Firebase service is temporarily unavailable. Please retry.',
  };

  if (map[code]) return map[code];
  if (code) return `${fallback} (${code})`;
  if (message) return `${fallback}: ${message}`;
  return fallback;
}
