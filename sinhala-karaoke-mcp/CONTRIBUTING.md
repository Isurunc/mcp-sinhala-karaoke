# Contributing Guide - Sinhala Karaoke MCP Server

Thank you for your interest in contributing to the Sinhala Karaoke MCP Server! This guide will help you get started.

## Ways to Contribute

### 1. Add Sinhala Songs

The easiest way to contribute! Add your favorite Sinhala songs to the database.

**Steps**:
1. Fork the repository
2. Edit `src/data.ts`
3. Add a new song object to the `sinhalaSongs` array
4. Submit a pull request

**Song Requirements**:
```typescript
{
  id: "11",                                    // Unique numeric ID (next available)
  title: "Song Title",                         // English title
  titleSinhala: "ගීතයේ නම",                 // Sinhala script title
  artist: "Artist Name",                       // English artist name
  artistSinhala: "කලාකරුගේ නම",              // Sinhala script artist name
  album: "Album Name",                         // Album or album name
  duration: 240,                               // Duration in seconds
  genre: "Genre",                              // One of existing genres
  year: 2024,                                  // Release year
  description: "Song description",             // Short description
  lyrics: "Optional lyrics excerpt"            // Optional
}
```

**Song Validation**:
- ✅ Use proper Unicode for Sinhala text
- ✅ Verify all fields are accurate
- ✅ Include a meaningful description
- ✅ Ensure genre is from the existing list (or propose new genre)

### 2. Add New Genres

Propose new music genres to expand the database.

**Steps**:
1. Identify songs that fit the new genre
2. Create an issue or propose in a pull request
3. Add songs to the new genre

**Example**:
```typescript
// Add to genres list in documentation
- Sufi Music
- Film Music
- Contemporary
- Folk
```

### 3. Improve Documentation

Help make the documentation better!

**Areas needing help**:
- Translate guides to other languages
- Add usage examples
- Improve explanations
- Add troubleshooting sections
- Create video tutorials

### 4. Report Issues

Found a bug or have a suggestion?

**Create an issue with**:
- Clear title
- Detailed description
- Steps to reproduce (if applicable)
- Expected vs actual behavior
- Screenshots (if relevant)

### 5. Code Improvements

Help improve the codebase:

- Fix bugs
- Optimize performance
- Add tests
- Improve type safety
- Refactor code

### 6. Feature Suggestions

Ideas for new features?

**Propose in issues with**:
- Clear use case
- How it benefits users
- Implementation approach (optional)
- Any potential challenges

---

## Getting Started

### Prerequisites

- Node.js 20+ installed
- npm 10+ installed
- Git installed
- Basic knowledge of TypeScript

### Setup for Development

```bash
# 1. Fork and clone the repository
git clone https://github.com/yourusername/sinhala-karaoke-mcp.git
cd sinhala-karaoke-mcp

# 2. Install dependencies
npm install

# 3. Create a new branch
git checkout -b feature/my-contribution

# 4. Make your changes
# ... edit files ...

# 5. Build and test
npm run build

# 6. Commit and push
git add .
git commit -m "Add: description of changes"
git push origin feature/my-contribution

# 7. Create pull request on GitHub
```

---

## Development Workflow

### 1. Adding Songs

**File**: `src/data.ts`

```typescript
// Add to sinhalaSongs array
const sinhalaSongs: KaraokeSong[] = [
  // ... existing songs ...
  {
    id: "11",
    title: "New Song",
    titleSinhala: "නව ගීතය",
    artist: "Artist",
    artistSinhala: "කලාකරු",
    album: "Album",
    duration: 240,
    genre: "Genre",
    year: 2024,
    description: "Description",
  }
];
```

**Verify**:
```bash
npm run build
npm run dev
# Test with: {"name": "search_songs", "arguments": {"query": "your song"}}
```

### 2. Adding Features

**Steps**:
1. Add new tool to `src/index.ts`
2. Add handler function
3. Add tool definition in the `tools` array
4. Update `README.md` and `API.md`
5. Add tests

**Example**:
```typescript
// Add to tools array
{
  name: "new_tool",
  description: "Tool description",
  inputSchema: {
    type: "object",
    properties: {
      param: { type: "string" }
    },
    required: ["param"]
  }
}

// Add to request handler
case "new_tool": {
  const param = (args as { param: string }).param;
  // Implementation
  break;
}
```

### 3. Modifying Types

**File**: `src/data.ts`

If you need to extend the `KaraokeSong` interface:

```typescript
interface KaraokeSong {
  // ... existing fields ...
  newField?: string;  // Add optional field
}
```

---

## Code Style

### TypeScript Standards

