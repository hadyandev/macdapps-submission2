const sourceImage = document.getElementById("source-image");
const fileInput = document.getElementById("inputImage");

const accountName = "hadyandevstorage";
const sasString =
  "se=2019-06-30&sp=rwdlac&sv=2018-03-28&ss=b&srt=sco&sig=bqX5zNlcrlaGwB98DWU0i7LwtEpTKFqeU69AEd%2B3Pvw%3D";
const containerName = "hadyandevblob";
const containerURL = new azblob.ContainerURL(
  `https://${accountName}.blob.core.windows.net/${containerName}?${sasString}`,
  azblob.StorageURL.newPipeline(new azblob.AnonymousCredential())
);

const uploadFiles = async () => {
  try {
    const promises = [];
    let imgurl = "";
    for (const file of fileInput.files) {
      const blockBlobURL = azblob.BlockBlobURL.fromContainerURL(
        containerURL,
        file.name
      );
      promises.push(
        azblob.uploadBrowserDataToBlockBlob(
          azblob.Aborter.none,
          file,
          blockBlobURL
        )
      );
      imgurl = `https://hadyandevstorage.blob.core.windows.net/hadyandevblob/${
        file.name
      }`;
    }
    await Promise.all(promises);
    sourceImage.src = imgurl;
  } catch (error) {
    console.log(error.message);
  }
};
fileInput.addEventListener("input", uploadFiles);
