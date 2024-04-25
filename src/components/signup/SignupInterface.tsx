interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleName: string;
}

interface UserVendor extends User {
  jobTitle: string;
}

interface UserAgent extends User {
  companyName: string;
  associatedSeller: string;
}
