// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {db} from '../../lib/db'

type Data = {
  result: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  db.query('SELECT * FROM CatalogSettings', (err: any, results: any) => {
    res.status(200).json({result: results})
  })
  //res.status(200).json({ name: 'John Doe' })
}
