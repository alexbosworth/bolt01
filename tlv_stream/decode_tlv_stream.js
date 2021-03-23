const {decodeTlvRecord} = require('./../tlv_record');

const byteLength = hex => hex.length / 2;
const isHex = n => !(n.length % 2) && /^[0-9A-F]*$/i.test(n);

/** Decode a TLV stream as key value pairs

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
*/
module.exports = ({encoded}) => {
  // Exit with error when no stream is provided
  if (!isHex(encoded)) {
    throw new Error('ExpectedHexEncodedTlvStreamToDecode');
  }

  // Exit early on empty stream
  if (!encoded) {
    return {records: []};
  }

  const totalBytes = byteLength(encoded);
  const stream = {offset: Number(), records: []};

  // Pull records off of the stream until the stream is fully read
  while (stream.offset < totalBytes) {
    stream.record = decodeTlvRecord({encoded, offset: stream.offset});

    stream.offset += stream.record.length;
    stream.records.push(stream.record);
  }

  return {records: stream.records};
};
