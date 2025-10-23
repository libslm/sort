export type CompareFunction = <T>(first: T, second: T) => 1 | 0 | -1;

/**
 * Comparing of the values.
 */
const DefualtCompare: CompareFunction = (first, second): 1 | 0 | -1 => {
    if (first > second) return 1;
    if (second > first) return -1;
    return 0;
}

/**
 * Builds max heap from given array.
 */
function buildMaxHeap<T>(array: T[], left: number, right: number, length: number, compare: CompareFunction) {
    if (!Array.isArray(array)) throw new Error(``);
    if (typeof left !== 'number') throw new Error(``);
    if (typeof right !== 'number') throw new Error(``);
    if (typeof length !== 'number') throw new Error(``);
    if (typeof compare !== 'function') throw new Error(``);

    let result: T[] = Array.from(array);

    for (let index = Math.floor(length / 2) - 1 + left; index >= left; index--) {
        result = heapify(array, index, right, left, compare);
    }

    return result;
}

/**
 * Finds the correct place of given element in given max heap.
 */
function heapify<T>(array: T[], left: number, right: number, offset: number, compare: CompareFunction): T[] {
    if (!Array.isArray(array)) throw new Error(``);
    if (typeof left !== 'number') throw new Error(``);
    if (typeof right !== 'number') throw new Error(``);
    if (typeof offset !== 'number') throw new Error(``);
    if (typeof compare !== 'function') throw new Error(``);

    let result: T[] = Array.from(array);
    let root: number = left;

    while(true) {
        let leftChild = 2 * (root - offset) + 1 + offset;
        let rightChild = 2 * (root - offset) + 2 + offset;
        let largest = root;

        if (leftChild > right) break;

        if (compare(result[leftChild], result[largest]) > 0) largest = leftChild;
        if (rightChild <= right && compare(result[rightChild], result[largest]) > 0) largest = rightChild;

        if (largest === root) break;

        [result[root], result[largest]] = [result[largest], result[root]];
        root = largest;
    }

    return result;
}

/**
 * Devides the given array into two subarrays, sort them and then merges them.
 */
function merge<T>(array: T[], left: number, pivot: number, right: number, compare: CompareFunction): T[] {
    if (!Array.isArray(array)) throw new Error(``);
    if (typeof left !== 'number') throw new Error(``);
    if (typeof pivot !== 'number') throw new Error(``);
    if (typeof right !== 'number') throw new Error(``);
    if (typeof compare !== 'function') throw new Error(``);

    let result: T[] = Array.from(array);
    var first = result.slice(left, pivot);
    var second = result.slice(pivot, right + 1);
    var rightIndex = 0;
    var secondIndex = 0;

    while(left <= right) {
        if (rightIndex < first.length && secondIndex < second.length) {
            if (compare(first[rightIndex], second[secondIndex]) > 0) {
                result[left] = second[secondIndex];
                secondIndex++;
            } else {
                result[left] = first[rightIndex];
                rightIndex++;
            }
        } else {
            if (rightIndex < first.length) {
                result[left] = first[rightIndex];
                rightIndex++;
            }
            if (secondIndex < second.length) {
                result[left] = second[secondIndex];
                secondIndex++;
            }
        }

        left++;
    }

    return result;
}

/**
 * Partitions the array in two parts by the middle elements.
 * 
 * All elemnts which are less than the chosen one goes left from it
 * all which are greater goes right from it.
 * 
 * Uses Hoare's partitioning algorithm.
 */
function partition<T>(array: T[], left: number, right: number, compare: CompareFunction): number {
    if (!Array.isArray(array)) throw new Error(``);
    if (typeof left !== 'number') throw new Error(``);
    if (typeof right !== 'number') throw new Error(``);
    if (typeof compare !== 'function') throw new Error(``);

    let pivot = array[Math.floor((left + right) / 2)];

    while (left <= right) {
        while (compare(array[left], pivot) < 0) left++;
        while (compare(array[right], pivot) > 0) right--;

        if (left <= right) {
            [array[left], array[right]] = [array[right], array[left]];
            left++;
            right--;
        }
    }

    return left;
}

