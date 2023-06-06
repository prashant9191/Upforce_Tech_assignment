// reducers/dataReducer.js
import { storeEditData} from "../actions/editDataActions";
import { storeViewData} from "../actions/viewDataActions";

const initialState = {
  viewData: null,
  editData: null,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "STORE_VIEW_DATA":
      return {
        ...state,
        viewData: action.payload,
        editData: null,
      };
    case "STORE_EDIT_DATA":
      return {
        ...state,
        viewData: null,
        editData: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
