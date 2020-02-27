# Rxjs Common

## Install

```
npm i @witty-services/rxjs-common
```

## Get Started

### log()

Basic usage 
```
from('a', 'b').pipe(
  log()
)

// should log 
-> 'a'
-> 'b'
```

With params usage
```
from('a', 'b').pipe(
  log('Hello World !')
)

// should log 
-> 'Hello World !', 'a'
-> 'Hello World !', 'b'
```

### softCache()

Usage
```
const buffer$ = from('a').pipe(
  log('Hey !'),
  softCache()
)

buffer.subscribe();
buffer.subscribe();

// should create a cache between buffer and suscription
// should log for both subscription
-> 'Hey !', 'a'
```
### hardCache()
### arrayFilter()
### countSubscription()
### ifEmpty()
### ifNotNull()
### ifNull()
### ifTruthy()
### joinArray()
### toHotArray()
### wif()
### onAny()
