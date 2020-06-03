'use strict'

const { SecretManagerServiceClient } = require('@google-cloud/secret-manager')
let githubToken

exports.getGitHubToken = async function() {
  if (githubToken) {
    return githubToken
  }

  const GITHUB_TOKEN_ENV = process.env.GITHUB_TOKEN
  if (GITHUB_TOKEN_ENV) {
    githubToken = GITHUB_TOKEN_ENV
    return githubToken
  }

  const secretsManagerClient = new SecretManagerServiceClient()

  const nameGitHubToken = 'github-token'
  const nameProject = 'nodepulse'
  const pathGitHubTokenSecret = `projects/${nameProject}/secrets/${nameGitHubToken}/versions/latest`

  const [secretText] = await secretsManagerClient.accessSecretVersion({
    name: pathGitHubTokenSecret
  })

  const secret = secretText.payload.data.toString('utf8')
  githubToken = secret.trim()
  return githubToken
}
