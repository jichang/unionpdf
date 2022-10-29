### UnionPDF

UnionPDF contains several packages for displaying PDF files in browser

| Package           | Description                                 |
| ----------------- | ------------------------------------------- |
| @unionpdf/models  | Definition of common data types             |
| @unionpdf/engines | PDF engine for parsing PDF files            |
| @unionpdf/react   | React components for displaying PDF content |
| @unionpdf/mocks   | Mocks for UI components development         |
| @unionpdf/app     | Demo apps for showing usages                |

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
