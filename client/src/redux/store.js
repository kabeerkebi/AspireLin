import { createStore } from "redux";

const initialState = {
  postjobdata: {
    datas: {
      CompanyName: "",
      JobTitle: "",
      TypeJob: "",
      Locations: "",
      MinimumPay: "",
      MaximumPay: "",
      IncentivePay: "",
      TotalExperince: "",
      HowManyYearExperince: "",
      MinimumEducation: "",
      EnglishLevel: "",
      Description: "",
      TypeOfInterviews: "",
      CompanyAddress: "",
      PayTypes: "",
      TheobjID: "",
      Theimages: "",
      Category:"",
      Additionalperks: [""],
      Additionalage: [],
    },
  },
  Profilepicture: false,
  continueorupdate: false,
  indexvalue: "",
  Todeletetrue: false,
  Deleteindexvalue: "",
  loginnavigate: false,
  Resumelogin: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_POST_JOB_DATA":
      return {
        ...state,
        postjobdata: {
          ...state.postjobdata,
          datas: {
            ...state.postjobdata.datas,
            ...action.payload,
          },
        },
      };
    case "UPDATE_PROFILE_PICTURE":
      return {
        ...state,
        Profilepicture: action.payload,
      };
    case "DELETE_PROFILE_PICTURE":
      return {
        ...state,
        Profilepicture: null,
      };
    case "UPDATE_THE_DATAS_ARRAY":
      return {
        ...state,
        continueorupdate: true,
        indexvalue: action.payload,
      };
    case "UPDATE_THE_DELETE_FORM":
      return {
        ...state,
        Todeletetrue: action.payload,
        Deleteindexvalue: action.payload,
      };
    case "LOGIN_NAVIGATE":
      return {
        ...state,
        loginnavigate: action.payload,
      };
    case "RESUME_LOGIN":
      return {
        ...state,
        Resumelogin: action.payload,
      };

    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
