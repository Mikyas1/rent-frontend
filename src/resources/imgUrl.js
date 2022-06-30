import urls from './urls';

export default (imageName) => {
    return process.env.VUE_APP_API_URL + urls.imagePath + imageName;
};