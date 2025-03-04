import * as SQLite from "expo-sqlite";
import { Place } from "../models/place";

const database = SQLite.openDatabase("places.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS places (
              id INTEGER PRIMARY KEY NOT NULL,
              title TEXT NOT NULL,
              imageUri TEXT NOT NULL
          )`,
        [],
        () => {
          console.log("Init called");
          resolve();
        },
        (_, error) => {
          console.log("Init Rejected", error);
          reject(error);
        }
      );
    });
  });

  return promise;
};

export const insertPlace = (place) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO places (title, imageUri) VALUES (?,?)`,
        [place.title, place.imageUri],
        (_, result) => {
          console.log(result);
          resolve(result);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
  return promise;
};

export const fetchPlaces = () => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) =>
      tx.executeSql(
        `SELECT * FROM places`,
        [],
        (_, result) => {
          const places = [];
          for (const dp of result.rows._array)
            places.push(new Place(dp.title, dp.imageUri, dp.id));
          resolve(places);
        },
        (_, error) => {
          reject(error);
        }
      )
    );
  });
  return promise;
};

export const fetchPlaceDetails = (id) => {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM places WHERE id =  ?`,
        [id],
        (_, result) => {
          console.log(result.rows._array[0]);
          resolve(result.rows._array[0]);
        },
        (_, error) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
