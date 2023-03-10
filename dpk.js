const crypto = require('crypto');

/*
  * This function is used to generate or get a deterministic partition key for 
    a given event.

    If the event has a partitionKey property, that value is used as the partition
    key. Otherwise, a SHA3-512 hash of the event is used as the partition key.


    Args: event (object): The event to generate a partition key for. The event
    must be a JSON object and may have a partitionKey property.

    Returns: (string): The partition key for the event.
*/
exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = '0';
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else if (event.customKey) {
      candidate = event.customKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash('sha3-512').update(data).digest('hex');
    }
  }

  if (candidate) {
    if (typeof candidate !== 'string') {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH && event.customKey) {
    throw new Error('Custom partition key is too long');
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash('sha3-512').update(candidate).digest('hex');
  }
  return candidate;
};
