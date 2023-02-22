const jwt = require('jsonwebtoken')
const secretKey = 'codin-secret-key'

function gerarToken(usuario) {
  const payload = {
    usuario: usuario.id,
    email: usuario.email,
    iat: Date.now()
  };
  const token = secretKey
  const config = { 
    expiresIn: '1h'
  }
  return jwt.sign(payload, token, config)
}

module.exports = {
  gerarToken: gerarToken,
  secretKey: secretKey,
}
