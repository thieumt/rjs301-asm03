import { createSlice, configureStore } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popup",
  initialState: {
    isPopupState: false,
  },
  reducers: {
    showPopup: (state) => {
      state.isPopupState = true;
    },
    hidePopup: (state) => {
      state.isPopupState = false;
    },
  },
});

const listProduct = createSlice({
  name: "listitem",
  initialState: { listStateAll: true, listStateItem: false },

  showItem: (state) => {
    state.listStateItem = true;
    state.listStateAll = false;
  },
  showItemAll: (state) => {
    state.listStateItem = false;
    state.listStateAll = true;
  },
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    userName: "",
    userEmail: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.userName = action.payload.name;
      state.userEmail = action.payload.email;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.userName = "";
      state.userEmail = "";
      state.isLoggedIn = false;
    },
  },
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    listCart: [],
    isAddedCart: "",
    isUpdateCart: null,
    isDeleteCart: false,
  },
  reducers: {
    addCart: (state, action) => {
      const dataListCartSave = localStorage.getItem("listCartSave") || "[]";
      const productToAdd = action.payload;

      let updatedListCart = [];
      if (dataListCartSave.length > 0) {
        const parsedListCartSave = JSON.parse(dataListCartSave);
        const dataListCart = parsedListCartSave;

        const isProductExist = dataListCart.find((product) => {
          return (
            product._id.$oid === productToAdd._id.$oid &&
            product.username === productToAdd.username
          );
        });

        if (!isProductExist) {
          updatedListCart = [...dataListCart, productToAdd];
          localStorage.setItem("listCartSave", JSON.stringify(updatedListCart));
          setTimeout(() => {
            alert("Da them vao gio hang");
          }, 1000);

          return {
            ...state,
            listCart: updatedListCart,
            isAddedCart: "Sản phẩm đã được thêm",
          };
        } else {
          alert("Da co trong gio hang");
          return {
            ...state,
            isAddedCart: "Sản phẩm đã có trong Cart",
          };
        }
      } else {
        updatedListCart = [productToAdd];
        localStorage.setItem("listCartSave", JSON.stringify(updatedListCart));
        return {
          ...state,
          listCart: updatedListCart,
          isAddedCart: "Sản phẩm đã được thêm",
        };
      }
    },

    updateCart: (state, action) => {
      const { id, updateCart } = action.payload;
      const itemIndex = state.listCart.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        state.listCart[itemIndex] = updateCart;
      }
    },

    deleteCart: (state, action) => {
      const idToRemove = action.payload;

      state.listCart = JSON.parse(localStorage.getItem("listCartSave"));

      const filterProductNew = state.listCart.filter((product) => {
        return (
          product._id.$oid !== idToRemove.idProduct &&
          product.username === idToRemove.userName
        );
      });

      localStorage.setItem("listCartSave", JSON.stringify(filterProductNew));
    },

    updateQuantity: (state, action) => {
      const quantityProduct = action.payload;
      state.listCart = JSON.parse(localStorage.getItem("listCartSave"));
      state.listCart.forEach((product) => {
        if (
          product.username === quantityProduct.userName &&
          product._id.$oid === quantityProduct.idProduct
        ) {
          if (
            parseInt(product.quantity) > 0 &&
            parseInt(quantityProduct.num) === 1
          ) {
            product.quantity =
              parseInt(product.quantity) + parseInt(quantityProduct.num);
            localStorage.setItem(
              "listCartSave",
              JSON.stringify(state.listCart)
            );
          }
          if (
            parseInt(product.quantity) > 1 &&
            parseInt(quantityProduct.num) === -1
          ) {
            product.quantity =
              parseInt(product.quantity) + parseInt(quantityProduct.num);
            localStorage.setItem(
              "listCartSave",
              JSON.stringify(state.listCart)
            );
          }
        }
      });
    },
  },
});

const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    infoUser: {},
  },
  reducers: {
    getInfo: (state) => {
      const dataUsers = JSON.parse(localStorage.getItem("dataUsers")) || [];
      const userLogin = localStorage.getItem("userLogin");

      let isUser;
      if (typeof userLogin === "string" && userLogin.length > 0) {
        isUser = JSON.parse(userLogin);
      } else {
        isUser = "";
      }

      let infoUserProcess = {};
      if (dataUsers.length > 0) {
        const findUser = dataUsers.find((user) => {
          return user.username === isUser;
        });

        infoUserProcess = findUser || {};
      }

      return {
        ...state,
        infoUser: infoUserProcess,
      };
    },
  },
});

const chatLiveSlice = createSlice({
  name: "chat",
  initialState: {
    isChatLive: false,
  },
  reducers: {
    showChatLive: (state, action) => {
      state.isChatLive = true;
    },
    hideChatLive: (state, acion) => {
      state.isChatLive = false;
    },
  },
});

const store = configureStore({
  reducer: {
    popup: popupSlice.reducer,
    listitem: listProduct.reducer,
    user: userSlice.reducer,
    cart: cartSlice.reducer,
    checkout: checkoutSlice.reducer,
    chat: chatLiveSlice.reducer,
  },
});

export const { showPopup, hidePopup } = popupSlice.actions;
export const { showItem, showItemAll } = listProduct.actions;
export const { setUser, logoutUser } = userSlice.actions;
export const { addCart, updateQuantity, deleteCart } = cartSlice.actions;
export const { getInfo } = checkoutSlice.actions;
export const { showChatLive, hideChatLive } = chatLiveSlice.actions;
// export const { showChat, hideChat, customerSend, consultantSend} = chatSlice.actions;
// export const { increment, decrement } = quantitySlice.actions;
export default store;
