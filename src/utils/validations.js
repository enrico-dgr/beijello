export const isNotEmpty = (text) =>  text.trim() === '';

export const checkEmail = (email) => {
   
    if () {
        
    }

    if(
        formattedEmail !== '' &&
        formattedEmail.match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/)) {
            
        return true
    } else {
        return false
    }
};

export const checkPassword = (password) => {
    const strongRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );

    return strongRegex.test(password);
};

