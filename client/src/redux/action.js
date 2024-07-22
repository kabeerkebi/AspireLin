export const updatejobpost = (data) => ({
    type: "UPDATE_POST_JOB_DATA",
    payload: data,
  });
  
  export const updateProfilepicture = (data) => ({
    type: "UPDATE_PROFILE_PICTURE",
    payload: data,
  });
  export const DeleteProfilepicture = () => ({
    type: "DELETE_PROFILE_PICTURE", // Removed extra space before action type
  });
  export const UpdateThedatasArry = (data) => ({
    type: "UPDATE_THE_DATAS_ARRAY",
    payload: data,
  });

  
  export const updateloginnavigate = (data) => ({
    type: "LOGIN_NAVIGATE",
    payload: data,
  });
  export const updateresumelogin = (data) => ({
    type: "RESUME_LOGIN",
    payload: data,
  });
  