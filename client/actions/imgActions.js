import keys from "../../key";

const imgActions = {
  // making request to server with image url which I am getting from cloudinary

  // Uploading image to cloudinary
  cloudinaryImgUpload: (data, cb) => dispatch => {
    fetch(keys.IMAGE_UPLOAD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(image => {
        if (!image.error) {
          cb(true, image);
        } else {
          cb(false, image);
        }
      });
  },
};

export default imgActions;
