// server.js
import Hapi from '@hapi/hapi';
import routes from './routes.js';

const init = async () => {
    const server = Hapi.server({
        port: 8080,
        host: 'localhost',
    });

    // Menambahkan rute dari file `routes.js`
    server.route(routes);

    // Menambahkan rute status untuk memeriksa status server
    server.route({
        method: 'GET',
        path: '/status',
        handler: (request, h) => {
            return h.response({ message: 'Server is up and running!' }).code(200);
        },
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

// Menangani error yang tidak terduga
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();
