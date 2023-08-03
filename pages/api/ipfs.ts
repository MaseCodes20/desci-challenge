// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"

import { create } from "ipfs-http-client"

// arbitrary response format
export type BasicIpfsData = {
  cid: string
  content: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<BasicIpfsData>) {
  if (req.method === "POST") {
    // Process a POST request
    await addData(req, res)
  } else {
    // Handle any other HTTP method
    await retrieveData(req, res)
  }
}

const retrieveData = async (req: NextApiRequest, res: NextApiResponse<BasicIpfsData>) => {
  // connect to the default API address http://localhost:5001
  const { cid } = req.query as { cid: string }

  const client = create()
  let asyncitr = client.cat(cid)
  let note = ""

  for await (const itr of asyncitr) {
    let data = Buffer.from(itr).toString()
    note = data
  }

  res.status(200).json({ cid: cid, content: note })
}

const addData = async (req: NextApiRequest, res: NextApiResponse<BasicIpfsData>) => {
  // connect to the default API address http://localhost:5001
  const { note } = req.body

  const client = create()
  const data = await client.add(note)

  res.status(200).json({ cid: data.path, content: note })
}
