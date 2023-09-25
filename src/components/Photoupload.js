import React, { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject, // Import deleteObject function
} from "firebase/storage";
import { storage, auth ,firestore} from "../firebase";
import { v4 } from "uuid";
import { updateDoc ,getDoc,doc} from "firebase/firestore"; 
import '../css/Photoupload.css'


function Photoupload() {
  const user = auth.currentUser;
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageCount, setImageCount] = useState(0);

  useEffect(() => {
    if (!user) {
      return;
    }
    console.log('check point 1')
    const userImagesRef = ref(storage, `images/${user.uid}/`);

    listAll(userImagesRef)
      .then((response) => {
        console.log('upflag')
        const imageCount = response.items.length;
        setImageCount(imageCount); // Set the initial image count

        // Use a for loop to fetch URLs and store item references
        for (let i = 0; i < response.items.length; i++) {
          console.log('flag')
          const item = response.items[i];
          getDownloadURL(item).then((url) => {
            setImageUrls((prev) => [...prev, { url, item }]);
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, [user]);

  const  uploadFile  = () => {
    if (imageUpload == null || !user) {
      return console.log("User not found");
    }

    const userImagesRef = ref(
      storage,
      `images/${user.uid}/${imageUpload.name + v4()}`
    );
      console.log('setting up !!')
    uploadBytes(userImagesRef, imageUpload)
    
      .then((snapshot) => {
        console.log('uploading........')
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% complete`);
        
        getDownloadURL(snapshot.ref).then(async( url) => {
          console.log(url)
          console.log(auth.currentUser.uid)
          const currentUserid = auth.currentUser.uid;

            // Assuming 'newUrls' is an array of new photo URLs you want to add
            const newUrls =[url]; // Replace with your actual new URLs

            // Reference to the user's document
            const userDocRef = doc(firestore, 'users', currentUserid);

            try {
              // Retrieve the current array of photo URLs from Firestore
              const userDocSnapshot = await getDoc(userDocRef);

              if (userDocSnapshot.exists()) {
                const currentUrls = userDocSnapshot.data().photoURLs || [];

                // Combine the current and new URLs, removing duplicates
                const updatedUrls = Array.from(new Set([...currentUrls, ...newUrls]));

                // Update the Firestore document with the updated array of URLs
                await updateDoc(userDocRef, { photoURLs: updatedUrls });
                console.log('New photo URLs added to the document successfully');
              } else {
                console.log('User document does not exist');
              }
            } catch (error) {
              console.error('Error updating photo URLs:', error);
            }
        
          setImageUrls((prev) => [...prev, { url, item: snapshot.ref }]);
          setImageCount((count) => count + 1); // Increment the image count
          console.log('uploaded !!')
        });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
      
  };

  const deleteFile = (item) => {    // for deleting the posts
    if (!user) {
      return console.log("User not found");
    }
    console.log("deletting the img !!");
    // Delete the image from Firebase Storage
    deleteObject(item)
      .then(() => {
        // Remove the deleted image from the state
        setImageUrls((prev) => prev.filter((img) => img.item !== item));
        console.log("deleted !!!!!!!!");
        setImageCount((count) => count - 1); // Decrement the image count

      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
  };

  return (
    <div >
      <section id="Photoupload">
      <h3>Upload Photo</h3>
       <p>Total Images Uploaded: {imageCount}</p>

       <div class="file-input-container">
        <label class="file-input-button">
            Browse
            <input
                type="file"
                class="file-input-hidden"
                onChange={(event) => {
                    // setImageUpload(event.target.files[0]);
                    const selectedFile = event.target.files[0];
                    setImageUpload(selectedFile);
                    const selectedFileName = selectedFile ? selectedFile.name : 'No file selected';
                    document.querySelector('.selected-file').textContent = selectedFileName;
                
                }}
            />
        </label>
        <span class="selected-file">No file selected</span>
        <button class="upload-button" onClick={uploadFile}>Upload Image</button>
    </div>
    </section><br/>

       {/* <div class="file-input-container">
        <label class="file-input-button">
            <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
        </label>
 
    </div>

      /> */}
      {/* <button onClick={uploadFile}> Upload Image</button> */ }

      {imageUrls.map((image, index) => (
        // <div key={index}>
        //   <img
        //     src={image.url}
        //     alt={`img-${index}`}
        //     style={{ width: "192px", height: "192px" }}
        //   />
        //   <button onClick={() => deleteFile(image.item)}>Delete</button>
        // </div>
        <div className="image-grid">
        {imageUrls.map((image, index) => (
          <div key={index} className="image-item">
            <img
              src={image.url}
              alt={`img-${index}`}
              className="image"
            />
            <button onClick={() => deleteFile(image.item)}>Delete</button>
          </div>
        ))}
      </div>

      ))}
    </div>
  );
}

export default Photoupload;