const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default emails => {
	const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => EMAIL_REGEXP.test(email) === false) //capture the invalid ones as 'true'

  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`
  }
}
