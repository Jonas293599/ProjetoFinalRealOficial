 // --- Lógica de adicionar area (NOME, COR)---
    document.getElementById('add-area').addEventListener('click', () => {
        const areaNome = document.getElementById('area-nome');
        const area = areaNome.value;
        const areaColor = document.getElementById('area-cor')
        const color = areaColor.value;
        if(area){
            console.log("Nome: " + area + "\nCor: " + color);
        }
    });



    // --- Lógica do Builder de Curso ---
    document.getElementById('add-disciplina-curso').addEventListener('click', () => {
        const select = document.getElementById('disciplina-select');
        const cargaHorariaInput = document.getElementById('disciplina-carga-curso');
        
        const disciplinaId = select.value;
        const disciplinaNome = select.options[select.selectedIndex].text.split(' (')[0];
        const cargaHoraria = parseInt(cargaHorariaInput.value);

        if (!disciplinaId || !cargaHoraria) {
            alert('Por favor, selecione uma disciplina e defina a carga horária.');
            return;
        }

        disciplinasDoCurso.push({ id: disciplinaId, nome: disciplinaNome, carga: cargaHoraria });
        renderDisciplinasAdicionadas();
        cargaHorariaInput.value = '';
    });

    function renderDisciplinasAdicionadas() {
        const listaContainer = document.getElementById('disciplinas-adicionadas-lista');
        listaContainer.innerHTML = '';
        let cargaTotal = 0;

        disciplinasDoCurso.forEach((disciplina, index) => {
            const div = document.createElement('div');
            div.className = 'disciplina-added';
            div.innerHTML = `<span>${disciplina.nome} (${disciplina.carga}h)</span>`;
            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '&times;';
            deleteBtn.className = 'delete-btn';
            deleteBtn.onclick = () => {
                disciplinasDoCurso.splice(index, 1);
                renderDisciplinasAdicionadas();
            };
            div.appendChild(deleteBtn);
            listaContainer.appendChild(div);
            cargaTotal += disciplina.carga;
        });

        document.getElementById('curso-cargahorariatotal').value = cargaTotal;
    }


    // --- Funções CRUD Genéricas e Específicas ---

    function setupCourseCrud() {
        const addButton = document.getElementById('add-curso');
        const list = document.getElementById('curso-list');

        addButton.addEventListener('click', async () => {
            const data = {
                nome: document.getElementById('curso-nome').value,
                tipo: document.getElementById('curso-tipo').value,
                area: document.getElementById('curso-area').value,
                vagas: document.getElementById('curso-vagas').value,
                pago: document.getElementById('curso-pago').value,
                dataInicio: document.getElementById('curso-datainicio').value,
                cargaTotal: document.getElementById('curso-cargahorariatotal').value,
                disciplinas: disciplinasDoCurso // Adiciona o array de disciplinas
            };

            if (!data.nome || !data.tipo) {
                alert('Por favor, preencha pelo menos o Nome e o Tipo do curso.');
                return;
            }

            try {
                await addDoc(collection(db, `/artifacts/${appId}/public/data/cursos.json`), data);
                // Limpa o formulário
                document.getElementById('curso-nome').value = '';
                document.getElementById('curso-vagas').value = '';
                document.getElementById('curso-datainicio').value = '';
                disciplinasDoCurso = [];
                renderDisciplinasAdicionadas();

            } catch (error) {
                console.error(`Error adding to cursos:`, error);
            }
        });

        onSnapshot(collection(db, `/artifacts/${appId}/public/data/cursos.json`), (snapshot) => {
            list.innerHTML = '';
            snapshot.forEach((doc) => {
                const item = doc.data();
                const li = document.createElement('li');
                li.innerHTML = `<span>${item.nome} (${item.tipo} - ${item.cargaTotal || 0}h)</span>`;
                const deleteButton = document.createElement('button');
                deleteButton.className = 'delete-btn';
                deleteButton.onclick = () => { if (confirm('Tem certeza?')) deleteDoc(doc.ref); };
                li.appendChild(deleteButton);
                list.appendChild(li);
            });
        });
    }

    function setupDisciplineCrud() {
        const addButton = document.getElementById('add-disc');
        const list = document.getElementById('disc-list');
        const nameInput = document.getElementById('disc-nome');
        const cargaInput = document.getElementById('disc-cargahoraria');

        addButton.addEventListener('click', async () => {
            if (!nameInput.value || !cargaInput.value) {
                alert('Preencha o nome e a carga horária da disciplina.');
                return;
            }
            try {
                await addDoc(collection(db, `/artifacts/${appId}/public/data/disciplinas.json`), {
                    nome: nameInput.value,
                    cargaHoraria: parseInt(cargaInput.value)
                });
                nameInput.value = '';
                cargaInput.value = '';
            } catch (error) {
                console.error(`Error adding to disciplinas:`, error);
            }
        });

        onSnapshot(collection(db, `/artifacts/${appId}/public/data/disciplinas.json`), (snapshot) => {
            list.innerHTML = '';
            const disciplinaSelect = document.getElementById('disciplina-select');
            disciplinaSelect.innerHTML = '<option value="">Selecione...</option>';
            
            snapshot.forEach((doc) => {
                const item = doc.data();
                // Popula a lista principal
                const li = document.createElement('li');
                li.innerHTML = `<span>${item.nome} (${item.cargaHoraria}h)</span>`;
                const deleteButton = document.createElement('button');
                deleteButton.className = 'delete-btn';
                deleteButton.onclick = () => { if (confirm('Tem certeza?')) deleteDoc(doc.ref); };
                li.appendChild(deleteButton);
                list.appendChild(li);

                // Popula o select no builder de cursos
                disciplinaSelect.innerHTML += `<option value="${doc.id}">${item.nome} (${item.cargaHoraria}h)</option>`;
            });

            // Adiciona listener para auto-preencher carga horária
            disciplinaSelect.onchange = () => {
                const selectedText = disciplinaSelect.options[disciplinaSelect.selectedIndex].text;
                const carga = selectedText.match(/\((\d+)h\)/);
                if (carga) {
                    document.getElementById('disciplina-carga-curso').value = carga[1];
                }
            };
        });
    }

    function loadAreasIntoCourseForm() {
        onSnapshot(collection(db, `/artifacts/${appId}/public/data/areas.json`), (snapshot) => {
            const areaSelect = document.getElementById('curso-area');
            areaSelect.innerHTML = '<option value="">Selecione...</option>';
            snapshot.forEach((doc) => {
                const item = doc.data();
                areaSelect.innerHTML += `<option value="${item.nome}">${item.nome}</option>`;
            });
        });
    }

    function setupCrud(prefix, collectionName, inputFields, displayFn) {
        const addButton = document.getElementById(`add-${prefix}`);
        const list = document.getElementById(`${prefix}-list`);
        const inputs = Array.isArray(inputFields)
            ? inputFields.map(f => document.getElementById(`${prefix}-${f.toLowerCase().replace(/ /g, '')}`))
            : [document.getElementById(`${prefix}-name`)];

        addButton.addEventListener('click', async () => {
            const data = {};
            let allFilled = true;
            if (Array.isArray(inputFields)) {
                inputs.forEach((input, index) => {
                    if(!input.value) allFilled = false;
                    const key = inputFields[index].toLowerCase().replace(/ /g, '');
                    data[key] = input.value;
                });
            } else {
                 if(!inputs[0].value) allFilled = false;
                 data.name = inputs[0].value;
            }

            if (!allFilled) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            try {
                await addDoc(collection(db, `/artifacts/${appId}/public/data/${collectionName}`), data);
                inputs.forEach(input => {
                    if(input.type === 'color') input.value = '#e30613';
                    else input.value = '';
                });
            } catch (error) {
                console.error(`Error adding to ${collectionName}:`, error);
            }
        });

        onSnapshot(collection(db, `/artifacts/${appId}/public/data/${collectionName}`), (snapshot) => {
            list.innerHTML = '';
            snapshot.forEach((doc) => {
                const item = doc.data();
                const li = document.createElement('li');
                li.innerHTML = `<span>${displayFn(item)}</span>`;
                const deleteButton = document.createElement('button');
                deleteButton.className = 'delete-btn';
                deleteButton.innerHTML = '&times;';
                deleteButton.onclick = () => { if (confirm('Tem a certeza que deseja apagar?')) deleteDoc(doc.ref); };
                li.appendChild(deleteButton);
                list.appendChild(li);
            });
        });
    }
