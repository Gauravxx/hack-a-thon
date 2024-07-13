import React, { useState } from 'react';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';  // Adjust the import path based on your project structure
import Navbar from "../components/Navbar";

const Form = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    projectName: '',
    projectDesc: '',
    projectImgLink: '',
    blogLink: ''
  });
  const [showPopup, setShowPopup] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [emailError, setEmailError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          setEmailError('Please enter a valid email address');
        } else {
          setEmailError('');
        }
      }
    
      setFormData({ ...formData, [name]: value });
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if all fields are filled
    for (let key in formData) {
      if (!formData[key] && key !== 'search') {
        alert('Please fill out all fields.');
        return;
      }
    }

    try {
      // Add a new document with a generated ID
      await addDoc(collection(db, "users"), {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        projectName: formData.projectName,
        projectDesc: formData.projectDesc,
        projectImgLink: formData.projectImgLink,
        blogLink: formData.blogLink
      });
      setShowPopup(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleSearch = async (event) => {
    const searchValue = event.target.value;
    setFormData({ ...formData, search: searchValue });

    if (searchValue) {
      const q = query(collection(db, "users"), where("username", "==", searchValue));

      try {
        const querySnapshot = await getDocs(q);
        const results = [];
        querySnapshot.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
        setSearchResults(results);
      } catch (e) {
        console.error("Error searching documents: ", e);
      }
    } else {
      setSearchResults(null);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleCloseSearchResults = () => {
    setSearchResults(null);
  };

  return (
    <>
      <Navbar />
      <div className="h-[calc(100vh-67px)]">
        <div className="flex justify-center items-center w-full h-full flex flex-col">
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              name="search"
              className="grow"
              placeholder="Search"
              value={formData.search}
              onChange={handleSearch}
            />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <label className="input input-bordered flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
        <path
          d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
        />
        <path
          d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
        />
      </svg>
      <input
        type="text"
        name="email"
        className="grow"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
    </label>
    {/* Display the email error message */}
    {emailError && (
      <p className="text-red-500">{emailError}</p>
    )}
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
              />
            </svg>
            <input
              type="text"
              name="username"
              className="grow"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              name="password"
              className="grow"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path
                d="M5.5 2a.5.5 0 0 1 .5.5V4h7V2.5a.5.5 0 0 1 1 0V4h.5A1.5 1.5 0 0 1 16 5.5v9A1.5 1.5 0 0 1 14.5 16h-13A1.5 1.5 0 0 1 0 14.5v-9A1.5 1.5 0 0 1 1.5 4H2V2.5a.5.5 0 0 1 1 0V4h2V2.5a.5.5 0 0 1 .5-.5ZM14 5H2a.5.5 0 0 0-.5.5v2.8l5.821 3.105a.75.75 0 0 0 .358.095h.642a.75.75 0 0 0 .358-.095L14.5 8.3V5.5a.5.5 0 0 0-.5-.5Z"
              />
            </svg>
            <input
              type="text"
              name="projectName"
              className="grow"
              placeholder="Project Name"
              value={formData.projectName}
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path
                d="M5.5 2a.5.5 0 0 1 .5.5V4h7V2.5a.5.5 0 0 1 1 0V4h.5A1.5 1.5 0 0 1 16 5.5v9A1.5 1.5 0 0 1 14.5 16h-13A1.5 1.5 0 0 1 0 14.5v-9A1.5 1.5 0 0 1 1.5 4H2V2.5a.5.5 0 0 1 1 0V4h2V2.5a.5.5 0 0 1 .5-.5ZM14 5H2a.5.5 0 0 0-.5.5v2.8l5.821 3.105a.75.75 0 0 0 .358.095h.642a.75.75 0 0 0 .358-.095L14.5 8.3V5.5a.5.5 0 0 0-.5-.5Z"
              />
            </svg>
            <input
              type="text"
              name="projectDesc"
              className="grow"
              placeholder="Project Description"
              value={formData.projectDesc}
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path
                d="M12.5 0A2.5 2.5 0 0 1 15 2.5V4h-3V2.5A1.5 1.5 0 0 0 10.5 1h-3A1.5 1.5 0 0 0 6 2.5V4H3V2.5A2.5 2.5 0 0 1 5.5 0h7ZM14 5.5v9A2.5 2.5 0 0 1 11.5 17H4.464c.168-.5.527-1.267 1.06-2.294.56-.6 1.12-1.36 1.69-2.23l1.403-2.45a3.29 3.29 0 0 0 .43-.71A.75.75 0 0 1 9 10.75v-1.49a2.75 2.75 0 0 0 .268-5.434A3.296 3.296 0 0 0 7.5 3H4.9a3.295 3.295 0 0 0-3.267 3.6A2.75 2.75 0 0 0 5.5 9.5v1.4c0 .23-.04.453-.12.666a3.28 3.28 0 0 0-.43.71l-1.403 2.45c-.57.87-1.13 1.63-1.69 2.23-.533 1.027-.892 1.794-1.06 2.294H1.5A2.5 2.5 0 0 1 0 14.5v-9A2.5 2.5 0 0 1 2.5 3h11A2.5 2.5 0 0 1 16 5.5Z"
              />
            </svg>
            <input
              type="text"
              name="projectImgLink"
              className="grow"
              placeholder="Project Image Link"
              value={formData.projectImgLink}
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M1.5 1A.5.5 0 0 1 2 1v14a.5.5 0 0 1-.5.5h12a.5.5 0 0 1-.5-.5V8.5a.5.5 0 0 0-1 0V15H2V1.5a.5.5 0 0 1 .5-.5ZM4 1v3.5a.5.5 0 0 0 1 0V1h9v11H9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 0-1 0v2.5a1.5 1.5 0 0 0 1.5 1.5H13V5H4Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              name="blogLink"
              className="grow"
              placeholder="Blog Link"
              value={formData.blogLink}
              onChange={handleChange}
            />
          </label>
          <button
            className="btn btn-outline btn-primary mt-4"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>

      {searchResults && (
       <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
       <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
         <h2 className="text-lg font-semibold mb-4">Search Results</h2>
         <ul className="divide-y divide-gray-200">
           {searchResults.map((result) => (
             <li key={result.id} className="py-2">
               <div className="flex items-start gap-4">
                 <div className="flex-shrink-0">
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-6 w-6 text-gray-400">
                     <path
                       fillRule="evenodd"
                       d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                       clipRule="evenodd"
                     />
                   </svg>
                 </div>
                 <div>
                   <p className="text-gray-800 font-semibold">{result.username}</p>
                   <p className="text-gray-600">{result.email}</p>
                   <p className="text-gray-600">{result.password}</p>
                   <p className="text-gray-600">{result.projectName}</p>
                   <p className="text-gray-600">{result.projectDesc}</p>
                   <p className="text-gray-600">{result.projectImgLink}</p>
                   <p className="text-gray-600">{result.blogLink}</p>
                 </div>
               </div>
             </li>
           ))}
         </ul>
         <button
           className="mt-4 btn btn-outline btn-primary w-full"
           onClick={handleCloseSearchResults}
         >
           Close
         </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Form;
