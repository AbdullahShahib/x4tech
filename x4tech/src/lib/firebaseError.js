export function formatFirebaseError(err, fallback = 'Operation failed') {
  const code = err?.code || '';
  const message = err?.message || '';

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
    'unavailable': 'Firebase service is temporarily unavailable. Please retry.',
  };

  if (map[code]) return map[code];
  if (code) return `${fallback} (${code})`;
  if (message) return `${fallback}: ${message}`;
  return fallback;
}
