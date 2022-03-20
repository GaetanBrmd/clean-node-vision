import api from './src/app';

const PORT = parseInt(process.env.PORT as string, 10) || 3000;

api().then((app) => {
    app.listen(PORT, () => {
        console.log(` 🚀 Server listening on port ${PORT}`);
    });
});
