/**
 * Created by Administrator on 2016/9/7.
 */
Template.login.onRendered(function(){
    var login=$('.login').validate({
        rules: {
            password: {
                minlength: 6
            }
        },
        messages: {
            password: {
                required: "You must enter a password.",
                minlength: "Your password must be at least {0} characters."
            }
        },
        submitHandler: function(e){

            var username = $('[name=username]').val();
            var password = $('[name=password]').val();
            Meteor.loginWithPassword(username, password , function(error){
                if(error){
                    if(error.reason=="User not found"){
                        login.showErrors({'username':error.reason})
                    }else {
                        login.showErrors({'password':error.reason})
                    }
                } else {
                    Router.go("home");
                    $('#login').modal('hide')
                }
            })
        }
});
});