/**
 * # Bubblesort algorithm
 * 
 * Stable: **True**
 * 
 * ## Performance
 * 
 * - Worst-case: **n2**
 * - Average-case: **n2**
 * - Best-case: **n**
 * 
 * Avarage Score: ~**176.84ms**
 */
export function bubblesort<T>(array: T[], start?: number, end?: number, compare?: CompareFunction): T[] {
    if (start === undefined) start = 0;
    if (end === undefined) end = array.length - 1;
    if (compare === undefined) compare = DefualtCompare;

    if (!Array.isArray(array)) throw new Error(``);
    if (typeof start !== 'number') throw new Error(``);
    if (typeof end !== 'number') throw new Error(``);
    if (typeof compare !== 'function') throw new Error(``);
    if (start < 0) start = 0;
    if (end >= array.length) end = array.length - 1;
    if (end - start + 1 <= 1 || end <= start) return array;

    let result = Array.from(array);

    for (let right = start; right <= end; right++) {
        for (let left = right; left > start; left--) {
            if (compare(result[left], result[left - 1]) < 0) {
                [result[left], result[left - 1]] = [result[left - 1], result[left]];
            }
        }
    }

    return result;
}

/**
 * # Heapsort algorithm
 * 
 * Turns the input array into max heap and after that sorts it.
 * 
 * Stable: **False**
 * 
 * ## Performance
 * 
 * - Worst-case: **n log n**
 * - Average-case: **n log n**
 * - Best-case: **n log n**
 * 
 * Avarage Score: ~**1.27ms**
 */
export function heapsort<T>(array: T[], start?: number, end?: number, compare?: CompareFunction): T[] {
    if (start === undefined) start = 0;
    if (end === undefined) end = array.length - 1;
    if (compare === undefined) compare = DefualtCompare;

    if (!Array.isArray(array)) throw new Error(``);
    if (typeof start !== 'number') throw new Error(``);
    if (typeof end !== 'number') throw new Error(``);
    if (typeof compare !== 'function') throw new Error(``);
    if (start < 0) start = 0;
    if (end >= array.length) end = array.length - 1;
    if (end - start + 1 <= 1 || end <= start) return array;

    let result: T[] = Array.from(array);
    let length: number = end - start + 1;

    result = buildMaxHeap(result, start, end, length, compare);

    for (let index = end; index > start; index--) {
        [result[start], result[index]] = [result[index], result[start]];
        result = heapify(result, start, index - 1, start, compare);
    }

    return result;
}

/**
 * # Insertionsort algorithm
 * 
 * Stable: **True**
 * 
 * ## Performance
 * 
 * - Worst-case: **n2**
 * - Average-case: **n2**
 * - Best-case: **n**
 * 
 * Avarage Score: ~**128.91ms**
 */
export function insertionsort<T>(array: T[], start?: number, end?: number, compare?: CompareFunction): T[] {
    if (start === undefined) start = 0;
    if (end === undefined) end = array.length - 1;
    if (compare === undefined) compare = DefualtCompare;

    if (!Array.isArray(array)) throw new Error(``);
    if (typeof start !== 'number') throw new Error(``);
    if (typeof end !== 'number') throw new Error(``);
    if (typeof compare !== 'function') throw new Error(``);
    if (start < 0) start = 0;
    if (end >= array.length) end = array.length - 1;
    if (end - start + 1 <= 1 || end <= start) return array;

    let result: T[] = Array.from(array);

    for (let right = start + 1; right <= end; right++) {
        for (let left = right; left >= start + 1 && compare(result[left - 1], result[left]) > 0; left--) {
            [result[left - 1], result[left]] = [result[left], result[left - 1]];
        }
    }

    return result;
}

/**
 * # Introsort algorithm
 * 
 * A hybrid sorting algorithm that provides both fast average performance and optimal worst-case performance.
 * 
 * Stable: **False**
 * 
 * ## Performance
 * 
 * - Worst-case: **n log n**
 * - Average-case: **n log n**
 * - Best-case: **n log n**
 * 
 * Avarage Score: ~**0.99ms**
 */
