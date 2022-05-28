
const getUploadPic = (imageFile, imgBBStorageAPIKey) => {
    let imgUrl;
    const formData = new FormData();
    formData.append('image', imageFile);
    const url = `https://api.imgbb.com/1/upload?key=${imgBBStorageAPIKey}`;

    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(res => res.json())
        .then(result => {
            if (result.success) {
                imgUrl = result.data.url;
                console.log(imgUrl);
            }
        })

    return imgUrl;
};

export default getUploadPic;