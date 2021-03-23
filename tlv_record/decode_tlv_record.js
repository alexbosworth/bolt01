const {decodeBigSize} = require('./../big_size');

const hexLen = byteLength => !byteLength ? 0 : byteLength * 2;
const read = (from, hex, to) => hex.slice(from, !to ? undefined : to + from);

/** Decode an encoded TLV record

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
*/
module.exports = ({encoded, offset}) => {
  // Start position in the hex
  const start = hexLen(offset);

  // The record type is a BigSize number that starts the record
  const type = decodeBigSize({encoded: read(start, encoded)});

  // Start position of the size data
  const sizeStart = start + hexLen(type.length);

  // Decode the byte length of the record value from the bytes after the type
  const bytes = decodeBigSize({encoded: read(sizeStart, encoded)});

  // Count bytes used for metadata about the record value
  const metaBytes = type.length + bytes.length;

  // Exit early when there are no bytes to read off
  if (!Number(bytes.decoded)) {
    return {length: metaBytes, type: type.decoded, value: String()};
  }

  // Hex position where the value starts
  const valueStart = start + hexLen(metaBytes);

  // Total bytes used across the record
  const totalBytes = metaBytes + Number(bytes.decoded);

  // Exit early with error when the encoded byte length exceeds available bytes
  if (start + hexLen(totalBytes) > encoded.length) {
    throw new Error('ExpectedAdditionalValueBytesInTlvRecord');
  }

  return {
    length: totalBytes,
    type: type.decoded,
    // Offset the record for the type and byte length encoding, read n bytes
    value: read(valueStart, encoded, hexLen(Number(bytes.decoded))),
  };
};
