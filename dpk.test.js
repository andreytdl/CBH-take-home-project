const { deterministicPartitionKey } = require('./dpk');

describe('deterministicPartitionKey', () => {
  const MAX_PARTITION_KEY_LENGTH = 256;

  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe('0');
  });
  it('Returns the custom partition key when given an event with a customKey property', () => {
    const customKey = deterministicPartitionKey({ customKey: 'custom' });
    expect(customKey).toBe('custom');
  });
  it('Returns a sha3-512 partition key with size smaller then the max partition key length when given an event with no partitionKey property', () => {
    const shaKey = deterministicPartitionKey({});
    expect(shaKey.length < MAX_PARTITION_KEY_LENGTH).toBeTruthy();
  });
  it('throws an error when the custom partition key is too long', () => {
    const tooLong = 'a'.repeat(MAX_PARTITION_KEY_LENGTH + 1);
    expect(() => deterministicPartitionKey({ customKey: tooLong })).toThrow();
  });
  it('should the current partition key when given an event with a partitionKey property', () => {
    const partitionKey = 'partitionKey';
    const event = { partitionKey: partitionKey };
    const currentKey = deterministicPartitionKey(event);
    expect(currentKey).toBe(partitionKey);
  });
});
