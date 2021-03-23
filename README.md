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

## decodeTlvRecord

Decode an encoded TLV record

    {
      encoded: <Encoded TLV Record Hex String>
      [offset]: <Record Offset By Bytes Number>
    }

    @throws
    <Error>

    @returns
    {
      length: <Total Record Byte Length Number>
      type: <Message Type Number String>
      value: <Raw Value Hex String>
    }

Example:

```node
const {decodeTlvRecord} = require('bolt01');

// Type '1' and value '01'
const {type, value} = decodeTlvRecord({encoded: '010101'});
```

## decodeTlvStream

Decode a TLV stream as key value pairs

    {
      encoded: <TLV Records Stream Hex Encoded String>
    }

    @throws
    <Error>

    @returns
    {
      records: [{
        type: <Message Type Number String>
        value: <Raw Value Hex String>
      }]
    }

Example:

```node
const {decodeTlvStream} = require('bolt01');

// {records: [{type: '1', value: '01}]}
const {records} = decodeTlvRecord({encoded: '010101'});
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

## encodeTlvRecord

Encode data as a TLV record

    {
      type: <Message Type Number String>
      value: <Raw Value Hex String>
    }

    @throws
    <Error>

    @returns
    {
      encoded: <Encoded TLV Record Hex String>
    }

Example:

```node
const {encodeTlvRecord} = require('bolt01');

// encoded: '010101'
const {encoded} = encodeTlvRecord({type: '1', value: '01'});
```

## encodeTlvStream

Encode key value pairs as a TLV stream

    {
      records: [{
        type: <Message Type Number String>
        value: <Raw Value Hex String>
      }]
    }

    @throws
    <Error>

    @returns
    {
      encoded: <TLV Records Stream Hex Encoded String>
    }

Example:

```node
const {encodeTlvStream} = require('bolt01');

// encoded: '010101'
const {encoded} = encodeTlvStream({records: [{type: '1', value: '01'}]});
```
