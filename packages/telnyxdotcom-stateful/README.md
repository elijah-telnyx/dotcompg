# telnyxdotcom-stateful

This is a reference to [telnyxdotcom](../telnyxdotcom/README.md) codebase, but with persisted .next folder on docker + kubernetes using [Stateful Resource in k8s](https://app.getguru.com/card/coBRb99i/Beta-How-to-deploy-a-Stateful-Service).

## Getting Started

To run, use the following make commands:

### Build Docker Image

```bash
make build-local
```

## Run Docker Image

```bash
make run-local
```

Then open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The service output (UI, Node, HTML, CSS) should be exactly the same as [telnyxdotcom](../telnyxdotcom/README.md)

## Learn More

To learn more, [DOTCOM-3209](https://telnyx.atlassian.net/browse/DOTCOM-3209) ticket should contain all you need to know. If not, reach the team in [#squad-dotcom](https://telnyx.slack.com/archives/C0179536KU7) slack channel.

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Deployment Repositories](https://app.getguru.com/card/cKxjeM7i/Deployment-repositories) - Learn about telnyx infra deploy repos
- [Infra Stateful Service](https://app.getguru.com/card/coBRb99i/Beta-How-to-deploy-a-Stateful-Service) - Learn about telnyx infra k8s stateful services and infra pipeline

## Deploy

Deploy is done through Github Actions, via the [deploy-dotcom-main](https://github.com/team-telnyx/deploy-dotcom-main) repo. See [Deployment Repositories](https://app.getguru.com/card/cKxjeM7i/Deployment-repositories)

## TODO

- [] Deprecate [telnyxdotcom](../telnyxdotcom/README.md) in favor of this service, replacing [telnyxdotcom](../telnyxdotcom/README.md) deploy configuration with `telnyxdotcom-stateful` config
