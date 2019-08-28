var registrationDom = {
    create_registration_form : function(){
        dom.delete_table_and_pagination();

        dom.delete_header();
        let register_container = document.getElementsByClassName("login-container")[0];
        register_container.setAttribute('id', 'register-container');
        document.getElementById('register-container').innerHTML =
            '<div class="form-group">'
                +'<label for="username">Username:</label>'
                +'<input type="text" class="form-control" id="username" placeholder="Enter username" name="username">'
            +'</div>'
            +'<div class="form-group">'
                +'<label for="password">Password:</label>'
                +'<input type="password" class="form-control" id="password" placeholder="Enter password" name="password">'
            +'</div>'
            +'<button onclick="registrationDom.register()" class="btn btn-primary">Register</button>'
    },

    delete_registration_form : function(){
        let register_container = document.getElementById("register-container").innerHTML = "";

    },

    get_register_input : function(){
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let usernameAndPassword = { username : username, password : password };
        return usernameAndPassword;
    },

    register : function(){
        let register_input = this.get_register_input();
        // this.delete_regiatration_form();
        // dom.create_main_table();
        ajax.send_register_input(register_input);
    }


}