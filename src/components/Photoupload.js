// import React, { useState, useEffect } from "react";
// import {
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   listAll,
//   deleteObject,
// } from "firebase/storage";
// import { storage, auth, firestore } from "../firebase";
// import { v4 } from "uuid";
// import { updateDoc, getDoc, doc } from "firebase/firestore";
// import "../css/Photoupload.css";

// function Photoupload() {
//   const user = auth.currentUser;
//   const [imageUpload, setImageUpload] = useState(null);
//   const [imageUrls, setImageUrls] = useState([]);
//   const [imageCount, setImageCount] = useState(0);

//   useEffect(() => {
//     if (!user) {
//       return;
//     }

//     const fetchImages = async () => {
//       try {
//         const userImagesRef = ref(storage, `images/${user.uid}/`);
//         const response = await listAll(userImagesRef);

//         const newImageUrls = await Promise.all(
//           response.items.map(async (item) => {
//             const url = await getDownloadURL(item);
//             return { url, item };
//           })
//         );

//         setImageUrls(newImageUrls);
//         setImageCount(newImageUrls.length);
//       } catch (error) {
//         console.error("Error fetching images:", error);
//       }
//     };

//     fetchImages();
//   }, [user]);

// const  uploadFile  = () => {
//   if (imageUpload == null || !user) {
//     return console.log("User not found");
//   }

//   const userImagesRef = ref(
//     storage,
//     `images/${user.uid}/${imageUpload.name + v4()}`
//   );
//     console.log('setting up !!')
//   uploadBytes(userImagesRef, imageUpload)
  
//     .then((snapshot) => {
//       console.log('uploading........')
//       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       console.log(`Upload is ${progress}% complete`);
      
//       getDownloadURL(snapshot.ref).then(async( url) => {
//         console.log(url)
//         console.log(auth.currentUser.uid)
//         const currentUserid = auth.currentUser.uid;

//           // Assuming 'newUrls' is an array of new photo URLs you want to add
//           const newUrls =[url]; // Replace with your actual new URLs

//           // Reference to the user's document
//           const userDocRef = doc(firestore, 'users', currentUserid);

//           try {
//             // Retrieve the current array of photo URLs from Firestore
//             const userDocSnapshot = await getDoc(userDocRef);

//             if (userDocSnapshot.exists()) {
//               const currentUrls = userDocSnapshot.data().photoURLs || [];

//               // Combine the current and new URLs, removing duplicates
//               const updatedUrls = Array.from(new Set([...currentUrls, ...newUrls]));

//               // Update the Firestore document with the updated array of URLs
//               await updateDoc(userDocRef, { photoURLs: updatedUrls });
//               console.log('New photo URLs added to the document successfully');
//             } else {
//               console.log('User document does not exist');
//             }
//           } catch (error) {
//             console.error('Error updating photo URLs:', error);
//           }
      
//         setImageUrls((prev) => [...prev, { url, item: snapshot.ref }]);
//         setImageCount((count) => count + 1); // Increment the image count
//         console.log('uploaded !!')
//       });
//     })
//     .catch((error) => {
//       console.error("Error uploading image:", error);
//     });
    
// };

//   const deleteFile = (item) => {
//     if (!user) {
//       return console.log("User not found");
//     }

//     deleteObject(item)
//       .then(() => {
//         setImageUrls((prev) => prev.filter((img) => img.item !== item));
//         setImageCount((count) => count - 1);
//       })
//       .catch((error) => {
//         console.error("Error deleting image:", error);
//       });
//   };

//   return (
//     <div>
//       <section id="Photoupload">
//         <h3>Upload Photo</h3>
//         <p>Total Images Uploaded: {imageCount}</p>

//         <div class="file-input-container">
//           <label class="file-input-button">
//             Browse
//             <input
//               type="file"
//               class="file-input-hidden"
//               onChange={(event) => {
//                 const selectedFile = event.target.files[0];
//                 setImageUpload(selectedFile);
//                 const selectedFileName = selectedFile
//                   ? selectedFile.name
//                   : "No file selected";
//                 document.querySelector(
//                   ".selected-file"
//                 ).textContent = selectedFileName;
//               }}
//             />
//           </label>
//           <span class="selected-file">No file selected</span>
//           <button class="upload-button" onClick={uploadFile}>
//             Upload Image
//           </button>
//         </div>
//       </section>
//       <br />

