const formContato = document.querySelector('#menucontato form');

    formContato.addEventListener('submit', function(event){
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();
    
    if (nome === '' || email === '' || mensagem === ''){
        alert('Por favor, preencha todos os campos.');
        return;
    }

    if (nome && email && mensagem && email.includes('@')) {
        const dadosContato = { nome, email, mensagem };
        salvarContato(dadosContato);

        alert(`Mensagem enviada com sucesso! ${nome}, agradecemos seu contato.`);
        formContato.reset();
    } else {
        alert('Por favor, preencha todos os campos corretamente. O email deve conter "@"');
    }

    exibirMensagemSucesso('Mensagem enviada com sucesso!', 'sucesso');
    formContato.reset();
});

function exibirMensagemSucesso(texto, tipo){
    const mensagemSucesso = document.createElement('p');
    mensagemSucesso.textContent = texto;
    mensagemSucesso.classList.add('mensagem-sucesso');
    mensagemSucesso.style.color = tipo === 'sucesso' ? 'green' : 'red';
    mensagemSucesso.style.fontWeight = 'bold';
    formContato.appendChild(mensagemSucesso);
}