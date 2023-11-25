import React, { FormEvent, useState } from 'react'
import UploadWidget from '../../../../utilities/uploadWidget'
import UseCamera from './useCamera'
import UseVideo from './useVideo'

const Profile = () => {

  const [onCamera, setOnCamera] = useState<boolean>(true)


    function postToCloudinary(event: FormEvent<HTMLFormElement>): void {
        
    }

  return (
    <div>
      <button onClick={() => setOnCamera(true)}>Picture</button>
      <button onClick={() => setOnCamera(false)}>Video</button>
        {/* <UploadWidget/> */}
        <UseCamera/>
        <form onSubmit={postToCloudinary}>
            <input multiple accept='.jpg, .png, .svg, .pdf, .csv' type="file" name="" id="" placeholder='Upload Your image'/>
            <button type="submit">Upload</button>
        </form>
    </div>
  )
}

export default Profile
