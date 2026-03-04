# Agent Skill for foodpanda-cli — Design Document

## Goal

Create an Agent Skill (per the [Agent Skills spec](https://agentskills.io/specification)) that allows AI assistants with shell access (OpenClaw, Claude Code, Goose, etc.) to order food via `foodpanda-cli`.

## Decisions

- **Target**: Shell-based (filesystem) agents that can run CLI commands
- **Structure**: Single self-contained `SKILL.md` at repo root (Approach A)
- **Install**: Skill includes npm install and initial setup instructions
- **Autonomy**: Agent may search/browse/cart freely, but MUST confirm with user before `order`

## File Location

```
foodpanda-cli/
├── SKILL.md          # The Agent Skill file
├── src/              # (existing source)
└── ...
```

## SKILL.md Structure

### Frontmatter

```yaml
name: foodpanda-cli
description: >-
  Order food from foodpanda.ph using the foodpanda-cli command-line tool.
  Use when the user wants to search restaurants, browse menus, build a cart,
  or place a food delivery order in the Philippines. Requires Node.js and
  shell access.
compatibility: Requires Node.js 18+, npm, and shell access. Philippines only.
metadata:
  author: johnwhoyou
  version: "0.1.0"
```

### Body Sections

1. **Overview** (~3 lines) — What the tool does, JSON output, Philippines only
2. **Prerequisites & Installation** — npm install -g, verify with --version
3. **Initial Setup** — `location` command + `login` command (one-time steps)
4. **Command Reference** — All 12 commands with exact syntax and brief output description:
   - `location <lat> <lng>`
   - `login [--timeout <s>]`
   - `search <query> [--cuisine <type>] [--limit <n>]`
   - `outlets <chain_code>`
   - `restaurant <vendor_code>`
   - `menu <vendor_code>`
   - `item <vendor_code> <product_code>`
   - `add <vendor_code> --items '<json>'`
   - `cart`
   - `remove <cart_item_id>`
   - `preview`
   - `order --payment <method> [--instructions <text>]`
5. **Recommended Workflow** — Numbered happy-path from location → order
6. **Important Rules** — Confirm before ordering, error handling, cart-switching behavior, payment limitation
7. **Common Patterns** — Cuisine filtering, topping customization, chain outlet selection

### Estimated Size

~200-300 lines of Markdown, well within the 500-line recommendation.

## Key Content Decisions

- Include abbreviated JSON output examples for key commands (search, menu, item, cart, preview) so the agent knows what to parse
- Emphasize the `--items` JSON format for `add` since it's the most complex command
- Explicitly state: "ALWAYS confirm with the user before running the `order` command"
- Note that `payment_on_delivery` is currently the only working payment method
- Mention that adding items from a different vendor clears the cart
