const bcrypt = require('bcryptjs');

const password = '123456';
const saltRounds = 10;

// Gerar o hash
bcrypt.hash(password, saltRounds).then(hash => {
    console.log('Hash gerado:', hash);
    
    // Testar a verificação
    bcrypt.compare(password, hash).then(result => {
        console.log('Teste de verificação:', result);
    });
}); 