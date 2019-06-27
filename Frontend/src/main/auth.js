class Auth {
  constructor() {
    this.authenticated = false;
  }

  login(cb) {
    this.authenticated = true;
    cb();
  }

  logout(cb) {
    this.authenticated = false;
    cb();
  }

  do(val) {
    if (val === "true") {
      this.authenticated = true;
    }
    else 
      this.authenticated=false;  
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
