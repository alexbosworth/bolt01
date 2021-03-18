# BOLT 01

[![npm version](https://badge.fury.io/js/bolt01.svg)](https://badge.fury.io/js/bolt01)

Methods relating to Lightning Network
[BOLT 01](https://github.com/lightningnetwork/lightning-rfc/blob/master/01-messaging.md).

## decodeBigSize

Given BOLT 01 "BigSize" bytes, return a corresponding numeric value

    {
      encoded: <BigSize Encoded Value Hex String>
    }

    @throws
    <Error>

    @returns
    {
      decoded: <Decoded Number String>
      length: <Encoding Byte Length Number>
    }

Example:

```node
const {decodeBigSize} = require('bolt01');

// Decode a zero value BigSize number
const {decoded} = decodeBigSize({encoded: '00'});
```

## encodeBigSize

Given a numeric value, encode it as BOLT 01 "BigSize" bytes

    {
      number: <Number String>
    }

    @throws
    <Error>

    @returns
    {
      encoded: <BigSize Encoded Value Hex String>
    }

Example:

```node
const {encodeBigSize} = require('bolt01');

// Encode a zero value BigSize number
const {encoded} = decodeBigSize({number: '0'});
```
