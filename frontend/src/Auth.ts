const Auth = {
    isAuthenticated: false,
    authenticate() {
        this.isAuthenticated = true;
    },
    signout() {
        this.isAuthenticated = false;
    },
    getAuth() {
        if (localStorage.getItem('userToken') !== null) {
            this.isAuthenticated = true;
        }

        alert(this.isAuthenticated)
        return this.isAuthenticated;
    }
};

export default Auth;