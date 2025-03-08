// Match an email address
const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

// Match a URL
const urlRegex = /^(https?|ftp)://[^\s/$.?#].[^\s]$/i;

// Match a phone number (US format)
const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;

// Match a strong password (at least 8 characters, one uppercase, one lowercase, one number, one special character)
const strongPasswordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;

// Match a date in YYYY-MM-DD format
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// Match an integer
const integerRegex = /^-?\d+$/;

// Match a floating-point number
const floatRegex = /^-?\d(.\d+)?$/;

// Match a string containing only letters
const lettersOnlyRegex = /^[A-Za-z]+$/;

// Match a string containing only numbers and letters
const alphanumericRegex = /^[A-Za-z0-9]+$/;

// Match a valid IPv4 address
const ipv4Regex = /^(\d{1,3}.){3}\d{1,3}$/;