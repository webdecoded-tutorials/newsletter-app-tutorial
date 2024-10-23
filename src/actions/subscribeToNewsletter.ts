'use server'
import { Resend } from 'resend'

async function subscribeToNewsletter(state: string, formData: FormData): Promise<string> {
  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID

  if (!apiKey || !audienceId) {
    return 'Missing API Key or Audience ID'
  }

  const resend = new Resend(apiKey)

  const email = formData.get('email') as string
  try {
    const response = await resend.contacts.create({
      email: email,
      unsubscribed: false,
      audienceId: audienceId,
    })
    console.log(response)
    return 'Subscribed to newsletter'
  } catch (error) {
    console.error(error)
    return 'Error subscribing to newsletter'
  }
}

export default subscribeToNewsletter
