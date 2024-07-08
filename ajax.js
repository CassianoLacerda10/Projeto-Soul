function encontrarIndicePorValor(obj, valor) {
    let chaveEncontrada = Object.keys(obj).find(chave => obj[chave] === valor);
    return chaveEncontrada || null; // Retorna null se o valor não for encontrado
}

function hasNumeroParNaString(texto) {
    // Expressão regular para encontrar todos os dígitos na string
    const regex = /\d/g;
    
    // Extrai todos os dígitos da string usando a expressão regular
    const numeros = texto.match(regex);
    console.log(numeros);
    
    // Verifica se encontrou algum dígito e se algum deles é par
    if (numeros) {
        for (let i = 0; i < numeros.length; i++) {
            const numero = parseInt(numeros[i], 10);
            if (!isNaN(numero) && numero % 2 === 0) {
                return true; // Encontrou um dígito par
            }
        }
    }
    
    return false; // Nenhum dígito par encontrado
}

function requisitarPagina(url) {
    let ajax = new XMLHttpRequest();
    let resposta = document.getElementById('resposta');
    resposta.innerHTML = '';
    let form = document.getElementById('formUpload');
    let formData = new FormData(form);

    ajax.open("POST", url);

    ajax.onreadystatechange = () => {
        if (ajax.readyState == 4 && ajax.status == 200) {
            let data = JSON.parse(ajax.responseText);

            if (data.error) {
                alert(data.error);
                return;
            }

            // Criação da tabela
            let header = data.header;
            let table = document.createElement("table");
            let thead = document.createElement("thead");
            let tr = document.createElement("tr");
            let th1 = document.createElement("th");
            th1.innerHTML = header[0];
            let th2 = document.createElement("th");
            th2.innerHTML = header[1];
            let th3 = document.createElement("th");
            th3.innerHTML = header[2];
            let tbody = document.createElement("tbody");

            resposta.appendChild(table);
            resposta.appendChild(tbody);
            table.appendChild(thead);
            thead.appendChild(tr);
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);

            let rows = data.rows;
            for (let i = 0; i < rows.length; i++) {
                let x = document.createElement("tr");
                tbody.appendChild(x);
                for (let j = 0; j < 3; j++) {
                    let z = document.createElement("th");
                    x.appendChild(z);
                    z.innerHTML = rows[i][j];

                    // Confirma qual a coluna preço
                    if (header[j] == 'preco') {
                        let preco = encontrarIndicePorValor(header, 'preco');

                        // Pinta de vermelho os preços negativos
                        if (rows[i][preco].includes('-')) {
                            x.style.backgroundColor = 'red';
                        }
                    }
                }
                
                // Confirma qual a coluna codigo
                for (let j = 0; j < 3; j++) {
                    if (header[j] == 'codigo') {
                        let codigo = encontrarIndicePorValor(header, 'codigo');
                        
                        if (hasNumeroParNaString(rows[i][codigo]) == true) {
                            let btn = document.createElement('a');
                            btn.innerHTML = 'copiar';
                            btn.style.display = 'inline';
                            btn.setAttribute('href', '#');
                            x.appendChild(btn);

                            console.log(rows[i]);

                            btn.addEventListener('click', function(event) {
                                event.preventDefault();
                                
                                let textoParaCopiar = rows[i];
                                
                                let tempInput = document.createElement('textarea');
                                tempInput.value = textoParaCopiar;
                                document.body.appendChild(tempInput);
                                
                                tempInput.select();
                                tempInput.setSelectionRange(0, 99999);

                                document.execCommand('copy');
                                
                                document.body.removeChild(tempInput);
                                
                                alert('Linha copiada para a área de transferência!');
                            });
                        }
                    }
                }
            }
        }

        if (ajax.readyState == 4 && ajax.status == 404) {
            alert('ERROR: Tente novamente mais tarde!');
        }
    };
    ajax.send(formData);
}