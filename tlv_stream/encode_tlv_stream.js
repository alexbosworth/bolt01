const {encodeTlvRecord} = require('./../tlv_record');
const {sortByBigInt} = require('./../arrays');

const attribute = 'type';
const {isArray} = Array;
const joinEncodedRecords = records => records.join('');
const uniq = arr => Array.from(new Set(arr));

/** Encode key value pairs as a TLV stream

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
*/
module.exports = ({records}) => {
  // Exit with error when no records are provided
  if (!isArray(records)) {
    throw new Error('ExpectedArrayOfRecordsToEncodeTlvStream');
  }

  const types = records.map(n => n.type);

  // Exit with error when there are duplicate values for the same type
  if (uniq(types).length !== types.length) {
    throw new Error('ExpectedNoDuplicateTypeRecordsToEncodeInTlvStream');
  }

  const {sorted} = sortByBigInt({attribute, array: records});

  const encodedRecords = sorted.map(({type, value}) => {
    return encodeTlvRecord({type, value}).encoded;
  });

  return {encoded: joinEncodedRecords(encodedRecords)};
};
