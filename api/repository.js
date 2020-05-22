import { graphql } from '@octokit/graphql'
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || ''

export default async function(req, res, next) {
  let data
  try {
    data = await getRepositoryInfo()
  } catch (error) {
    res.writeHead(500)
    res.end()
  }

  if (!data) {
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

async function getRepositoryInfo() {
  const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: `token ${GITHUB_TOKEN}`
    }
  })

  const repository = await graphqlWithAuth(
    `
      {
      repository(owner: "nodejs", name: "node") {
        url
        forkCount
        homepageUrl
        stargazers {
          totalCount
        }
        openPRs: pullRequests(states: OPEN, last: 12) {
          totalCount
          nodes {
            url
            author {
              avatarUrl
              login
            }
            title
          }
        }
        openIssues: issues(states: OPEN) {
          totalCount
        }
      }
    }
  `
  )

  return repository
}
