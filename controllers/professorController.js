import Professor from '../models/professorModel.js';

// Obter todos os professores
export const getAllProfessores = async (req, res) => {
    try {
        const professores = await Professor.findAll();
        res.status(200).json(professores);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar professores', error: error.message });
    }
};

// Criar um novo professor
export const createProfessor = async (req, res) => {
    try {
        const novoProfessor = await Professor.create(req.body);
        res.status(201).json(novoProfessor);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao criar professor', error: error.message });
    }
};

// Atualizar um professor
export const updateProfessor = async (req, res) => {
    try {
        const professorAtualizado = await Professor.update(req.params.id, req.body);
        res.status(200).json(professorAtualizado);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar professor', error: error.message });
    }
};

// Apagar um professor
export const deleteProfessor = async (req, res) => {
    try {
        await Professor.delete(req.params.id);
        res.status(200).json({ message: 'Professor apagado com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao apagar professor', error: error.message });
    }
};