export function introsort<T>(array: T[], start?: number, end?: number, compare?: CompareFunction, depthLevel?: number): T[] {
    if (start === undefined) start = 0;
    if (end === undefined) end = array.length - 1;
    if (compare === undefined) compare = DefualtCompare;
    if (depthLevel === undefined) depthLevel = 2 * Math.floor(Math.log(array.length) / Math.log(2));

    if (!Array.isArray(array)) throw new Error(``);
    if (typeof start !== 'number') throw new Error(``);
    if (typeof end !== 'number') throw new Error(``);
    if (typeof compare !== 'function') throw new Error(``);
    if (typeof depthLevel !== 'number') throw new Error(``);
    if (start < 0) start = 0;
    if (end >= array.length) end = array.length - 1;
    if (end - start + 1 <= 1 || end <= start) return array;

    let result: T[] = Array.from(array);
    let length: number = end - start + 1;

    if (length <= 16) return insertionsort(result, start, end, compare);
    if (depthLevel == 0) return heapsort(result, start, end, compare);

    let index = partition(result, start, end, compare);

    result = introsort(result, start, index - 1, compare, depthLevel - 1);
    result = introsort(result, index, end, compare, depthLevel - 1);

    return result;
}

/**
 * # Mergesort algorithm
 * 
 * Mergesort method is recursively called for sorting the given array.
 * 
 * Stable: **True**
 * 
 * ## Performance
 * 
 * - Worst-case: **n log n**
 * - Average-case: **n log n**
 * - Best-case: **n log n**
 * 
 * Avarage Score: ~**1.83ms**
 */
export function mergesort<T>(array: T[], start?: number, end?: number, compare?: CompareFunction): T[] {
    if (start === undefined) start = 0;
    if (end === undefined) end = array.length - 1;
    if (compare === undefined) compare = DefualtCompare;

    if (!Array.isArray(array)) throw new Error(``);
    if (typeof start !== 'number') throw new Error(``);
    if (typeof end !== 'number') throw new Error(``);
    if (typeof compare !== 'function') throw new Error(``);
    if (start < 0) start = 0;
    if (end >= array.length) end = array.length - 1;
    if (end - start + 1 <= 1 || end <= start) return array;

    var result: T[] = Array.from(array);
    var pivot: number = Math.ceil((end + start) / 2);

    result = mergesort(result, start, pivot - 1, compare);
    result = mergesort(result, pivot, end, compare);
    result = merge(result, start, pivot, end, compare);

    return result;
}

/**
 * # Quicksort algorithm
 * 
 * In this version of quicksort, it's using middle element of the array for the pivot.
 * 
 * Stable: **False**
 * 
 * ## Performance
 * 
 * - Worst-case: **n2**
 * - Average-case: **n log n**
 * - Best-case: **n log n**
 * 
 * Avarage Score: ~**1.19ms**
 */
export function quicksort<T>(array: T[], start?: number, end?: number, compare?: CompareFunction): T[] {
    if (start === undefined) start = 0;
    if (end === undefined) end = array.length - 1;
    if (compare === undefined) compare = DefualtCompare;

    if (!Array.isArray(array)) throw new Error(``);
    if (typeof start !== 'number') throw new Error(``);
    if (typeof end !== 'number') throw new Error(``);
    if (typeof compare !== 'function') throw new Error(``);
    if (start < 0) start = 0;
    if (end >= array.length) end = array.length - 1;
    if (end - start + 1 <= 1 || end <= start) return array;

    let result: T[] = Array.from(array);
    let pivot: number = partition(result, start, end, compare);

    result = quicksort(result, start, pivot - 1, compare);
    result = quicksort(result, pivot, end, compare);

    return result;
}

