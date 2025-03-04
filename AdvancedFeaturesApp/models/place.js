export class Place {
  constructor(title, imageURI, id) {
    this.title = title;
    this.imageUri = imageURI;
    // this.address = address;
    // this.location = location; // {lat : 0.44, lng : 33.34}
    // this.id = new Date().toString() + Math.random().toString();
    this.id = id;
  }
}
