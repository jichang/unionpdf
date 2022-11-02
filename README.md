### UnionPDF

UnionPDF contains several packages for displaying PDF files in browser

| Package           | Description                                 |                                           |
| ----------------- | ------------------------------------------- | ----------------------------------------- |
| @unionpdf/models  | Definition of common data types             | [README.md](./packages/models/README.md)  |
| @unionpdf/engines | PDF engine for parsing PDF files            | [README.md](./packages/engines/README.md) |
| @unionpdf/react   | React components for displaying PDF content | [README.md](./packages/react/README.md)   |

### Dev

1. clone repo

```
git clone https://github.com/jichang/unionpdf.git
```

2. bootstrap

```
lerna bootstrap --hoist
```

3. build

```
lerna run build
```

3. type checking

```
lerna run typecheck
```

4. test

```
lerna run test
```
