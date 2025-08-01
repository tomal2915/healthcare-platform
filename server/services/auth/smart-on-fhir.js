// smart-on-fhir.js
const { URL } = require('url');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: process.env.FHIR_JWKS_URI,
  cache: true,
  rateLimit: true
});

async function verifySmartToken(token) {
  const decoded = jwt.decode(token, { complete: true });
  const key = await client.getSigningKey(decoded.header.kid);
  const signingKey = key.getPublicKey();
  
  return jwt.verify(token, signingKey, {
    audience: process.env.FHIR_CLIENT_ID,
    issuer: process.env.FHIR_ISSUER,
    algorithms: ['RS256']
  });
}

module.exports = {
  authorize: async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) throw new Error('Authorization header required');
      
      const token = authHeader.split(' ')[1];
      const claims = await verifySmartToken(token);
      
      req.fhirUser = {
        id: claims.sub,
        scopes: claims.scope.split(' '),
        context: claims.fhirContext
      };
      
      next();
    } catch (error) {
      res.status(401).json({ error: 'Invalid token', details: error.message });
    }
  }
};