//       <div className="image-grid">
//         {imageUrls.map((image, index) => (
//           <div key={index} className="image-item">
//             <img src={image.url} alt={`img-${index}`} className="image" />
//             <button onClick={() => deleteFile(image.item)}>Delete</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Photoupload;



// +++====================================================================



// import React, { useState, useEffect } from "react";
// import {
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   listAll,
//   deleteObject,
// } from "firebase/storage";
// import { storage, auth, firestore } from "../firebase";
// import { v4 } from "uuid";
// import { updateDoc, getDoc, doc } from "firebase/firestore";
// import "../css/Photoupload.css";

// function Photoupload() {
//   const user = auth.currentUser;
//   const [imageUpload, setImageUpload] = useState(null);
//   const [imageUrls, setImageUrls] = useState([]);
//   const [imageCount, setImageCount] = useState(0);
//   const [selectedImage, setSelectedImage] = useState(null); // State to track selected image

//   useEffect(() => {
//     if (!user) {
//       return;
//     }

//     const fetchImages = async () => {
//       try {
//         const userImagesRef = ref(storage, `images/${user.uid}/`);
//         const response = await listAll(userImagesRef);

//         const newImageUrls = await Promise.all(
//           response.items.map(async (item) => {
//             const url = await getDownloadURL(item);
//             return { url, item };
//           })
//         );

//         setImageUrls(newImageUrls);
//         setImageCount(newImageUrls.length);
//       } catch (error) {
//         console.error("Error fetching images:", error);
//       }
//     };

//     fetchImages();
//   }, [user]);

//   const uploadFile = () => {
//     if (imageUpload == null || !user) {
//       return console.log("User not found");
//     }

//     const userImagesRef = ref(
//       storage,
//       `images/${user.uid}/${imageUpload.name + v4()}`
//     );

//     uploadBytes(userImagesRef, imageUpload)
//       .then((snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

//         getDownloadURL(snapshot.ref).then(async (url) => {
//           const currentUserid = auth.currentUser.uid;

//           const newUrls = [url];

//           const userDocRef = doc(firestore, "users", currentUserid);

//           try {
//             const userDocSnapshot = await getDoc(userDocRef);

//             if (userDocSnapshot.exists()) {
//               const currentUrls = userDocSnapshot.data().photoURLs || [];

//               const updatedUrls = Array.from(
//                 new Set([...currentUrls, ...newUrls])
//               );

//               await updateDoc(userDocRef, { photoURLs: updatedUrls });
//               console.log("New photo URLs added to the document successfully");
//             } else {
//               console.log("User document does not exist");
//             }
//           } catch (error) {
//             console.error("Error updating photo URLs:", error);
//           }

//           setImageUrls((prev) => [...prev, { url, item: snapshot.ref }]);
//           setImageCount((count) => count + 1);
//         });
//       })
//       .catch((error) => {
//         console.error("Error uploading image:", error);
//       });
//   };

//   const deleteFile = (item) => {
//     if (!user) {
//       return console.log("User not found");
//     }

//     deleteObject(item)
//       .then(() => {
//         setImageUrls((prev) => prev.filter((img) => img.item !== item));
//         setImageCount((count) => count - 1);
//       })
//       .catch((error) => {
//         console.error("Error deleting image:", error);
//       });
//   };

//   const handleClickImage = (url) => {
//     setSelectedImage(url);
//   };

//   const handleCloseModal = () => {
//     setSelectedImage(null);
//   };

//   return (
//     <div>
//       <section id="Photoupload">
//         <h3>Upload Photo</h3>
//         <p>Total Images Uploaded: {imageCount}</p>

//         <div className="file-input-container">
//           <label className="file-input-button">
//             Browse
//             <input
//               type="file"
//               className="file-input-hidden"
//               onChange={(event) => {
//                 const selectedFile = event.target.files[0];
//                 setImageUpload(selectedFile);
//                 const selectedFileName = selectedFile
//                   ? selectedFile.name
//                   : "No file selected";
//                 document.querySelector(
//                   ".selected-file"
//                 ).textContent = selectedFileName;
//               }}
//             />
//           </label>
//           <span className="selected-file">No file selected</span>
//           <button className="upload-button" onClick={uploadFile}>
//             Upload Image
//           </button>
//         </div>
//       </section>
//       <br />

