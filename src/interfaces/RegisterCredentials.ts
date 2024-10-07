export interface RegisterCredentials {
  name: {
    firstname: string;
    lastname: string;
  };
  email: string;
  username: string;
  password: string;
  address: {
    city: string;
    street: string;
    number: string;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
}
