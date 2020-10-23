import firebase from "../../data/base";
import user from "../../assets/images/user/user.png";

const db = firebase.firestore();

export const createUser = (value, avatar) => {
  db.collection("contactApp").add({
    avatar: avatar ? avatar : user,
    name: value.name,
    surname: value.surname,
    mobile: value.mobile,
    age: value.age,
    nameToSearch: value.name.toLowerCase(),
  });
};

export const deletedUser = (userId) => {
  return firebase.firestore().collection("contactApp").doc(userId).delete();
};

export const editUser = (value, url, userId) => {
  db.collection("contactApp")
    .doc(userId)
    .set({
      avatar: url ? url : null,
      name: value.name,
      surname: value.surname,
      mobile: value.mobile,
      age: value.age,
      nameToSearch: value.name.toLowerCase(),
    });
};

export const getAge = (min, max) => {
  db.collection("contactApp")
    .where("age", ">=", min)
    .where("age", "<=", max)
    .onSnapshot((snapshot) => {
      // eslint-disable-next-line
      const getUser = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
};
