# foodpanda-cli

CLI for ordering food from foodpanda.ph — designed for AI assistants.


## Setup

```bash
npm install -g foodpanda-cli
# or
npx foodpanda-cli
```

### Set Your Location

```bash
foodpanda-cli location <latitude> <longitude>
```

Your location is saved to `~/.foodpanda-cli/location.json` and persists across sessions.

### Login

```bash
foodpanda-cli login
```

Opens a browser window to foodpanda.ph. Log in manually — the token is captured automatically and saved to `~/.foodpanda-cli/token.json`.


## Commands

### Location

```bash
# Set delivery location
foodpanda-cli location 14.5995 120.9842
```

### Search & Discovery

```bash
# Search restaurants
foodpanda-cli search "jollibee" --cuisine "Filipino" --limit 5

# List chain outlets
foodpanda-cli outlets <chain_code>

# Get restaurant details
foodpanda-cli restaurant <vendor_code>
```

### Menu

```bash
# Get restaurant menu (compact)
foodpanda-cli menu <vendor_code>

# Get item details with toppings
foodpanda-cli item <vendor_code> <product_code>
```

### Cart

```bash
# Add items to cart
foodpanda-cli add <vendor_code> --items '[{"item_id":"ct-36-pd-1673","quantity":2}]'

# View cart
foodpanda-cli cart

# Remove item
foodpanda-cli remove <cart_item_id>
```

### Order

```bash
# Preview order (delivery address, payment methods, totals)
foodpanda-cli preview

# Place order (only COD works)
foodpanda-cli order --payment payment_on_delivery --instructions "Leave at door"
```

## For AI Assistants

This CLI is designed to be invoked by AI assistants as shell commands. All output is JSON.

**Ordering workflow:**
1. `location` -> set delivery coordinates
2. `login` -> authenticate
3. `search` -> find restaurants
4. `menu` -> browse items
5. `item` -> check toppings/variations
6. `add` -> build cart
7. `preview` -> review order
8. `order` -> place order (only after user confirmation)

**Limitations:**
- Only `payment_on_delivery` (Cash on Delivery) works
- Philippines only (foodpanda.ph)
- Session tokens expire; use `login` to refresh

## License

[MIT](LICENSE)
