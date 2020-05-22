import { parseReleases } from './utils/releaseManager'

export default function(req, res, next) {
  let data
  try {
    data = parseReleases()
  } catch (error) {
    res.writeHead(500)
    res.end()
  }
  const responsePayload = JSON.stringify(data)
  res
    .writeHead(200, {
      'Content-Length': Buffer.byteLength(responsePayload),
      'Content-Type': 'application/json'
    })
    .end(responsePayload)
}
