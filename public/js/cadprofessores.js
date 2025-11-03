 // URL base do nosso servidor Node.js
    const API_BASE_URL = 'http://localhost:3000';

    document.addEventListener('DOMContentLoaded', () => {
        loadAreas();
        loadProfessores();
        setupEventListeners();
    });

    // Função para mostrar um alerta mais detalhado em caso de erro de conexão
    function handleFetchError(error) {
        console.error('Erro de Fetch:', error);
        if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
            alert('ERRO DE CONEXÃO:\n\nNão foi possível comunicar com o servidor. Verifique se:\n1. O servidor Node.js está a correr.\n2. O CORS está configurado corretamente no ficheiro server.js.');
        } else {
            alert('Ocorreu um erro inesperado. Verifique a consola para mais detalhes.');
        }
    }

    // Carrega as Áreas do backend e popula o select
    async function loadAreas() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/areas`);
            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
            const areas = await response.json();
            
            const areaSelect = document.getElementById('prof-area');
            areaSelect.innerHTML = '<option value="">Selecione uma área...</option>';
            areas.forEach(area => {
                areaSelect.innerHTML += `<option value="${area.id}">${area.nome}</option>`;
            });
        } catch (error) {
            handleFetchError(error);
        }
    }

    // Carrega os Professores do backend e renderiza a lista
    async function loadProfessores() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/professores`);
            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
            const professores = await response.json();

            const list = document.getElementById('prof-list');
            while (list.children.length > 1) {
                list.removeChild(list.lastChild);
            }

            professores.forEach(prof => {
                const li = document.createElement('li');
                const horarioInicio = prof.horarioInicio ? prof.horarioInicio.substring(0, 5) : 'N/D';
                const horarioFim = prof.horarioFim ? prof.horarioFim.substring(0, 5) : 'N/D';

                li.innerHTML = `
                    <span>${prof.nome}</span>
                    <span><span class="color-dot" style="background-color: ${prof.areaCor || '#ccc'};"></span>${prof.areaNome || 'N/A'}</span>
                    <span>${prof.diaFolga}</span>
                    <span>${horarioInicio} - ${horarioFim}</span>
                `;
                
                const deleteButton = document.createElement('button');
                deleteButton.className = 'delete-btn';
                deleteButton.innerHTML = '&times;';
                deleteButton.onclick = () => deleteProfessor(prof.id, prof.nome);

                li.appendChild(deleteButton);
                list.appendChild(li);
            });

        } catch (error) {
            handleFetchError(error);
        }
    }

    // Apaga um professor
    async function deleteProfessor(id, nome) {
        if (!confirm(`Tem a certeza que deseja apagar o professor "${nome}"?`)) {
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/api/professores/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
            
            loadProfessores();
        } catch (error) {
            handleFetchError(error);
        }
    }
    
    // Configura o evento do botão de salvar
    function setupEventListeners() {
        const addButton = document.getElementById('add-prof');
        addButton.addEventListener('click', async () => {
            const inputs = {
                nome: document.getElementById('prof-nome'),
                areaId: document.getElementById('prof-area'),
                diaFolga: document.getElementById('prof-folga'),
                horarioInicio: document.getElementById('prof-inicio'),
                horarioFim: document.getElementById('prof-fim')
            };

            const data = {
                nome: inputs.nome.value,
                areaId: inputs.areaId.value,
                diaFolga: inputs.diaFolga.value,
                horarioInicio: inputs.horarioInicio.value,
                horarioFim: inputs.horarioFim.value
            };

            if (!data.nome || !data.areaId || !data.diaFolga || !data.horarioInicio || !data.horarioFim) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/api/professores`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

                for (const key in inputs) {
                    inputs[key].value = '';
                }
                loadProfessores();

            } catch(error) {
                handleFetchError(error);
            }
        });
    }