- Use `strict` mode (enforced in `tsconfig.json`)
- Add type annotations
- Avoid `any` type
- Use const/let, not var

### Naming Conventions

- **Functions**: `camelCase` (e.g., `getSongById`)
- **Classes**: `PascalCase` (e.g., `KaraokeSong`)
- **Constants**: `SCREAMING_SNAKE_CASE` (e.g., `MAX_RESULTS`)
- **Private**: prefix with underscore (e.g., `_internal()`)

### Formatting

Code is automatically formatted with Prettier. Run before committing:

```bash
npm run format
```

### Comments

Keep comments minimal and meaningful:

```typescript
// Good: Explains why, not what
// Sinhala text requires UTF-8 encoding
const sinhalaSong = "ගීතය";

// Bad: Obvious from code
const x = getSongById("1"); // Get song by ID
```

---

## Commit Messages

Use clear, descriptive commit messages:

```
Add: New songs by Amaradeva
Fix: Search not finding Sinhala text
Docs: Improve API documentation
Refactor: Simplify search function
Test: Add song database tests
```

Format: `Type: Brief description`

**Types**:
- `Add`: New feature or content
- `Fix`: Bug fix
- `Docs`: Documentation update
- `Refactor`: Code refactoring
- `Test`: Testing changes
- `Perf`: Performance improvement

---

## Pull Request Process

### Before Submitting

1. **Build and test**:
   ```bash
   npm run build
   npm run dev  # Manual test
   ```

2. **Format code**:
   ```bash
   npm run format
   ```

3. **Update documentation**:
   - Update `README.md` if needed
   - Update `API.md` for new tools
   - Update version in `package.json`

4. **Self-review**:
   - Code is clear and maintainable
   - No console errors or warnings
   - Proper error handling
   - Sinhala text properly formatted

### Creating PR

**Title**: Follow commit message format
- ✅ "Add: 5 new classical Sinhala songs"
- ❌ "Update database"

**Description**:
```markdown
## Summary
Brief description of changes

## Changes
- Change 1
- Change 2
- Change 3

## Testing
How to test the changes

## Checklist
- [x] Code builds successfully
- [x] Documentation updated
- [x] Follows code style
```

### Review Process

- Maintainers will review your PR
- Respond to feedback constructively
- Make requested changes in new commits
- Once approved, PR will be merged

---

## Testing Your Changes

### Manual Testing

```bash
# Build
npm run build

# Run in dev mode
npm run dev

# Test each tool with sample inputs
```

### Adding Tests

Create tests for new features:

```typescript
// test/new-feature.test.ts
import { newFunction } from "../src/data";

describe("New Feature", () => {
  it("should do something", () => {
    const result = newFunction();
    expect(result).toBeDefined();
  });
});
```

### Run Tests

```bash
npm test
```

---

## Documentation Standards

When adding features, update:

1. **API.md** - New tools and parameters
2. **README.md** - Feature overview
3. **QUICKSTART.md** - If user-facing
4. **Code comments** - For complex logic

### Documentation Format

```markdown
### Tool Name

Brief description.

#### Request

```json
{
  "name": "tool_name",
  "arguments": { "param": "value" }
}
```

#### Response

```
Result text
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
```

---

## Sinhala Text Guidelines

### Proper Unicode Handling

✅ **Correct**:
```typescript
title: "Malwatta",
titleSinhala: "මල්වත්ත"
```

❌ **Incorrect**:
```typescript
// Don't use transliteration
titleSinhala: "Malwatta"
```

### Tools for Creating Sinhala Text

- Google Translate (Sinhala script)
- Online Sinhala keyboard: https://www.lexilogos.com/keyboard/sinhala.htm
- Copy from reliable sources

### Validation

Verify Sinhala text:
1. Copy to online validator
2. Test in Node REPL
3. Check renders correctly

```bash
# In Node REPL
node
> console.log("මල්වත්ත")
მებაძძ  // Should display properly
```

---

## Questions?

- Check existing issues
- Read documentation thoroughly
- Ask in pull request comments
- Open a discussion issue

---

## Code of Conduct

Be respectful and inclusive:
- ✅ Help others learn
- ✅ Welcome diverse perspectives
- ✅ Provide constructive feedback
- ❌ No harassment or discrimination

---

## Recognition

Contributors are recognized in:
- `CONTRIBUTORS.md` file
- Release notes
- GitHub contributors page

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## Additional Resources

- [MCP Documentation](https://modelcontextprotocol.io)
- [Node.js Best Practices](https://nodejs.org/en/docs/guides/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Git Workflow](https://git-scm.com/docs)

---

**Thank you for contributing to the Sinhala Karaoke MCP Server!** 🎵
