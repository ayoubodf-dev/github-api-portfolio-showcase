# GitHub Engineering Dashboard

A portfolio dashboard that turns GitHub REST API data into a focused view of
repositories, technologies, activity, and engineering projects.

![GitHub Engineering Dashboard](docs/images/demo.png)

## Highlights

- Live GitHub profile and repository statistics
- Featured-product metadata
- Language and platform summaries
- Responsive portfolio presentation
- Rate-conscious API caching

## Architecture

```mermaid
flowchart LR
    GitHub["GitHub REST API"] --> Cache["Portfolio data cache"]
    Cache --> Dashboard["Engineering dashboard"]
    Dashboard --> Profile["Profile metrics"]
    Dashboard --> Projects["Product showcases"]
    Dashboard --> Skills["Technology overview"]
```

## Source availability

The current implementation is private and proprietary. This public repository
contains product documentation and demonstration media only.

Copyright © 2026 Ayoub Odf. All rights reserved.
