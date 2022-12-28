# Rxjs Common

![rxjs-common-ci](https://github.com/paddls/rxjs-common/workflows/rxjs-common-build/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/paddls/rxjs-common/badge.svg?branch=master)](https://coveralls.io/github/paddls/rxjs-common?branch=master)
[![npm version](https://badge.fury.io/js/@paddls%2Frxjs-common.svg)](https://badge.fury.io/js/@paddls%2Frxjs-common)
![GitHub](https://img.shields.io/github/license/paddls/rxjs-common)
![GitHub repo size](https://img.shields.io/github/repo-size/paddls/rxjs-common)
![GitHub last commit](https://img.shields.io/github/last-commit/paddls/rxjs-common)
![GitHub issues](https://img.shields.io/github/issues/paddls/rxjs-common)
![GitHub top language](https://img.shields.io/github/languages/top/paddls/rxjs-common)

## Informations

> :warning: Since version 1.3.2, ```rxjs-common``` has been published under ```@paddls``` namespace. We continue to maintain ```@witty-services``` namespace.

## Summary

* [How to install](#how-to-install)
* [Most used operators](#most-used-operators)
  * [log](#log--)
  * [softCache](#softcache--)
  * [hardCache](#hardcache--)
  * [refreshOn](#refreshon--)
* [Array operators](#array-operators)
  * [arrayFilter](#arrayfilter--)
  * [arrayFind](#arrayfind--)
  * [arrayMap](#arraymap--)
  * [Other array operators](#other-array-operators)
* [Filtering operators](#filtering-operators)
  * [ifEmpty](#ifempty--)
  * [ifFalsy](#iffalsy--)
  * [ifNotNull](#ifnotnull--)
  * [ifNotNulls](#ifnotnulls--)
  * [ifNull](#ifnull--)
  * [ifNulls](#ifnulls--)
  * [ifTruthy](#iftruthy--)
* [Other operators](#other-operators)
  * [countSubscription](#countsubscription--)
  * [joinArray](#joinarray--)
  * [onAny](#onany--)
  * [onError](#onerror--)
  * [poll](#poll--)
  * [sneakyThrow](#sneakythrow--)
  * [toHotArray](#tohotarray--)
  * [wif](#wif--)

## How to install

```
npm install --save @paddls/rxjs-common
```

**`RxJS` compatibility table :**

| `RxJS`            | `rxjs-common`     |
|-------------------|-------------------|
| `7.0.0` and above | `2.0.0` and above |
| `6.5.4` and above | `1.0.0` and above |

## Most used operators

### log()

Logs observable content with console API.

Basic usage :

```typescript
import { from } from 'rxjs';
import { log } from '@paddls/rxjs-common';

from(['a', 'b']).pipe(
        log()
).subscribe();

// output: 'a', 'b'
```

With params usage :

```typescript
import { from } from 'rxjs';
import { log } from '@paddls/rxjs-common';

from(['a', 'b']).pipe(
        log('Hello World !')
).subscribe();

// output: 'Hello World !', 'a', 'Hello World !', 'b'
```

### softCache()

Creates a cache destroyed when there is no more active subscription.

Usage :

```typescript
import { from } from 'rxjs';
import { log, softCache } from '@paddls/rxjs-common';

const buffer$ = from('a').pipe(
        log(),
        softCache()
)

buffer$.subscribe().unsubscribe(); // should display 'a' cause no active subscription
buffer$.subscribe(); // should display 'a' again cause no active subscription (unsubscribed previously)
buffer$.subscribe().unsubscribe(); // should display nothing cause previous subscription still active
```

### hardCache()

Creates a cache between buffer and subscriptions. Cache is not destroyed when there is no more active subscription.

Usage :

```typescript
import { from } from 'rxjs';
import { log, hardCache } from '@paddls/rxjs-common';

const buffer$ = from('a').pipe(
        log(),
        hardCache()
)

buffer$.subscribe().unsubscribe(); // should display 'a' cause no active subscription
buffer$.subscribe(); // should display nothing although the previous unsubscribe call
```

### refreshOn()

Emits or re-emits source's value at each trigger observable emission.

Usage :

```typescript
import { of, interval } from "rxjs";
import { refreshOn } from '@paddls/rxjs-common';

const source$ = of(1);
const triggerOne$ = of('a');
const triggerTwo$ = interval(1000);

dataSource$.pipe(
        refreshOn(triggerOne$, triggerTwo$)
).subscribe(console.log);

// output: 1, 1, ... 1 every seconds
```

## Array operators

### arrayFilter()

Returns the elements of source's array that meet the condition specified in a callback function.

Usage :

```typescript
import { of } from 'rxjs';
import { arrayFilter } from '@paddls/rxjs-common';

of([1, 2, 3, 4, 5]).pipe(
        arrayFilter((input: number) => input % 2 === 0)
).subscribe(console.log);

// output: [2, 4]
```

### arrayFind()

Returns the single element of source's array that meet the condition specified in a callback function.

Usage :

```typescript
import { of } from 'rxjs';
import { arrayFind } from '@paddls/rxjs-common';

of([1, 2, 3, 4, 5]).pipe(
        arrayFind((input: number) => input > 1)
).subscribe(console.log);

// output: 2
```

### arrayMap()

Calls a defined callback function on each element of source's array, and returns an array that contains the results.

Usage :

```typescript
import { of } from 'rxjs';
import { arrayMap } from '@paddls/rxjs-common';

of([1, 2, 3]).pipe(
        arrayMap((input: number) => `${ input }`)
).subscribe(console.log);

// output: ['1', '2', '3']
```

### Other array operators

- `arrayEvery`
- `arraySome`
- `arraySort`

Each of these operators follow the same principle and have the same signature as corresponding ES5 methods.

## Filtering operators

### ifEmpty()

Returns default observable when parent return is empty.

Usage :

```typescript
import { EMPTY, of } from 'rxjs';
import { ifEmpty } from '@paddls/rxjs-common';

EMPTY.pipe(
        ifEmpty('test')
).subscribe(console.log)

of('test').pipe(
        ifEmpty('Is empty')
).subscribe(console.log)


// output: 'test'
```

### ifFalsy()

Filters source where value is null, undefined, '', 0.

Usage :

```typescript
import { from } from 'rxjs';
import { ifFalsy } from '@paddls/rxjs-common';

from([0, 1]).pipe(
        ifFalsy()
).subscribe(console.log)

// output:  0
```

### ifNotNull()

Filters items emitted by the source Observable by only emitting non-null value.

Usage :

```typescript
import { from } from 'rxjs';
import { ifNotNull } from '@paddls/rxjs-common';

from([1, null, '', undefined, false, 0, '2']).pipe(
        ifNotNull()
).subscribe(console.log)

// output: 1, 0, '2'
```

### ifNotNulls()

Filters items emitted by the source array by only emitting when each item satisfies the != null condition.

Usage :

```typescript
import { combineLatest, from } from 'rxjs';
import { ifNotNulls } from './if-not-nulls.operator';

combineLatest([
  from([null, 1, 2]),
  from([3, undefined, 4])
]).pipe(
        ifNotNulls()
).subscribe(console.log)

// output: [1, 3], [2, 4]
```

### ifNull()

Filters items emitted by the source Observable by only emitting null value.

Usage :

```typescript
import { from } from 'rxjs';
import { ifNull } from '@paddls/rxjs-common';

from([1, null, '', undefined, false, 0, '2']).pipe(
        ifNull()
).subscribe(console.log)

// output: null, '', undefined, false
```

### ifNulls()

Filters items emitted by the source array by only emitting when each item satisfies the == null condition.

Usage :

```typescript
import { combineLatest, from } from 'rxjs';
import { ifNulls } from './if-nulls.operator';

combineLatest([
  from([1, null]),
  from([undefined, 2])
]).pipe(
        ifNulls()
).subscribe(console.log)

// output: [null, undefined], [undefined, undefined]
```

### ifTruthy()

Filters source where value is not null, undefined, '', 0.

Usage :

```typescript
import { from } from 'rxjs';
import { ifTruthy } from '@paddls/rxjs-common';

from([0, 1]).pipe(
        ifTruthy()
).subscribe(console.log)

// output:  1
```

### countSubscription()

Logs number of active subscriptions.

Basic usage :

```typescript
import { from } from 'rxjs';
import { countSubscription } from '@paddls/rxjs-common';

from(['a', 'b']).pipe(
  countSubscription()
).subscribe();

// outputs number of active subscriptions through time
```

### joinArray()

Combines the latest values of source and each input array into a single array.

Usage :

```typescript
import { from } from 'rxjs';
import { joinArray } from '@paddls/rxjs-common';

from([[1], [3]]).pipe(
  joinArray(from([[], [2], []])),
).subscribe(console.log)

// output:  [1], [1, 2], [3]
```

## Other operators

### onAny()

Triggers callback on any event passing through (EMPTY observable, error or value).

Usage :

```typescript
import { EMPTY } from 'rxjs';
import { onAny } from '@paddls/rxjs-common';

EMPTY.pipe(
  onAny(() => console.log('Hello'))
).subscribe()

// output: 'Hello'
```

### onError()

Handles errors of specified type.

Usage :

```typescript
import { of, timer } from 'rxjs';
import { tap } from 'rxjs/operators';
import { onError } from '@paddls/rxjs-common';

class MyCustomError {
}

timer(1000).pipe(
        tap(() => throw new MyCustomError()),
        onError(MyCustomError, (err: MyCustomError) => {
          return of('Hello')
        })
).subscribe()

// output: 'Hello'
```

### poll()

Emits source value at every interval.

Usage :

```typescript
import { of } from "rxjs";
import { take } from "rxjs/operators";
import { poll } from '@paddls/rxjs-common';

const dataSource$ = of(1);

dataSource$.pipe(
  poll(500, true),
  take(4),
).subscribe(console.log)

// output: 1, 1, 1, 1
```

### sneakyThrow()

Catches observable error and returns EMPTY.

Usage :

```typescript
import { of } from "rxjs";
import { tap } from "rxjs/operators";
import { sneakyThrow } from '@paddls/rxjs-common';

throwError(new Error('An error')).pipe(
  sneakyThrow()
).subscribe(console.log);

// output: EMPTY
```

### toHotArray()

Scans source values into an array.

Usage :

```typescript
import { from } from "rxjs";
import { sneakyThrow } from '@paddls/rxjs-common';

from([1, 2, 3]).pipe(
  toHotArray()
).subscribe(console.log);

// output: [1], [1, 2], [1, 2, 3]
```

### wif()

Returns either an observable or another depending on the condition.

Usage :

```typescript
import { from } from 'rxjs';
import { wif } from '@paddls/rxjs-common';

from([1, 2, 3]).pipe(
  wif(
    (value: number) => value > 2,
    () => 'Greater than',
    () => 'Less than or equal'
  )
).subscribe(console.log)

// output:  'Less than or equal', 'Less than or equal', 'Greater than'
```
