import { showItem, showItemAll } from "../store";

export const ListProductItem = () => (dispatch, getState) => {
  const stateList = getState.listitem.listStateItem;

  if (stateList === false) {
    showItem();
  }
};

export const ListProductAll = () => (dispatch, getState) => {
  const stateList = getState.listitem.listStateAll;

  if (stateList === false) {
    showItemAll();
  }
};