//       <div className="image-grid">
//         {imageUrls.map((image, index) => (
//           <div key={index} className="image-item">
//             <img
//               src={image.url}
//               alt={`img-${index}`}
//               className="image"
//               onClick={() => handleClickImage(image.url)} // Add click handler
//             />
//             <button onClick={() => deleteFile(image.item)}>Delete</button>
//           </div>
//         ))}
//       </div>

//       {/* Modal for displaying larger image */}
//       {selectedImage && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={handleCloseModal}>
//               &times;
//             </span>
//             <img src={selectedImage} alt="Selected"  className="clicked-image" />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Photoupload;




// ====================================================

import React, { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import { storage, auth, firestore } from "../firebase";
import { v4 } from "uuid";
import { updateDoc, getDoc, doc } from "firebase/firestore";
import "../css/Photoupload.css";

function Photoupload() {
  const user = auth.currentUser;
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [imageCount, setImageCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null); // State to track selected image

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchImages = async () => {
      try {
        const userImagesRef = ref(storage, `images/${user.uid}/`);
        const response = await listAll(userImagesRef);

        const newImageUrls = await Promise.all(
          response.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return { url, item };
          })
        );

        setImageUrls(newImageUrls);
        setImageCount(newImageUrls.length);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [user]);

  const uploadFile = () => {
    if (imageUpload == null || !user) {
      return console.log("User not found");
    }

    const userImagesRef = ref(
      storage,
      `images/${user.uid}/${imageUpload.name + v4()}`
    );

    uploadBytes(userImagesRef, imageUpload)
      .then((snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        getDownloadURL(snapshot.ref).then(async (url) => {
          const currentUserid = auth.currentUser.uid;

          const newUrls = [url];

          const userDocRef = doc(firestore, "users", currentUserid);

          try {
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
              const currentUrls = userDocSnapshot.data().photoURLs || [];

              const updatedUrls = Array.from(
                new Set([...currentUrls, ...newUrls])
              );

              await updateDoc(userDocRef, { photoURLs: updatedUrls });
              console.log("New photo URLs added to the document successfully");
            } else {
              console.log("User document does not exist");
            }
          } catch (error) {
            console.error("Error updating photo URLs:", error);
          }

          setImageUrls((prev) => [...prev, { url, item: snapshot.ref }]);
          setImageCount((count) => count + 1);
        });
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const deleteFile = (item) => {
    if (!user) {
      return console.log("User not found");
    }

    deleteObject(item)
      .then(() => {
        setImageUrls((prev) => prev.filter((img) => img.item !== item));
        setImageCount((count) => count - 1);
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
  };

  const handleClickImage = (url) => {
    if (selectedImage === url) {
      setSelectedImage(null); // Close the modal if the same image is clicked again
    } else {
      setSelectedImage(url); // Otherwise, open the modal with the clicked image
    }
  };

  return (
    <div>
      <section id="Photoupload">
        <h3>Upload Photo</h3>
        <p>Total Images Uploaded: {imageCount}</p>

        <div className="file-input-container">
          <label className="file-input-button">
            Browse
            <input
              type="file"
              className="file-input-hidden"
              onChange={(event) => {
                const selectedFile = event.target.files[0];
                setImageUpload(selectedFile);
                const selectedFileName = selectedFile
                  ? selectedFile.name
                  : "No file selected";
                document.querySelector(
                  ".selected-file"
                ).textContent = selectedFileName;
              }}
            />
          </label>
          <span className="selected-file">No file selected</span>
          <button className="upload-button" onClick={uploadFile}>
            Upload Image
          </button>
        </div>
      </section>
      <br />

      <div className="image-grid">
        {imageUrls.map((image, index) => (
          <div key={index} className="image-item">
            <img
              src={image.url}
              alt={`img-${index}`}
              className="image"
              onClick={() => handleClickImage(image.url)} // Add click handler
            />
            <button onClick={() => deleteFile(image.item)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Modal for displaying larger image */}
      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content">
            <span className="close">&times;</span>
            <img src={selectedImage} alt="Selected" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Photoupload;
