# Markdown Cheatsheet (AEC Admin)

## Headings

# H1

## H2

### H3

## Emphasis

- _italic_ or _italic_
- **bold**
- ~~strikethrough~~

## Blockquote

> This is a note or quote

## Lists

- Bullet list
  - Nested item (2 spaces indent)
    - Deeper level
- Numbered list
  1. First
  2. Second

## Links

- [OpenAI](https://openai.com)
- Relative link: [db-design](./db-design.md)

## Code

Inline code: `git acp "msg"`

```sql
-- Block code with language highlighting
SELECT * FROM accounts_v2;
```

## Tables

| Column | Type | Notes             |
| ------ | ---- | ----------------- |
| id     | uuid | gen_random_uuid() |
| name   | text | required          |

## Horizontal Rule

---

This is a paragraph you areading after the horizontal rule.
