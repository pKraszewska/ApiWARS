var loginDom = {

    create_login_form : function(){
        dom.delete_table_and_pagination();
        dom.delete_header();
        let login_container = document.getElementsByClassName("login-container")[0];
        login_container.setAttribute('id', 'login-container');
        document.getElementById('login-container').innerHTML =
            '<div class="form-group">'
                +'<label for="username">Username:</label>'
                +'<input type="text" class="form-control" id="username" placeholder="Enter username" name="username">'
            +'</div>'
            +'<div class="form-group">'
                +'<label for="password">Password:</label>'
                +'<input type="password" class="form-control" id="password" placeholder="Enter password" name="password">'
            +'</div>'
            +'<button onclick="loginDom.login()" class="btn btn-primary">Login</button>'
    },


    delete_login_form : function(){
        let login_container = document.getElementById("login-container").innerHTML= "";
    },

    get_login_input : function(){
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let usernameAndPassword = { username : username, password : password };
        return usernameAndPassword;
    },


    login : function(){
        let login_input = this.get_login_input();
        ajax.send_login_input(login_input);
    },
}