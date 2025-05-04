export interface Customer {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
    _links: {
      self: {
        href: string;
      };
    };
  }
  
  export interface Training {
    date: string;
    duration: number;
    activity: string;
    customer: Customer | null; 
    _links: {
      self: {
        href: string;
      };
      customer?: {
        href: string;
      };
    };
  }