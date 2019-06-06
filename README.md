# GitHub token generator

To authenticate as a GitHub App, this [creates jwt payload](https://developer.github.com/apps/building-github-apps/authenticating-with-github-apps/#jwt-payload) and requests the API.
The token will be dumped to stdout.

## Requirement

These environment variables are required:

- `GITHUB_APP_PRIVATE_KEY`
- `GITHUB_APP_APP_ID`
- `GITHUB_APP_INSTALLATION_ID`

## Usage

To authenticate apps for the bot like [danger/danger-js](https://github.com/danger/danger-js) with CI.
example:

```yml
jobs:
  review:
    steps:
      - checkout
      - some_prepare_commands
      - run:
          name: Sending review
          command: |
            export DANGER_GITHUB_APP=1
            export DANGER_GITHUB_API_TOKEN=$(npx github-token-generator)
            npx danger ci
```
