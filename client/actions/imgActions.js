import keys from "../../key";

const imgActions = {
  // making request to server with image url which I am getting from cloudinary
  uploadImage: (data, cb) => dispatch => {
    fetch("/image/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token
      },
      body: JSON.stringify({ image: data })
    })
      .then(res => res.json())
      .then(image => {
        if (image.msg) {
          cb(true);
        } else {
          cb(false);
        }
      });
  },

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
        console.log(image, 'image');
        if (!image.error) {
          cb(true, image);
        } else {
          cb(false, image);	// Like an image
        }
      });
  },

  // getting image from db in this fn
  getImage: () => dispatch => {
    fetch("/image/getimage", {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.token
      }
    })
      .then(res => res.json())
      .then(image => {
        if (image.msg) {
          dispatch({
            type: "GET_IMAGE_SUCCESS",
            image: image.image
          });
        }
      });
  }
};

export default imgActions;
