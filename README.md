# Libslm (Life is boring so let's make) Sort

![Version](https://img.shields.io/github/package-json/v/libslm/sort?style=for-the-badge)
![License](https://img.shields.io/github/license/libslm/sort?style=for-the-badge)

## 📚 Indexing
- [Libslm (Life is boring so let's make) Sort](#libslm-life-is-boring-so-lets-make-sort)
  - [📚 Indexing](#-indexing)
  - [🧪 Introduction](#-introduction)
    - [✨ Features](#-features)
    - [🧩 Supported Algorithms](#-supported-algorithms)
    - [💡 Usage Example](#-usage-example)
    - [🛣️ Roadmap](#️-roadmap)
    - [📝 Notes](#-notes)

## 🧪 Introduction
Libslm Sort is designed to let you tinker with sorting in a variety of ways, offering full control over the comparison function, the range of the array you’re sorting, and even the algorithm you want to use. Whether you're optimizing code, trying to understand sorting techniques, or just procrastinating by playing with data.

> ⚠️ Use at your own risk.

> ℹ️ This library is built with curiosity in mind. It's stable-ish, but don't use it in production unless you want to embrace the chaos.

### ✨ Features

- Multiple sorting algorithms implemented from scratch
- Plug-and-play comparison logic (`CompareFunction`)
- Custom sort ranges (`start`, `end`)
- Benchmarked and battle-tested (by one very bored developer)

### 🧩 Supported Algorithms

| Algorithm | Stable<sup>([1](#stable))</sup> | Best | Avarage | Worst | Avarage Time<sup>([2](#avarage-time))</sup> |
|:--|:-:|:-:|:-:|:-:|--:|
| **Bubblesort** | ✅ | <span style="color:green">n</span> | <span style="color:red">n<sup>2</sup></span> | <span style="color:red">n<sup>2</sup></span> | ~176.84 ms |
| **Heapsort** | 🔲 | <span style="color:yellow">n log n</span> | <span style="color:green">n log n</span> | <span style="color:green">n log n</span> | ~1.27 ms |
| **Insertionsort** | ✅ | <span style="color:green">n</span> | <span style="color:red">n<sup>2</sup></span> | <span style="color:red">n<sup>2</sup></span> | ~128.91 ms |
| **Introsort** | 🔲 | <span style="color:yellow">n log n</span> | <span style="color:green">n log n</span> | <span style="color:green">n log n</span> | ~0.99 ms |
| **Mergesort** | ✅ | <span style="color:yellow">n log n</span> | <span style="color:green">n log n</span> | <span style="color:green">n log n</span> | ~1.83 ms |
| **Quicksort** | 🔲 | <span style="color:yellow">n log n</span> | <span style="color:green">n log n</span> | <span style="color:red">n<sup>2</sup></span> | ~1.19 ms |
| **Selectionsort** | 🔲 | <span style="color:red">n<sup>2</sup></span> | <span style="color:red">n<sup>2</sup></span> | <span style="color:red">n<sup>2</sup></span> | ~79.68 ms |
| **Shellsort** | 🔲 | <span style="color:yellow">n log n</span> | <span style="color:green">n log n</span> | <span style="color:yellow">n<sup>4/3</sup></span> | ~1.78 ms |
| **Timsort** | ✅ | <span style="color:green">n</span> | <span style="color:green">n log n</span> | <span style="color:green">n log n</span> | ~0.92 ms |

<sup><a name="stable">(1)</a></sup> A sorting algorithm is said to be **stable** if two objects with equal keys appear in the same order in sorted output as they appear in the input array to be sorted.

<sup><a name="avarage-time">(2)</a></sup> Avarage time is calculated by running 10,000 random arrays, and taking the medien of the results.

### 💡 Usage Example

```typescript
import { quicksort, CompareFunction } from 'libslm-sort';

const data = [5, 3, 8, 1, 2];

const compare: CompareFunction = (a, b) => {
  if (a > b) return 1;
  if (a < b) return -1;
  return 0;
};

const sorted = quicksort(data, 0, data.length - 1, compare);

console.log(sorted);        // [1, 2, 3, 5, 8]
```

### 🛣️ Roadmap
- ✅ Initial release with working algorithms
- 🔲 Better error messages and typings
- 🔲 Add unit tests
- 🔲 Visualization tool (maybe...)

### 📝 Notes
Since this library is experimental, these implementations may change or expand over time. Use them as needed, tweak them as desired, and embrace the chaos.

- All of the sorting functions are written from scratch.
- They support custom ranges and comparison logic.
- You can help! Feel free to open issues or PRs.