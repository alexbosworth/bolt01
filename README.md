# BOLT 01

[![npm version](https://badge.fury.io/js/bolt01.svg)](https://badge.fury.io/js/bolt01)

Methods relating to Lightning Network BOLT 01.

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
    }

Example:

```node
const {decodeBigSize} = require('bolt01');

// Decode a zero value BigSize number
const {decoded} = decodeBigSize({encoded: '00'});
```