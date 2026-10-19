export function passwordRequirements(password) { return [password.length >= 8, /\p{Lu}/u.test(password), /\p{Ll}/u.test(password), /\p{Nd}/u.test(password), /[^\p{L}\p{N}\s]/u.test(password)]; }
export function validPassword(password) { return passwordRequirements(password).every(Boolean) && new TextEncoder().encode(password).length <= 72; }
