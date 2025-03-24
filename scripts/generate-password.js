const bcrypt = require('bcryptjs');

const password = '123456';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
    if (err) {
        console.error('Erro ao gerar hash:', err);
        return;
    }
    console.log('Hash gerado:', hash);
}); 