// check-encryption.js
const aws = require('aws-sdk');
const config = require('../../../../config/aws');

async function verifyEncryption() {
  const s3 = new aws.S3();
  const buckets = await s3.listBuckets().promise();
  
  const nonCompliant = await Promise.all(buckets.Buckets.map(async (bucket) => {
    const encryption = await s3.getBucketEncryption({ 
      Bucket: bucket.Name 
    }).promise().catch(() => null);
    
    return encryption ? null : bucket.Name;
  }));

  return nonCompliant.filter(Boolean);
}

module.exports = verifyEncryption;