import {
  SET_LOADING,
  SET_STORIES,
  USER_LOGIN,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTER,
  FILTER_PRODUCTS,
  UPDATE_SEARCH,
} from "./action";

const reducer = (state, action) => {
  const { sort, filter, filtered_products, posts, search } = state;

  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true };

    case SET_STORIES:
      return {
        ...state,
        posts: action.payload,
        filtered_products: action.payload,
        isLoading: false,
      };
    case USER_LOGIN:
      return {
        ...state,
        userUID: action.payload.uid,
        userName: action.payload.displayName,
        userImage: action.payload.photoURL,
        isLoading: false,
      };

    case UPDATE_SORT:
      return { ...state, sort: action.payload };

    case SORT_PRODUCTS:
      let tempProducts = [...filtered_products];

      switch (sort) {
        case "date-recent":
          tempProducts = tempProducts.sort(
            (a, b) => b.data?.timestamp?.toDate() - a.data?.timestamp?.toDate()
          );
          break;
        case "date-oldest":
          tempProducts = tempProducts.sort(
            (a, b) => a.data?.timestamp?.toDate() - b.data?.timestamp?.toDate()
          );
          break;
        case "likes-highest":
          tempProducts = tempProducts.sort(
            (a, b) => b.data?.likedBy?.length - a.data?.likedBy?.length
          );

          break;
        case "likes-lowest":
          tempProducts = tempProducts.sort(
            (a, b) => a.data?.likedBy?.length - b.data?.likedBy?.length
          );
          break;
        default:
          throw new Error(`no mathching "${sort}" action type`);
      }
      return { ...state, filtered_products: tempProducts };
    case UPDATE_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case UPDATE_FILTER:
      return { ...state, filter: action.payload };
    case FILTER_PRODUCTS:
      let tempProduct = [...posts];
      if (search) {
        tempProduct = tempProduct.filter(
          (item) =>
            item.data.message.toLowerCase().startsWith(search) ||
            item.data.user.name.toLowerCase().startsWith(search)
        );
      }
      if (filter !== "all") {
        if (filter === "text") {
          tempProduct = tempProduct.filter((item) => item.data.picture === "");
        } else {
          tempProduct = tempProduct.filter((item) => item.data.picture !== "");
        }
      }
      return { ...state, filtered_products: tempProduct };

    default:
      throw new Error(`no mathching "${action.type}" action type`);
  }
};
export default reducer;
