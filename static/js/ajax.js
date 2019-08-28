let ajax = {
    get_planets_and_display_table : function(page_link) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", page_link, true);
        xhttp.send();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var json_dicts_of_planets = JSON.parse(this.responseText);

                dom.create_planets_table(json_dicts_of_planets);
            }
        };
    },


    get_residents_and_display_modal : function(residents_links_list,planet_name){
        document.getElementsByClassName("modal-title")[0].innerHTML = "Residents of " + planet_name;
        document.getElementById("modalTableBody").innerHTML = "";
        var list_of_residents_dict = [];
        residents_links_list.forEach(link => {
            var xhttp = new XMLHttpRequest();
            xhttp.open("GET", link, true);
            xhttp.send();
            xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                list_of_residents_dict.push(JSON.parse(this.responseText));
                if (list_of_residents_dict.length == residents_links_list.length){
                    dom.fill_up_residents_modal(list_of_residents_dict, planet_name);
                }
            }
            };
        });
    },

    send_register_input : function(register_input){
        let url = '/register'
        let converted_register_input = JSON.stringify(register_input);
        this.send_to_server(url, converted_register_input).then(function(data) {
            registrationDom.delete_registration_form();
            dom.create_main_table();
            alert('Thank you for registration.');
        }).catch(function(err) {
            alert('Something went wrong. Please try again.');
        });
    },


    send_login_input : function(register_input){
        let url = '/login'
        let converted_login_input = JSON.stringify(register_input);
        this.send_to_server(url, converted_login_input).then(function(data) {
            loginDom.delete_login_form();
            ajax.get_voted_planets();
            dom.active_user = data;
            dom.change_nav_bar();
            dom.create_main_table();

        }).catch(function(err) {
            alert('Something went wrong. Please try again.');
        });

    },

    logout : function(){
        let endpoint = '/logout'
        this.send_to_server(endpoint).then(function(data) {
            dom.delete_table_and_pagination();
            dom.voted_planets = "",
            dom.active_user = "";
            dom.create_navbar();
            dom.create_main_table();
        }).catch(function(err) {
            alert('Something went wrong. Please try again.');
        });
    },

    check_if_somebody_logged : function(){
        let endpoint = '/'
        this.send_to_server(endpoint).then(function(data) {
            dom.active_user = data;
            ajax.get_voted_planets();
            dom.change_nav_bar();
            dom.create_main_table();
        }).catch(function(err) {
            dom.active_user = "";
            dom.create_main_table();
        });
    },


    get_voted_planets : function() {
        let endpoint = '/voted_planets'
        this.send_to_server(endpoint).then(function(data) {
            dom.voted_planets = data;
        }).catch(function(err) {
            alert('Something went wrong. Please try again.');
        });

    },

    send_vote : function(vote_input){
        let endpoint = '/vote'
        let converted_vote_input = JSON.stringify(vote_input);
        this.send_to_server(endpoint, converted_vote_input).then(function(data) {

        }).catch(function(err) {
            alert('not voted. Please try again.');
        });

    },


    send_to_server: function (url, data_to_Send) {
        console.log(url, data_to_Send)
        return new Promise(function(resolve, reject) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", url, true);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.send(data_to_Send);
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(this.responseText)
                if (response){
                    resolve(response);
                } else {
                    reject(response);
                }
            }
        }
    })
    },

}

function  init(){
    dom.create_navbar();
    ajax.check_if_somebody_logged()




}

init();