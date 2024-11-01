'use server'

import { getPayloadHMR } from '@payloadcms/next/utilities'
import config from '@payload-config'

export async function getPayload() {
  return getPayloadHMR({ config })
}
