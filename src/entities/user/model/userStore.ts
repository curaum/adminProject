import { getUserInfo } from "../api/getUserInfo";

export const useUserStore = async () => {
  try {
    const response = await getUserInfo();
    // commit("SET_USER_INFO", JSON.parse(response.data));

    return response;
  } catch (err) {
    // handleAPIException("getUserInfo " + err);
    throw err;
  }
};
