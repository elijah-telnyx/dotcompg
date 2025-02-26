# TELNYX.COM MONOREPO

## Why a new repo?

The hope is that, the frontend projects will share only what is truly necessary and only when they can evolve without putting dependent projects in jeopardy.

This repo hopes to be the eventual home of the codebase that handles `telnyx.com`. This is indeed another monorepo but the focus here is to only host the code that powers `telnyx.com`.

At the moment the repo contains the following packages ...

|   Package    |  Status  |                 Purpose                 |                           Address                           |
| :----------: | :------: | :-------------------------------------: | :---------------------------------------------------------: |
|    cache     | `active` |       Telnyx.com Cache Monitoring       | http://telnyxdotcom-cache-monitor.query.dev.telnyx.io:4029/ |
|     e2e      | `active` |    End-to-end testing for telnyx.com    |      http://telnyxdotcom-e2e.query.dev.telnyx.io:4029/      |
| telnyxdotcom | `active` | telnyx.com rebrand website with next.js |                     https://telnyx.com/                     |
|   everroam   | `active` | everroam site using cotentful & next.js |                    https://everroam.io/                     |
|     seti     | `active` | publicly visible charts on telnyx infra |                  https://seti.telnyx.com/                   |
|      ui      | `active` |              UI components              |                 https://ui.dev.telnyx.com/                  |
|    theme     | `active` |              Design Tokens              |                                                             |
