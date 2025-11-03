
type="module"
    import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
    import { getFirestore, collection, addDoc, onSnapshot, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
    import { getAuth, signInAnonymously, signInWithCustomToken } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

    let db, auth;
    let appId, userId;
    let areasData = {}; // Para armazenar nome e cor da área

    try {
        const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
        const app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        auth = getAuth(app);
        
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
            await signInWithCustomToken(auth, __initial_auth_token);
        } else {
            await signInAnonymously(auth);
        }

        appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        userId = auth.currentUser.uid;
        console.log("Firebase ready!");

        await loadAreas();
        setupAmbienteCrud();

    } catch (error) {
        console.error("Error initializing Firebase:", error);
        alert("Não foi possível conectar à base de dados.");
    }

    async function loadAreas() {
        const areaSelect = document.getElementById('ambiente-area');
        areaSelect.innerHTML = '<option value="">Selecione uma área...</option>';
        
        onSnapshot(collection(db, `/artifacts/${appId}/public/data/areas`), (snapshot) => {
            snapshot.forEach((doc) => {
                const area = doc.data();
                areasData[doc.id] = { nome: area.nome, cor: area.cor }; // Armazena dados da área
                if (!areaSelect.querySelector(`option[value="${doc.id}"]`)) {
                     areaSelect.innerHTML += `<option value="${doc.id}">${area.nome}</option>`;
                }
            });
        });
    }

    function setupAmbienteCrud() {
        const addButton = document.getElementById('add-ambiente');
        const list = document.getElementById('ambiente-list');
        const inputs = {
            area: document.getElementById('ambiente-area'),
            bloco: document.getElementById('ambiente-bloco'),
            andar: document.getElementById('ambiente-andar'),
            nome: document.getElementById('ambiente-nome'),
            ocupacao: document.getElementById('ambiente-ocupacao')
        };

        addButton.addEventListener('click', async () => {
            const data = {
                areaId: inputs.area.value,
                areaNome: inputs.area.options[inputs.area.selectedIndex].text,
                bloco: inputs.bloco.value,
                andar: inputs.andar.value,
                nome: inputs.nome.value,
                ocupacao: parseInt(inputs.ocupacao.value)
            };

            if (!data.areaId || !data.bloco || !data.andar || !data.nome || !data.ocupacao) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            try {
                await addDoc(collection(db, `/artifacts/${appId}/public/data/ambientes`), data);
                // Limpar formulário
                for (const key in inputs) {
                    inputs[key].value = '';
                }
            } catch (error) {
                console.error("Erro ao adicionar ambiente:", error);
            }
        });

        onSnapshot(collection(db, `/artifacts/${appId}/public/data/ambientes`), (snapshot) => {
            // Limpa a lista mantendo o cabeçalho
            while (list.children.length > 1) {
                list.removeChild(list.lastChild);
            }

            snapshot.forEach((doc) => {
                const item = doc.data();
                const areaInfo = areasData[item.areaId] || { nome: item.areaNome, cor: '#ccc' }; // Fallback
                
                const li = document.createElement('li');
                li.innerHTML = `
                    <span><span class="color-dot" style="background-color: ${areaInfo.cor};"></span>${areaInfo.nome}</span>
                    <span>${item.bloco}</span>
                    <span>${item.andar}</span>
                    <span>${item.nome}</span>
                    <span>${item.ocupacao}</span>
                `;
                
                const deleteButton = document.createElement('button');
                deleteButton.className = 'delete-btn';
                deleteButton.innerHTML = '&times;';
                deleteButton.onclick = async () => {
                    if (confirm(`Tem a certeza que deseja apagar o ambiente "${item.nome}"?`)) {
                        await deleteDoc(doc.ref);
                    }
                };

                li.appendChild(deleteButton);
                list.appendChild(li);
            });
        });
    }
