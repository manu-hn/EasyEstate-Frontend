import { app } from '@/Firebase';
import { useAppSelector } from '@/redux/hooks/hooks';
import useCreateListings from '@/utils/hooks/useCreateListings';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { ChangeEvent, FormEvent,  useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FormInputDataType, } from '@/utils/types';


const Form = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | boolean>(false);
  const [formData, setFormData] = useState<FormInputDataType>({
    title: "",
    description: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipcode: {
        code: 0,
        location_type: "",
      }
    },
    regularPrice: 1500,
    discountPrice: 0,
    bathrooms: 1,
    bedrooms: {
      total: 1,
      guest: 0,
    },
    type: "rent",
    offer: false,
    parking: false,
    furnished: false,
    imageURLs: [],
    userRef: "",
  });
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [imageUploadFailure, setImageUploadFailure] = useState<string | boolean>(false);
  const { createListingsFromHook } = useCreateListings();
  const { currentUser } = useAppSelector((store => store.user))



  // const handleFormDataChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
  //   if (e.target.id === 'sale' || e.target.id === 'rent') {
  //     setFormData({ ...formData, type: e.target.id });
  //   }

  //   if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
  //     setFormData({ ...formData, [e.target.id]: e.target.checked });
  //   }

  //   if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
  //     const idParts = e.target.id.split('.');
  //     const topLevelProperty = idParts[0];

  //     if (idParts.length === 1) {
  //       // Handle top-level properties
  //       setFormData({ ...formData, [topLevelProperty]: e.target.value });
  //     } else {
  //       // Handle nested properties
  //       const updatedFormData = { ...formData };
  //       let currentLevel: any = updatedFormData;

  //       for (let i = 0; i < idParts.length - 1; i++) {
  //         const currentPart: any = idParts[i];

  //         if (!currentLevel[currentPart]) {
  //           currentLevel[currentPart] = {};
  //         }

  //         currentLevel = currentLevel[currentPart];
  //       }

  //       currentLevel[idParts[idParts.length - 1]] = e.target.value;

  //       setFormData(updatedFormData);
  //     }
  //   }
  // };
  
  const handleFormDataChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.id === 'sale' || e.target.id === 'rent') {
      setFormData({ ...formData, type: e.target.id });
    }
  
    if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
      if ('checked' in e.target && e.target.type === 'checkbox') {
        setFormData({ ...formData, [e.target.id]: e.target.checked });
      }
    }
  
    if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
      const idParts = e.target.id.split('.');
      const topLevelProperty = idParts[0];
  
      if (idParts.length === 1) {
        // Handle top-level properties
        setFormData({ ...formData, [topLevelProperty]: e.target.value });
      } else {
        // Handle nested properties
        const updatedFormData = { ...formData };
        let currentLevel: any = updatedFormData;
  
        for (let i = 0; i < idParts.length - 1; i++) {
          const currentPart: any = idParts[i];
  
          if (!currentLevel[currentPart]) {
            currentLevel[currentPart] = {};
          }
  
          currentLevel = currentLevel[currentPart];
        }
  
        currentLevel[idParts[idParts.length - 1]] = e.target.value;
  
        setFormData(updatedFormData);
      }
    }
  };
  
  
  const handleImageSubmit = (e: FormEvent<HTMLFormElement> | any ) => {
    e?.preventDefault();
    try {
      
      if (files?.length > 0 && files?.length + formData.imageURLs.length < 7) {
        setUploading(true);
        setImageUploadFailure(false);
        const promises = [];

        for (let i = 0; i < files?.length; i++) {
          promises.push(storeImage(files[i]));
        }
        Promise.all(promises).then((urls: any) => {
          setFormData({ ...formData, imageURLs: formData.imageURLs.concat(urls) });
          setImageUploadFailure(false);
          setUploading(false);
        }).catch((error) => {
          setImageUploadFailure('Error Uploading, Image size cannot be more than 2MB');
          setUploading(false);
          throw new Error(error.message);
        })
      } else {
        setImageUploadFailure(`You can't upload more than six image`)
      }

    } catch (error) {
      throw new Error(error.message);
    }
  }

  const storeImage = async (file: File) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);


      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress)
        },

        (error) => {
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          })
        }
      )
    })
  }

  const handleLocationTypeChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;

    const idParts = id.split('.');
    const topLevelProperty = idParts[0];

    if (idParts.length === 1) {
      // Handle top-level properties
      setFormData({ ...formData, [topLevelProperty]: value });
    } else {
      // Handle nested properties
      const updatedFormData = { ...formData };
      let currentLevel: any = updatedFormData;

      for (let i = 0; i < idParts.length - 1; i++) {
        const currentPart: any = idParts[i];

        if (!currentLevel[currentPart]) {
          currentLevel[currentPart] = {};
        }

        currentLevel = currentLevel[currentPart];
      }

      currentLevel[idParts[idParts.length - 1]] = value;

      setFormData(updatedFormData);
    }
  };

  const handleRemoveImage = (index: number) => {

    setFormData({ ...formData, imageURLs: formData.imageURLs.filter((_, i) => i !== index), })
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (formData.imageURLs.length < 1) return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice) return setError('Discount must be less than Regular Price !');

      setLoading(true);
      setError(false)
      const userRef = currentUser?._id || "";
      const response = await createListingsFromHook({ ...formData, userRef });
      
      if (!response.error) {
        setLoading(false)
        navigate(`/listing/${response.newListing._id}`);
      }


    } catch (error) {
      setLoading(false);
      throw new Error(error.message);
    }
  }



  return (
    <form className='flex gap-4 flex-col sm:flex-row justify-center' onSubmit={handleSubmit}>
      <div className='max-w-2xl flex flex-col gap-6 py-3'>

        <input type="text" placeholder='Title' className='border p-3 rounded-lg ' onChange={handleFormDataChange}
          value={formData?.title} id='title' maxLength={62} minLength={8} required />

        <textarea placeholder='Description' className='border p-3 rounded-lg '
          id='description' required onChange={handleFormDataChange} value={formData.description}
          name="" cols={10} rows={5}></textarea>

        <div className='flex flex-col sm:flex-row gap-4 flex-wrap'>

          <input type="text" placeholder='Street' className='border p-3 rounded-lg '
            onChange={handleFormDataChange} value={formData?.address?.street} id='address.street' required />
          <input type="text" placeholder='City' className='border p-3 rounded-lg '
            onChange={handleFormDataChange} value={formData?.address?.city} id='address.city' required />
          <input type="text" placeholder='State' className='border p-3 rounded-lg '
            onChange={handleFormDataChange} value={formData?.address.state} id='address.state' required />
          <div className='flex flex-col sm:flex-row gap-4'>
            <input type="Number" placeholder='PinCode' className='border p-3 rounded-lg '
              onChange={handleFormDataChange} value={formData?.address?.zipcode?.code} id='address.zipcode.code' required />
            <select
              className='rounded-lg px-4 py-2'
              name='location_type'
              id='address.zipcode.location_type'
              onChange={handleLocationTypeChange}
              value={formData?.address?.zipcode?.location_type}
            >
              <option value='#'>Select</option>
              <option value='Residential'>Residential</option>
              <option value='Commercial'>Commercial</option>
            </select>
          </div>
        </div>
        <div className='flex flex-wrap gap-6'>
          <div className='flex gap-2'>
            <input type="checkbox" id='sale' className='w-5'
              onChange={handleFormDataChange} checked={formData?.type === 'sale'} />
            <span>Sell</span>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" id='rent' className='w-5'
              onChange={handleFormDataChange} checked={formData?.type === 'rent'} />
            <span>Rent</span>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" id='parking' className='w-5'
              onChange={handleFormDataChange} checked={formData?.parking} />
            <span>Parking</span>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" id='furnished' className='w-5'
              onChange={handleFormDataChange} checked={formData?.furnished} />
            <span>Furnished</span>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" id='offer' className='w-5'
              onChange={handleFormDataChange} checked={formData?.offer} />
            <span>Offer</span>
          </div>
        </div>


      </div>

      <div className='flex flex-col flex-1 gap-4 py-3'>

        <div className='flex flex-wrap gap-4'>
          <div className='flex items-center gap-3'>

            <input type="number" name="bedrooms" id="bedrooms.total" min={'1'} max={'10'}
              className='py-2 px-4 w-24 rounded-lg border' onChange={handleFormDataChange} value={formData?.bedrooms?.total} />
            <p>Bed Rooms</p>
          </div>
          <div className='flex items-center gap-3'>
            <input type="number" name="guest" id="bedrooms.guest" max="2" min='0'
              className='py-2 px-4 w-24  rounded-lg border' onChange={handleFormDataChange} value={formData?.bedrooms?.guest} />
            <p>Guest Rooms</p>
          </div>
          <div className='flex items-center gap-3 text-red'>
            <input type="number" name="bathrooms" id="bathrooms" min={'1'} max={'5'}
              className='py-2 text-center w-24 px-50 rounded-lg border' onChange={handleFormDataChange} value={formData?.bathrooms} />
            <p>Baths</p>
          </div>

          <div className='flex items-center gap-3'>
            <input type="number" name="regularPrice" id="regularPrice" min={'1500'} onChange={handleFormDataChange}
              className='py-2 px-4 w-28 rounded-lg border' value={formData?.regularPrice} />
            <div className='flex flex-col items-center'>
              <p>Regular Price</p>
              <span>(₹ / month)</span>
            </div>
          </div>
          {
            formData.offer && (
              <div className='flex items-center gap-3'>
                <input type="number" name="discountPrice" id="discountPrice" onChange={handleFormDataChange}
                  className='py-2 px-4 rounded-lg border w-24' value={formData?.discountPrice} />
                <div className='flex flex-col items-center '>
                  <p>Discount Price</p>
                  <span>(₹ / month)</span>
                </div>
              </div>
            )
          }

        </div>

        <div className='flex flex-col flex-1 gap-4'>
          <p className='font-semibold'>Images :</p>
          <span className='font-normal text-gray-700 ml-3'>The first image will be the cover (max 6)</span>
          <div  className='flex gap-6'>
            <input className='p-3 border border-gray-400 rounded w-full' onChange={(e: ChangeEvent<HTMLInputElement>) => setFiles(e?.target?.files)}
              type="file" name="" id="images" accept='image/*' multiple />
            <button type='submit' onClick={handleImageSubmit}  disabled={uploading}
              className='uppercase hover:shadow-lg disabled:opacity-80 rounded 
                             text-sky-500 border px-4 py-2 border-sky-700'>{uploading ? "Uploading..." : "Upload"}</button>
          </div>
          <p className='text-red-500 text-sm'> {imageUploadFailure}</p>
          {
            formData.imageURLs.length > 0 && formData.imageURLs.map((url, index) => {
              return <div className='flex justify-between items-center border p-3 rounded' key={index}>
                <img src={url} alt="Property Image" className=' size-20 object-cover rounded-lg' />
                <button type='button' onClick={() => handleRemoveImage(index)}
                  className='bg-red-500 text-white px-3 py-1 rounded hover:opacity-50'>Remove</button>
              </div>
            })
          }
        </div>

        <button disabled={loading || uploading} type='submit' className='p-3 bg-slate-800 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-80'>{loading ? "Creating List" : "Create Listing"}</button>
        <p className='text-red-500 text-sm'> {error}</p>

      </div>
    </form>
  )
}

export default Form