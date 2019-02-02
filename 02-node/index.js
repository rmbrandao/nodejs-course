function obterUsuario(callback) {
    setTimeout(function () {
        return callback(null, {
            id: 1,
            nome: 'Teste',
            dataNascimento: new Date()
        })
    }, 1000);
}

function obterTelefone(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            telefone: '1234567',
            ddd: '43'
        })
    }, 2000);
}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'Rua teste',
            numero: '321'
        })
    }, 2000)
}

function resolverUsuario(usuario) {
    console.log('usuario', usuario)
}

obterUsuario(function resolverUsuario(erro, usuario) {
    if (erro) {
        console.error('Deu erro', erro)
        return;
    }

    obterTelefone(usuario.id, function resolverTelefone(erro1, telefone) {
        if (erro1) {
            console.error('Deu erro', erro1)
            return;
        }

        obterEndereco(usuario.id, function resolverEndereco(erro2, endereco) {
            if (erro2) {
                console.error('Deu erro', erro2)
                return;
            }

            console.log(`
                Nome: ${usuario.nome}
                Endereco: ${endereco.rua}, ${endereco.numero}
                Telefone: (${telefone.ddd})${telefone.telefone}
            `)
        })
    })
})
// const telefone = obterTelefone(usuario.id)

// console.log('telefone', usuario.telefone)