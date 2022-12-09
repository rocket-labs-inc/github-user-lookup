# Codespaces, Actions, GHAS Demo Guide

## Resources
- [Google Slides Deck](https://docs.google.com/presentation/d/1zA758eZpzIEjWNvYLM5iLyE0RIuXMS4PiQJX58rF4M0/edit)
- [Generic Recording](https://drive.google.com/file/d/18fGJ4LjazDEkHNiBxg2m8JCkPc10d9zi/view?usp=sharing)


### Pre Demo
- ensure `Code Scan` and `Reusable Workflow` workflows are disabled
- ensure `Deploy Web App to QA` is enabled


## Codespaces
* Explain [GitHub User Lookup repo](https://github.com/rocket-labs-inc/github-user-lookup)
* Show codespaces create options
* Open codespace and show features
	* Extensions
	* Settings sync (theme, fonts, etc)
	* Terminal + git (pre-authenticated)
* Explain [devcontainer](https://github.com/rocket-labs-inc/eShopOnline/blob/main/.devcontainer/devcontainer.json)
* Breakpoint and debug site
* Port forward and port visibility

## Actions
* Show [workflow that has already executed](https://github.com/rocket-labs-inc/github-user-lookup/actions/runs/3363469507)
* Explain environments
* Create new branch and change the background image from cat to a dog
* Push code and create a pull request
* Go to Actions tab and show running workflow
* Go to workflow file and explain yaml
* Show [Actions marketplace](https://github.com/marketplace?type=actions)
* Show [Awesome Actions](https://github.com/sdras/awesome-actions)
* Go back to running workflow and open sandbox site
* Approve gate

## Reusable Workflows
* Show nearly identical yaml between sandbox and QA deployment jobs
* Show [centralized reusable workflow](https://github.com/rocket-labs-inc/centralized-actions/blob/main/.github/workflows/webapp-deploy.yml)
* Walk through workflow [yaml](https://github.com/rocket-labs-inc/github-user-lookup/blob/main/.github/workflows/deploy-to-qa-reusable.yml)


## Dependabot
* Navigate to Dependabot alerts
* Jump to a PR


## Secret Scanning
* Show existing secret scanning alerts
* Walk though settings and push protection
* Demo push protection


## Code Scanning
* Go to Security tab and show code scanning alerts
* Go to Pull Requests tab and show a [PR with code scanning alerts](https://github.com/rocket-labs-inc/github-user-lookup/pull/20)
* Go to [Code Scanning workflow](https://github.com/rocket-labs-inc/github-user-lookup/actions/runs/3055880464)
* CodeQL engine, query packs, CLI
* Go to Actions tab and show code scanning workflow run and yaml


## Security Overview
* Go to Security Overview within the organization
* Explain features
* Webhooks and APIs
* Go to [Splunk dashboard](http://35.86.36.83:8000/en-US/app/github_app_for_splunk/code_scanning_overview?form.timeTkn.earliest=-7d%40h&form.timeTkn.latest=now&form.tool_name=*&form.repoTkn=*)

---

## Don't Forget
* Actions Marketplace
* Environments
* Other code scanning tools
* Actions starter workflows
* Actions required workflows

## Code Blocks

### PAT
`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`


### Code Scanning sample
```
var req = {};
req.headers = { authorization: 'Bearer eyJ1eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7ImVtYWlsIjoicnNhX2xvcmRAIn0sImlhdCI6MTU4MjIyMTY3NX0.70f6VAIQk2Uzpf3sgH-1JVrrTuwudonm2DKn2ec7Tg8' }
```

### Dependency Review
```
    "json-schema": {
        "version": "0.2.3",
        "resolved": "https://registry.npmjs.org/json-schema/-/json-schema-0.2.3.tgz",
        "integrity": "sha1-tIDIkuWaLwWVTOcnvT8qTogvnhM=",
        "dev": true
    },
    "json-schema-traverse": {
        "version": "0.4.1",
        "resolved": "https://registry.npmjs.org/json-schema-traverse/-/json-schema-traverse-0.4.1.tgz",
        "integrity": "sha512-xbbCH5dCYU5T8LcEhhuh7HJ88HXuW3qsI3Y0zOZFKfZEHcpWiHU/Jxzk629Brsab/mMiHQti9wMP+845RPe3Vg==",
        "dev": true
    },
```
