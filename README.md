# Rxjs Common

![rxjs-common-ci](https://github.com/witty-services/rxjs-common/workflows/rxjs-common-build/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/witty-services/rxjs-common/badge.svg?branch=master)](https://coveralls.io/github/witty-services/rxjs-common?branch=master)
[![npm version](https://badge.fury.io/js/%40witty-services%2Frxjs-common.svg)](https://badge.fury.io/js/%40witty-services%2Frxjs-common)
![GitHub](https://img.shields.io/github/license/witty-services/rxjs-common)
![GitHub repo size](https://img.shields.io/github/repo-size/witty-services/rxjs-common)
![GitHub last commit](https://img.shields.io/github/last-commit/witty-services/rxjs-common)
![GitHub issues](https://img.shields.io/github/issues/witty-services/rxjs-common)
![GitHub top language](https://img.shields.io/github/languages/top/witty-services/rxjs-common)

## Summary

* [How to install](#how-to-install)
* [Get Started](#get-started)
    * [log](#log)
    * [softCache](#softcache)
    * [hardCache](#hardcache)
    * [ifEmpty](#ifempty)
    * [ifNull](#ifnull)
    * [ifNotNull](#ifnotnull)
    * [ifTruthy](#iftruthy)
    * [wif](#wif)
    * [onAny](#onany)
    * [arrayFilter](#arrayfilter)
    * [countSubscription](#countsubscription)
    * [joinArray](#joinarray)
    * [toHotArray](#tohotarray)
    * [onError](#onerror)
    * [poll](#poll)

## How to install

```
npm install --save @witty-services/rxjs-common
```

## Get Started

### log()

Should log observable content with console API.

Basic usage :
```typescript
import {from} from 'rxjs';
import {log} from '@witty-services/rxjs-common';

from(['a', 'b']).pipe(
  log()
).subscribe();

// output: 'a', 'b'
```

With params usage :
```typescript
import {from} from 'rxjs';
import {log} from '@witty-services/rxjs-common';

from(['a', 'b']).pipe(
  log('Hello World !')
).subscribe();

// output: 'Hello World !', 'a', 'Hello World !', 'b'
```

### softCache()

Should create a cache between buffer and subscriptions until there is no more subscription.

Usage :
```typescript
import {from} from 'rxjs';
import {log, softCache} from '@witty-services/rxjs-common';

const buffer$ = from('a').pipe(
  log(),
  softCache()
)

buffer$.subscribe().unsubscribe(); // should display 'a' cause no active subscription
buffer$.subscribe(); // should display 'a' again cause no active subscription (unsubscribed previously)
buffer$.subscribe().unsubscribe(); // should display nothing cause previous subscription still active
```

### hardCache()

Should create a cache between buffer and subscriptions. Cache is not destroy when there is no more active subscription.

Usage :
```typescript
import {from} from 'rxjs';
import {log, hardCache} from '@witty-services/rxjs-common';

const buffer$ = from('a').pipe(
  log(),
  hardCache()
)

buffer$.subscribe().unsubscribe(); // should display 'a' cause no active subscription
buffer$.subscribe(); // should display nothing although the previous unsubscribe call
```
### ifEmpty()

Should return default observable when parent return is empty.

Usage :
```typescript
import {EMPTY, of} from 'rxjs';
import {ifEmpty} from '@witty-services/rxjs-common';

EMPTY.pipe(
  ifEmpty('test')
).subscribe(val => console.log(val))

of('test').pipe(
  ifEmpty('Is empty')
).subscribe(val => console.log(val))


// output: 'Is empty', 'test'
```

### ifNull()

Filter items emitted by the source Observable by only emitting null value.

Usage :
```typescript
import {from} from 'rxjs';
import {ifNull} from '@witty-services/rxjs-common';

from([1, null, '', undefined, false, 0, '2']).pipe(
  ifNull()
).subscribe(val => console.log(val))

// output: null, '', undefined, false
```

### ifNotNull()

Filter items emitted by the source Observable by only emitting non null value.

Usage :
```typescript
import {from} from 'rxjs';
import {ifNotNull} from '@witty-services/rxjs-common';

from([1, null, '', undefined, false, 0, '2']).pipe(
  ifNotNull()
).subscribe(val => console.log(val))

// output: 1, 0, '2'
```

### ifTruthy()

ifTruthy return a boolean casting testing of observable source.

Usage :
```typescript
import {from} from 'rxjs';
import {ifTruthy} from '@witty-services/rxjs-common';

from([0, 1]).pipe(
  ifTruthy()
).subscribe(val => console.log(val))

// output:  1
```

### wif()

Wif returns either an observable or another depending on the condition.

Usage :
```typescript
import {from} from 'rxjs';
import {wif} from '@witty-services/rxjs-common';

from([1, 2, 3]).pipe(
  wif(
    (value: number) => value > 2,
    () => 'Greater than',
    () => 'Less than or equal'
  )
).subscribe(val => console.log(val))

// output:  'Less than or equal', 'Less than or equal', 'Greater than'
```

### onAny()

Trigger the param function whatever append (EMPTY observable, error append or value).

Usage :
```typescript
import {EMPTY} from 'rxjs';
import {onAny} from '@witty-services/rxjs-common';

EMPTY.pipe(
  onAny(() => console.log('Hello'))
).subscribe()

// output: 'Hello'
```

### onError()

Handle Specific error

Usage :
```typescript
import {of, timer} from 'rxjs';
import {tap} from 'rxjs/operators';
import {onError} from '@witty-services/rxjs-common';

class MyCustomError {}

timer(1000).pipe(
  tap(() => throw new MyCustomError()),
  onError(MyCustomError, (err: MyCustomError) => {
    return of('Hello')
  })
).subscribe()

// output: 'Hello'
```

### arrayFilter()
### countSubscription()
### joinArray()
### toHotArray()

### poll()

Allows to emit source observable's value and emit its value every interval

Usage :
```typescript
import { of } from "rxjs";
import { tap, take } from "rxjs/operators";
import { poll } from '@witty-services/rxjs-common';

const dataSource$ = of(1);

dataSource$.pipe(
  poll( 500, true),
  take(4),
  tap(console.log)
).subscribe()

// output: 1, 1, 1, 1
```
