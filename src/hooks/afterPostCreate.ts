import type { CollectionAfterOperationHook } from 'payload'
import { Resend } from 'resend'
import {
  HTMLConverterFeature,
  consolidateHTMLConverters,
  convertLexicalToHTML,
  defaultEditorConfig,
  defaultEditorFeatures,
  sanitizeServerEditorConfig,
} from '@payloadcms/richtext-lexical'

const afterPostCreate: CollectionAfterOperationHook = async ({
  args, // arguments passed into the operation
  operation, // name of the operation
  req, // full express request
  result, // the result of the operation, before modifications
}: any) => {
  if (operation !== 'create') {
    return result
  }

  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID
  console.log('result', result)

  const newPost = result.docs ? result.docs[0] : result
  const title = newPost.title
  const body = newPost.postBody

  const editorConfig = defaultEditorConfig
  editorConfig.features = [...defaultEditorFeatures, HTMLConverterFeature({})]
  const sanitizedEditorConfig = await sanitizeServerEditorConfig(editorConfig, req.payload.config)

  const html = await convertLexicalToHTML({
    converters: consolidateHTMLConverters({
      editorConfig: sanitizedEditorConfig,
    }),
    data: body,
    req,
  })

  if (!apiKey || !audienceId) {
    return result
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  // get emails of users
  const emails = await resend.contacts.list({
    audienceId: audienceId,
  })
  if (!emails.data) {
    return result
  }
  if (emails.data.object !== 'list') {
    return result
  }
  const emailData = emails.data.data.map((contact) => ({
    from: `Hello <hello@${process.env.RESEND_DOMAIN}>`,
    to: [contact.email],
    subject: title,
    html,
  }))
  // Send an email to the user
  const response = await resend.batch.send(emailData)
  console.log('batch response', response)
  return result
}

export default afterPostCreate
