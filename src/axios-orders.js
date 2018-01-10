//Création d'une instance axios avec l'url de la database pré-configurée

import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-8de01.firebaseio.com/'
});

export default instance;