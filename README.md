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
    * [ifFalsy](#iffalsy)
    * [ifNull](#ifnull)
    * [ifNulls](#ifnulls)
    * [ifNotNull](#ifnotnull)
    * [ifNotNulls](#ifnotnulls)
    * [ifTruthy](#iftruthy)
    * [wif](#wif)
    * [onAny](#onany)
    * [arrayFilter](#arrayfilter)
    * [countSubscription](#countsubscription)
    * [joinArray](#joinarray)
    * [toHotArray](#tohotarray)
    * [onError](#onerror)
    * [poll](#poll)
    * [refreshOn](#refreshon)
    * [sneakyThrow](#sneakythrow)

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


// output: 'test'
```

### ifFalsy()

ifFalsy filters source where value is null, undefined, '', 0.

Usage :
```typescript
import {from} from 'rxjs';
import {ifFalsy} from '@witty-services/rxjs-common';

from([0, 1]).pipe(
  ifFalsy()
).subscribe(val => console.log(val))

// output:  0
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

### ifNulls()

Filter items emitted by the source array by only emitting when each item
satisfies the == null condition.

Usage :
```typescript
import {combineLatest, from} from 'rxjs';
import {ifNulls} from './if-nulls.operator';

combineLatest([
  from([1, null]),
  from([undefined, 2])
]).pipe(
  ifNulls()
).subscribe(val => console.log(val))

// output: [null, undefined], [undefined, undefined]
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

### ifNotNulls()

Filter items emitted by the source array by only emitting when each item
satisfies the != null condition.

Usage :
```typescript
import {combineLatest, from} from 'rxjs';
import {ifNotNulls} from './if-not-nulls.operator';

combineLatest([
  from([null, 1, 2]),
  from([3, undefined, 4])
]).pipe(
  ifNotNulls()
).subscribe(val => console.log(val))

// output: [1, 3], [2, 4]
```

### ifTruthy()

ifTruthy filters source where value is not null, undefined, '', 0.

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
import { take } from "rxjs/operators";
import { poll } from '@witty-services/rxjs-common';

const dataSource$ = of(1);

dataSource$.pipe(
  poll( 500, true),
  take(4),
).subscribe(console.log)

// output: 1, 1, 1, 1
```

### refreshOn()

Emits or re-emits source's result at each trigger observable emission

Usage :
```typescript
import { of, interval } from "rxjs";
import { refreshOn } from '@witty-services/rxjs-common';

const source$ = of(1);
const triggerOne$ = of('a');
const triggerTwo$ = interval(1000);

dataSource$.pipe(
  refreshOn(triggerOne$, triggerTwo$)
).subscribe(console.log);

// output: 1, 1, ... 1 every seconds
```

### sneakyThrow()

Catches observable error and returns EMPTY

Usage :
```typescript
import { of } from "rxjs";
import { tap } from "rxjs/operators";
import { sneakyThrow } from '@witty-services/rxjs-common';

throwError(new Error('An error')).pipe(
  sneakyThrow()
).subscribe(console.log);

// output: EMPTY
```
