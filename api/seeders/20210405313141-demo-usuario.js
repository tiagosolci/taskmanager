'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {

        await queryInterface.bulkInsert('Usuarios',
            [
                {
                    nome: 'Katia Solci',
                    email: 'katia@gmail.com',
                    senha: '$2b$12$iLVBtDlbskczQc7gwwgZPusmPIIqrf6Z4NXzK.H8C.Upv3dM5mxcy',
                    ativo: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {

                    nome: 'André Solci',
                    email: 'andre@gmail.com',
                    senha: '$2b$12$WZDmT3LUEDYCRhyEMfpoP.7yH7xuWIGl1p36bpNngDz1.C7T9cK9a',
                    ativo: true,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            ], {});

    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Usuarios', null, {});
    }
};