/**
 * # Selectionsort algorithm
 * 
 * Stable: **False**
 * 
 * ## Performance
 * 
 * - Worst-case: **n2**
 * - Average-case: **n2**
 * - Best-case: **n2**
 * 
 * Avarage Score: ~**79.68ms**
 */
export function selectionsort<T>(array: T[], start?: number, end?: number, compare?: CompareFunction): T[] {
    if (start === undefined) start = 0;
    if (end === undefined) end = array.length - 1;
    if (compare === undefined) compare = DefualtCompare;

    if (!Array.isArray(array)) throw new Error(``);
    if (typeof start !== 'number') throw new Error(``);
    if (typeof end !== 'number') throw new Error(``);
    if (typeof compare !== 'function') throw new Error(``);
    if (start < 0) start = 0;
    if (end >= array.length) end = array.length - 1;
    if (end - start + 1 <= 1 || end <= start) return array;
    
    let result: T[] = Array.from(array);
    let smallestIndex: number;

    for (let left: number = start; left <= end; left++) {
        smallestIndex = left;

        for (let right = left + 1; right <= end; right++) {
            if (compare(result[right], result[smallestIndex]) < 0) smallestIndex = right;
        }

        [result[smallestIndex], result[left]] = [result[left], result[smallestIndex]];
    }

    return result;
}

/**
 * # Shellsort algorithm
 * 
 * Stable: **False**
 * 
 * ## Performance
 *
 * - Worst-case: **n4/3**
 * - Average-case: **n lon n**
 * - Best-case: **n log n**
 * 
 * Avarage Score: ~**1.78ms**
 */
export function shellsort<T>(array: T[], start?: number, end?: number, compare?: CompareFunction): T[] {
    if (start === undefined) start = 0;
    if (end === undefined) end = array.length - 1;
    if (compare === undefined) compare = DefualtCompare;

    if (!Array.isArray(array)) throw new Error(``);
    if (typeof start !== 'number') throw new Error(``);
    if (typeof end !== 'number') throw new Error(``);
    if (typeof compare !== 'function') throw new Error(``);

    if (start < 0) start = 0;
    if (end >= array.length) end = array.length - 1;
    if (end - start + 1 <= 1 || end <= start) return array;

    let result: T[] = Array.from(array);
    let length: number = end - start + 1;

    for (let gap: number = Math.floor(length / 2); gap >= 1; gap = Math.floor(gap / 2)) {
        for (let right: number = start + gap; right <= end; right++) {
            for (let left: number = right; left >= start + gap && compare(result[left - gap], result[left]) > 0; left -= gap) {
                [result[left - gap], result[left]] = [result[left], result[left - gap]];
            }
        }
    }

    return result;
}

/**
 * # Timsort algorithm
 * 
 * Stable: **True**
 * 
 * ## Performance
 * 
 * - Worst-case: **n log n**
 * - Average-case: **n log n**
 * - Best-case: **n**
 * 
 * Avarage Score: ~**0.92ms**
 */
export function timsort<T>(array: T[], start?: number, end?: number, compare?: CompareFunction): T[] {
    if (start === undefined) start = 0;
    if (end === undefined) end = array.length - 1;
    if (compare === undefined) compare = DefualtCompare;

    if (!Array.isArray(array)) throw new Error(``);
    if (typeof start !== 'number') throw new Error(``);
    if (typeof end !== 'number') throw new Error(``);
    if (typeof compare !== 'function') throw new Error(``);

    if (start < 0) start = 0;
    if (end >= array.length) end = array.length - 1;
    if (end - start + 1 <= 1 || end <= start) return array;

    let result: T[] = Array.from(array);
    let length: number = end - start + 1;
    let runs: number = 32;

    for (
        let index: number = start;
        index <= end;
        result = insertionsort(result, index, Math.min(index + runs - 1), compare), index += runs
    );

    if (length <= runs) return result;

    for (let right: number = runs; right <= end; right *= 2) {
        for (let left: number = start; left <= end; left *= 2) {
            let pivot = left + right;
            result = merge(result, left, pivot, Math.min(left + (2 * right) - 1), compare);
        }
    }

    return result;
}