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

  const apiKey = process.env.CLOUDFLARE_API_KEY

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

  if (!apiKey) {
    return result
  }

  const url = `https://newsletter-tutorial-workers.webdecodedtutorials.workers.dev`
  const headers = {
    Authorization: `Basic ${apiKey}`,
  }

  const reqBody = JSON.stringify({
    subject: title,
    emailContent: html,
  })

  fetch(url, {
    method: 'POST',
    headers: headers,
    body: reqBody,
  })
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.error(error)
    })

  return result
}

export default afterPostCreate
