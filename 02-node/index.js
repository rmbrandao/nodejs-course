//modulo interno do nodeJS

const utils = require('util');
const obterEnderecoAsync = utils.promisify(obterEndereco);

function obterUsuario() {
    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                id: 1,
                nome: 'Teste',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolverPromise(resolve, reject) {
        setTimeout(() => {
            return resolve({
                telefone: '1234567',
                ddd: '43'
            })
        }, 2000);
    })
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'Rua teste',
            numero: '321'
        })
    }, 2000)
}

const userPromise = obterUsuario()

userPromise
    .then(function (usuario) {
        return obterTelefone(usuario.id)
            .then(function resolverTelefone(result) {
                return {
                    usuario: {
                        nome: usuario.nome,
                        id: usuario.id,
                    },
                    telefone: result
                }
            })
    })
    .then(function (resultado) {
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(function (resultado) {
        console.log(`
            Nome: ${resultado.usuario.nome},
            Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero},
            Telefone: (${resultado.telefone.ddd})${resultado.telefone.telefone}
        `)
    })
    .catch(function (error) {
        console.error('Falhou', error)
    })

// obterUsuario(function resolverUsuario(erro, usuario) {
//     if (erro) {
//         console.error('Deu erro', erro)
//         return;
//     }

//     obterTelefone(usuario.id, function resolverTelefone(erro1, telefone) {
//         if (erro1) {
//             console.error('Deu erro', erro1)
//             return;
//         }

//         obterEndereco(usuario.id, function resolverEndereco(erro2, endereco) {
//             if (erro2) {
//                 console.error('Deu erro', erro2)
//                 return;
//             }

//             console.log(`
//                 Nome: ${usuario.nome}
//                 Endereco: ${endereco.rua}, ${endereco.numero}
//                 Telefone: (${telefone.ddd})${telefone.telefone}
//             `)
//         })
//     })
// })
// const telefone = obterTelefone(usuario.id)

// console.log('telefone', usuario.telefone)